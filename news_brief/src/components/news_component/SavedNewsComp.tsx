"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, News } from "@/lib/api";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { BookmarkMinus } from "lucide-react";
import { TopicTag } from "@/components/news_component/NewsComponent";

export default function SavedNewsComp() {
  const [savedNews, setSavedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const context = useContext(ThemeContext);

  if (!context) throw new Error("SavedNews must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    async function fetchSaved() {
      try {
        const data = await apiClient.getSavedNews();
        setSavedNews(data);
      } finally {
        setLoading(false);
      }
    }
    fetchSaved();
  }, []);

  const handleUnsave = async (id: string) => {
    await apiClient.removeSavedNewsItem(id);
    setSavedNews((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1
        className={`text-2xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Saved News
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : savedNews.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No Saved News</p>
      ) : (
        <div className="grid gap-6">
          {savedNews.map((news) => (
            <SavedNewsCard
              key={news.id}
              news={news}
              onClick={handleClick}
              onUnsave={handleUnsave}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}



export function SavedNewsCard({
  news,
  onClick,
  onUnsave,
  theme,
}: {
  news: News;
  onClick: (id: string) => void;
  onUnsave: (id: string) => void;
  theme: string;
}) {
  return (
    <div
      className={`group flex flex-col sm:flex-row gap-4 p-4 rounded-lg border transition hover:shadow-md cursor-pointer
        ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
      onClick={() => onClick(news.id)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg w-full sm:w-1/3">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-full object-cover aspect-[4/3] sm:aspect-auto transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Caption */}
      <div className="relative flex flex-col p-3.5 w-full sm:w-2/3">
        {/* Tags + timestamp */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {Array.isArray(news.topics) ? (
            news.topics.map((t, i) => <TopicTag key={i} text={t} theme={theme} />)
          ) : (
            <TopicTag text={String(news.topics)} theme={theme} />
          )}
          <span
            className={`text-[11px] ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {news.posted_at}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`text-lg font-bold mb-1 ${
            theme === "dark"
              ? "text-gray-100 hover:text-blue-400"
              : "text-gray-900 hover:text-blue-600"
          }`}
        >
          {news.title}
        </h2>

        {/* Description */}
        <p
          className={`text-sm line-clamp-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {news.description}
        </p>

        {/* Unsave button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnsave(news.id);
          }}
          className="absolute top-0 right-0 p-1 rounded-md cursor-pointer"
          aria-label="Unsave"
          title="Unsave"
        >
          <BookmarkMinus
            size={20}
            className={`${
              theme === "dark"
                ? "text-red-400 hover:text-red-300"
                : "text-red-600 hover:text-red-700"
            }`}
          />
        </button>
      </div>
    </div>
  );
}