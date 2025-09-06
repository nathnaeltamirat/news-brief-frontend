"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "next/navigation";
import ChatBot from "../../../../components/reusable_components/Specficchatbot";
import { ThemeContext } from "../../../contexts/ThemeContext";
import TopBar from "@/components/reusable_components/search_topbar";
import { TopicTag } from "@/components/news_component/NewsComponent";

type News = {
  id: string;
  title: string;
  body?: string;
  image_url: string;
  source?: string;
  posted_at?: string;
  topics: string[];
  summary_en?: string;
  summary_am?: string;
};

type SimpleVoice = { voice_id: string; name: string };

export default function NewsDetailPage() {
  const params = useParams();
  const { theme } = useContext(ThemeContext)!;

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Language toggle ---
  const [showAmharic, setShowAmharic] = useState(false);

  // --- Eleven Labs TTS ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voices, setVoices] = useState<SimpleVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("ZF6FPAbjXT4488VcRRnw");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // en or am
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastRequestRef = useRef<{
    voiceId: string;
    text: string;
    lang: string;
  } | null>(null);

  // Fetch voices
  useEffect(() => {
    async function fetchVoices() {
      try {
        const res = await fetch("/api/voices", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data.voices) && data.voices.length > 0) {
          setVoices(data.voices);
          setSelectedVoice(data.voices[0].voice_id);
          return;
        }
      } catch {
        setVoices([
          { voice_id: "ZF6FPAbjXT4488VcRRnw", name: "Default Voice" },
          { voice_id: "pNInz6obpgDQGcFmaJgB", name: "Rachel" },
          { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Domi" },
        ]);
      }
    }
    fetchVoices();
  }, []);

  // Fetch translated news directly from backend
  useEffect(() => {
    async function fetchData() {
      try {
        if (!params.id) return;

        const res = await fetch(
          `https://news-brief-core-api.onrender.com/api/v1/news/${params.id}/translate`,
          { method: "POST" }
        );

        if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
        const translated = await res.json();
        console.log("Translated response:", translated);

        setNews(translated);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  // Reset audio helper
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setIsPlaying(false);
    lastRequestRef.current = null;
  };

const handlePlayElevenLabs = async () => {
  if (!news) return;

  // Use Amharic or English text
  const text = showAmharic
    ? news.summary_am || ""
    : news.summary_en || news.body || "";

  // Always use "en" (ElevenLabs doesn't support "am")
  const lang = "en";

  const sameAsLast =
    lastRequestRef.current &&
    lastRequestRef.current.voiceId === selectedVoice &&
    lastRequestRef.current.text === text &&
    lastRequestRef.current.lang === lang;

  if (audioRef.current && sameAsLast) {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    return;
  }

  resetAudio();
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voice_id: selectedVoice,
        language_code: lang, // always "en"
      }),
    });

    if (!res.ok) {
      console.error("TTS request failed");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    audioRef.current = new Audio(url);
    audioRef.current.play();
    setIsPlaying(true);
    lastRequestRef.current = { voiceId: selectedVoice, text, lang };

    audioRef.current.onended = () => setIsPlaying(false);
  } catch (err) {
    console.error("Unexpected error in TTS:", err);
  }
};


  if (loading) return <p className="p-6">Loading...</p>;
  if (!news) return <p className="p-6">News not found.</p>;

  return (
    <>
      <ChatBot defaultOpen={true} />
      <div
        className={`mx-auto flex flex-col ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <TopBar />

        <main className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 flex-1">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">{news.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {news.topics?.map((t, i) => (
              <TopicTag key={i} text={t} theme={theme} />
            ))}
            <span
              className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {news.source} • {news.posted_at}
            </span>
          </div>

          {/* Cover Image */}
          <div className="relative w-full h-72 lg:h-[28rem] mb-6 rounded-lg overflow-hidden shadow">
            <img
              src={news.image_url}
              alt={news.title}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>

          {/* Language toggle */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => {
                setShowAmharic(false);
                setSelectedLanguage("en");
                resetAudio();
              }}
              className={`px-3 py-1 rounded ${
                !showAmharic
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setShowAmharic(true);
                setSelectedLanguage("am");
                resetAudio();
              }}
              className={`px-3 py-1 rounded ${
                showAmharic
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              አማርኛ
            </button>
          </div>

          {/* Description */}
          <p
            className={`text-base leading-relaxed mb-10 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {showAmharic
              ? news.summary_am || "No Amharic version available."
              : news.summary_en || news.body || "No English version available."}
          </p>

          {/* Listening Mode */}
          <section className="max-w-2xl">
            <h2 className="text-lg font-semibold mb-3">🎧 Listening Mode</h2>
            <div
              className={`flex items-center gap-5 rounded-xl shadow-md p-4 transition-all duration-700 
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white"
                  : "bg-gradient-to-r from-gray-100 via-gray-50 to-white text-black"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={news.image_url}
                  alt="Thumbnail"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>

              {/* Player Section */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{news.title}</h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } text-xs mb-2 truncate`}
                >
                  AI will read this article for you.
                </p>
              </div>

              {/* Play button */}
              <button
                onClick={handlePlayElevenLabs}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                {isPlaying ? "⏸" : "▶️"}
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
