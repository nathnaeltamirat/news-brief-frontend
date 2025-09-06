"use client";

import Image from "next/image";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "next/navigation";
import { apiClient, News } from "../../../lib/api";
import ChatBot from "../../../components/reusable_components/Specficchatbot";
import { ThemeContext } from "../../contexts/ThemeContext";
import TopBar from "@/components/reusable_components/search_topbar";

function Card({ children }: { children: React.ReactNode }) {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Card must be used inside ThemeProvider");
  const { theme } = context;

  return (
    <div
      className={`rounded-xl border shadow-sm p-4 mb-4 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {children}
    </div>
  );
}

type SimpleVoice = { voice_id: string; name: string };

export default function NewsDetailPage() {
  const params = useParams();
  const { theme } = useContext(ThemeContext)!;
  const [news, setNews] = useState<News | null>(null);
  const [similarNews, setSimilarNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Eleven Labs TTS ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voices, setVoices] = useState<SimpleVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("ZF6FPAbjXT4488VcRRnw");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // en or am
  const [progress, setProgress] = useState(0); // percent (0–100)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastRequestRef = useRef<{
    voiceId: string;
    text: string;
    lang: string;
  } | null>(null);

  // Helper: format mm:ss
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Seek handlers
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleDragStart = () => setIsDragging(true);

  const handleDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const newTime = Math.min(Math.max(moveX / rect.width, 0), 1) * duration;
    setPreviewTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !duration) {
      setIsDragging(false);
      setPreviewTime(null);
      return;
    }
    const rect = e.currentTarget.parentElement!.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newTime = Math.min(Math.max(newX / rect.width, 0), 1) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
    setIsDragging(false);
    setPreviewTime(null);
  };
  type ElevenLabsVoice = {
    voice_id: string;
    name: string;
  };
  // Fetch voices (with fallback)
  useEffect(() => {
    async function fetchVoices() {
      try {
        const res = await fetch("/api/voices", { cache: "no-store" });
        if (!res.ok) throw new Error("voices_read permission missing");
        const data = await res.json();

        if (Array.isArray(data.voices) && data.voices.length > 0) {
          const mapped: SimpleVoice[] = data.voices.map(
            (v: ElevenLabsVoice) => ({
              voice_id: v.voice_id,
              name: v.name,
            })
          );
          setVoices(mapped);
          setSelectedVoice(mapped[0].voice_id);
          return;
        }
        throw new Error("No voices returned");
      } catch {
        const fallback: SimpleVoice[] = [
          { voice_id: "ZF6FPAbjXT4488VcRRnw", name: "Default Voice" },
          { voice_id: "pNInz6obpgDQGcFmaJgB", name: "Rachel" },
          { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Domi" },
        ];
        setVoices(fallback);
        setSelectedVoice(fallback[0].voice_id);
      }
    }
    fetchVoices();
  }, []);
  // Fetch news
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
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  // Stop & reset audio helper
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

  const handleVoiceChange = (newVoiceId: string) => {
    setSelectedVoice(newVoiceId);
    resetAudio();
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    resetAudio();
  };

  const handlePlayElevenLabs = async () => {
    if (!news) return;

    const text = news.description;
    const sameAsLast =
      lastRequestRef.current &&
      lastRequestRef.current.voiceId === selectedVoice &&
      lastRequestRef.current.text === text &&
      lastRequestRef.current.lang === selectedLanguage;

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
          language_code: selectedLanguage,
        }),
      });

      if (!res.ok) {
        let errorDetails;
        try {
          const data = await res.json();
          errorDetails = data.details || data.error || "Unknown error";
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Unexpected error";
          console.error("Unexpected error in TTS:", message);
          alert(`Failed to generate audio: ${message}`);
        }
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      audioRef.current = new Audio(url);
      audioRef.current.play();
      setIsPlaying(true);
      lastRequestRef.current = {
        voiceId: selectedVoice,
        text,
        lang: selectedLanguage,
      };

      // progress tracking
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current && !isDragging) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration || 0);
          setProgress(
            (audioRef.current.currentTime / (audioRef.current.duration || 1)) *
              100
          );
        }
      };

      audioRef.current.onended = () => setIsPlaying(false);
    } catch (err: unknown) {
      console.error("Unexpected error in TTS:", err);
      if (err instanceof Error) {
        alert(`Failed to generate audio: ${err.message}`);
      } else {
        alert("Failed to generate audio: Unknown error");
      }
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!news) return <p className="p-6">News not found.</p>;

  return (
    <>
      <ChatBot defaultOpen={true} />
      <div
        className={`min-h-screen flex flex-col ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <TopBar />

        <main className="flex flex-col lg:flex-row flex-1 mt-4 lg:mt-0 px-4 lg:px-12 gap-6">
          <div className="flex-1 space-y-6">
            {/* <button
              onClick={() => history.back()}
              className="text-md text-gray-500 hover:underline"
            >
              Back
            </button> */}

            <h1 className="text-xl lg:text-2xl font-bold leading-snug mx-auto my-8">
              {news.title}
            </h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {news.description}
            </p>

            <h2 className="text-lg font-semibold mb-2">Listening Mode</h2>
            <div
              className={`flex items-center gap-5 rounded-xl shadow-md p-4 transition-all duration-700 max-w-md  ${
                theme === "dark"
                  ? "bg-gradient-to-r from-gray-700 via-gray-500 to-white text-white"
                  : "bg-gradient-to-r from-gray-700 via-gray-300 to-white text-black"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src="/photo.png"
                  alt="News"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>

              {/* Player Section */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{news.title}</h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  } text-xs mb-2 truncate`}
                >
                  AI will read this article for you.
                </p>

                {/* Voice Selector */}
                <select
                  value={selectedVoice}
                  onChange={(e) => handleVoiceChange(e.target.value)}
                  className="mb-2 p-1.5 rounded-md border border-gray-700 text-xs bg-transparent focus:outline-none"
                >
                  {voices.map((voice) => (
                    <option key={voice.voice_id} value={voice.voice_id}>
                      {voice.name}
                    </option>
                  ))}
                </select>

                {/* Progress bar with time */}
                <div className="flex items-center gap-2 select-none">
                  <span className="text-[11px] text-gray-700 w-8 text-right">
                    {formatTime(
                      isDragging && previewTime !== null
                        ? previewTime
                        : currentTime
                    )}
                  </span>

                  <div
                    className="flex-1 h-1.5 bg-gray-400/40 rounded-full cursor-pointer relative group"
                    onClick={handleSeek}
                    onMouseMove={(e) => isDragging && handleDragging(e)}
                    onMouseUp={handleDragEnd}
                  >
                    <div
                      className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-gray-400 shadow-sm opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
                      style={{
                        left: `${progress}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onMouseDown={handleDragStart}
                    />
                  </div>

                  <span className="text-[11px] text-gray-500 w-8">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Play button */}
              <button
                onClick={handlePlayElevenLabs}
                className={`w-11 h-11 flex items-center justify-center rounded-full `}
              >
                {isPlaying ? "⏸" : "▶️"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
