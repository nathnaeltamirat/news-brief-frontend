"use client";
import Image from "next/image";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "next/navigation";
import { apiClient, News } from "../../../lib/api";
import ChatBot from "../../../components/reusable_components/chatbot";
import { ThemeContext } from "../../contexts/ThemeContext";

function Card({ children }: { children: React.ReactNode }) {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Card must be used inside ThemeProvider");
  const { theme } = context;

  return (
    <div
      className={`rounded-xl border shadow-sm p-4 mb-4 ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {children}
    </div>
  );
}

export default function NewsDetailPage() {
  const params = useParams();
  const { theme } = useContext(ThemeContext)!;
  const [news, setNews] = useState<News | null>(null);
  const [similarNews, setSimilarNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // --- TTS / Podcast state ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const chunksRef = useRef<string[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const topNews = await apiClient.getTopNews();
        const selected = topNews.find((n) => n.id === params.id) || topNews[0];
        setNews(selected);

        const allNews = await apiClient.getDummyNews();
        if (selected) {
          const similar = allNews.filter(
            (item) =>
              item.id !== selected.id &&
              item.topics.some((topic) => selected.topics.includes(topic))
          );
          setSimilarNews(similar);

          // Split text into chunks for progressive reading
          chunksRef.current = selected.description.match(/.{1,150}/g) || [];
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  // --- Speak a chunk ---
  const speakChunk = (index: number) => {
    if (!chunksRef.current[index]) {
      setIsPlaying(false);
      setProgress(100);
      setCurrentChunkIndex(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
    utterance.rate = rate;
    utterance.onend = () => {
      const nextIndex = index + 1;
      setCurrentChunkIndex(nextIndex);
      setProgress(((nextIndex) / chunksRef.current.length) * 100);
      if (isPlaying) speakChunk(nextIndex);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // --- Play / Pause ---
  const handlePlay = () => {
    if (!window.speechSynthesis) return alert("Speech Synthesis not supported!");

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }

    if (utteranceRef.current && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
    speakChunk(currentChunkIndex);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    if (utteranceRef.current) utteranceRef.current.rate = newRate;
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!news) return <p className="p-6">News not found.</p>;

  return (
    <>
      <ChatBot defaultOpen={true} />
      <div className={`min-h-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

        <div className="flex-1 flex flex-col lg:ml-0 mt-20 lg:mt-0">
          <header className="flex items-center p-4">
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search topics, people, ideas..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </header>

          <div className="flex flex-1 space-x-4 lg:space-x-17">
            <div className="flex-1 p-4 lg:p-6 space-y-6">
              <button onClick={() => history.back()} className="text-md text-gray-500 hover:underline">
                Back
              </button>

              <h1 className="text-xl lg:text-2xl font-bold leading-snug">{news.title}</h1>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{news.description}</p>

              <h2 className="text-xl lg:text-2xl font-bold mb-2">Listening Mode</h2>
              <div
                className={`flex flex-col lg:flex-row items-stretch gap-4 rounded-xl shadow-lg p-4 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="relative w-full lg:w-1/2 h-32 lg:h-40 rounded-lg overflow-hidden">
                  <Image src="/photo.png" alt="News" fill style={{ objectFit: "cover" }} />
                </div>

                <div className="flex flex-col justify-between flex-1 mt-2 lg:mt-0 lg:ml-4">
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-sm mb-2`}>
                    Listen to this article like a podcast. The text will be read continuously.
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePlay}
                      className={`px-4 py-2 rounded-full font-bold ${
                        theme === "dark"
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>

                    <label className="text-sm">
                      Speed: {rate.toFixed(1)}x
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={handleRateChange}
                        className="ml-2"
                      />
                    </label>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-400 h-2 rounded mt-2">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: theme === "dark" ? "#fff" : "#000",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Similar News</h2>
                {similarNews.map((item) => (
                  <Card key={item.id}>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                        img
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-0 md:w-80"></div>
          </div>
        </div>
      </div>
    </>
  );
}
