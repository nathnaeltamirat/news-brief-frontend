"use client";

import Image from "next/image";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "next/navigation";
import { apiClient, News } from "../../../../lib/api";
import ChatBot from "../../../../components/reusable_components/Specficchatbot";
import { ThemeContext } from "../../../contexts/ThemeContext";
import TopBar from "@/components/reusable_components/search_topbar";
import { TopicTag } from "@/components/news_component/NewsComponent";

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
        className={` mx-auto  flex flex-col ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <TopBar />

        <main className="  max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 flex-1">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">{news.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {news.topics.map((t, i) => (
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
              loading="eager" // Equivalent to priority
              decoding="async"
            />
          </div>

          {/* Description */}
          <p
            className={`text-base leading-relaxed mb-10 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {news.description}
          </p>

          {/* Listening Mode */}
          <section className="max-w-2xl">
            <h2 className="text-lg font-semibold mb-3">🎧 Listening Mode</h2>
            <div
              className={`flex items-center gap-5 rounded-xl shadow-md p-4 transition-all duration-700 
              ${theme === "dark"
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white"
                : "bg-gradient-to-r from-gray-100 via-gray-50 to-white text-black"}`}
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img
                src={news.image_url}
                alt="Thumbnail"
                className="absolute inset-0 object-cover w-full h-full"
               
                decoding="async"
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

                {/* Voice selector + progress bar would go here */}
                {/* Placeholder for your player logic */}
              </div>

              {/* Play button */}
              <button
                className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                ▶️
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
