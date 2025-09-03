"use client";

import { apiClient, News } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function NewsComponent() {
  const [topNews, setTopNews] = useState<News[] | null>(null);
  const [news, setNews] = useState<News[] | null>(null);
  const [artsNews, setArtsNews] = useState<News[] | null>(null);
  const [businessNews, setBusinessNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const context = useContext(ThemeContext);
  if (!context) throw new Error("NewsComponent must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [newsData, topNewsData, artsData, businessData] = await Promise.all([
          apiClient.getDummyNews(),
          apiClient.getTopNews(),
          apiClient.getArtsNews(),
          apiClient.getBusinessNews(),
        ]);
        setNews(newsData);
        setTopNews(topNewsData);
        setArtsNews(artsData);
        setBusinessNews(businessData);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNewsClick = (newsId: string) => router.push(`/news/${newsId}`);

  if (loading)
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 space-y-12 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
        <SectionHeader title="Today" theme={theme} />
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10`}>
          <div className="md:col-span-2">
            <FeaturedTodaySkeleton theme={theme} />
          </div>
          <div className={`flex flex-col divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SmallStorySkeleton key={i} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    );

  if (errorMessage)
    return <p className={`text-center py-10 ${theme === "dark" ? "text-gray-200" : "text-red-500"}`}>Error: {errorMessage}</p>;

  return (
    <div className={`w-full max-w-7xl mx-auto space-y-12 px-4 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Today Section */}
      <SectionHeader title="Today" theme={theme} />
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-b pb-10 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2"
        >
          <FeaturedToday news={topNews?.[0]} onClick={handleNewsClick} theme={theme} />
        </motion.div>
        <div className={`flex flex-col divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
          {topNews?.slice(1, 4).map((story, i) => (
            <motion.div key={story.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <SmallStory story={story} onClick={handleNewsClick} theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <SectionHeader title="Trending" theme={theme} />
      <div className={`overflow-x-auto scrollbar-hide -mx-4 px-4 border-b pb-10 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex gap-6 min-w-max">
          {news?.slice(0, 6).map((item) => (
            <div key={item.id} className="w-64 flex-shrink-0">
              <TrendingCard story={item} onClick={handleNewsClick} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Arts Section */}
      <NewsGrid title="Arts" data={artsNews} onClick={handleNewsClick} theme={theme} />

      {/* Business Section */}
      <NewsGrid title="Business" data={businessNews} onClick={handleNewsClick} theme={theme} />
    </div>
  );
}

/* --- Skeletons --- */
function Skeleton({ className, theme }: { className?: string; theme: string }) {
  return <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} rounded-md ${className}`} />;
}

function FeaturedTodaySkeleton({ theme }: { theme: string }) {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full h-80 rounded-lg" theme={theme} />
      <Skeleton className="w-3/4 h-6" theme={theme} />
      <Skeleton className="w-full h-4" theme={theme} />
      <Skeleton className="w-2/3 h-4" theme={theme} />
    </div>
  );
}

function SmallStorySkeleton({ theme }: { theme: string }) {
  return (
    <div className="py-4 space-y-2">
      <Skeleton className="w-1/3 h-3" theme={theme} />
      <Skeleton className="w-2/3 h-4" theme={theme} />
      <Skeleton className="w-full h-3" theme={theme} />
    </div>
  );
}

function TrendingCardSkeleton({ theme }: { theme: string }) {
  return (
    <div className="w-64 flex-shrink-0 space-y-2">
      <Skeleton className="w-full h-28 rounded-lg" theme={theme} />
      <Skeleton className="w-3/4 h-4" theme={theme} />
      <Skeleton className="w-full h-3" theme={theme} />
    </div>
  );
}

/* --- Helper Components --- */
function SectionHeader({ title, theme }: { title: string; theme: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
        {title}
      </h2>
      <button className={`text-xs ${theme === "dark" ? "text-gray-200" : "text-blue-600"} hover:underline`}>View All</button>
    </div>
  );
}

function TopicTag({ text, theme }: { text: string; theme: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full uppercase tracking-wide text-[10px] font-medium ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

function SmallStory({ story, onClick, theme }: { story: News; onClick: (id: string) => void; theme: string }) {
  return (
    <div
      className={`py-4 cursor-pointer rounded-md px-2 transition-colors ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
      onClick={() => onClick(story.id)}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        {Array.isArray(story.topics)
          ? story.topics.map((t, i) => <TopicTag key={i} text={t} theme={theme} />)
          : <TopicTag text={story.topics} theme={theme} />}
        <p className={`text-[11px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{story.posted_at}</p>
      </div>
      <h3 className={`text-sm font-semibold mb-1 ${theme === "dark" ? "text-gray-100" : ""}`}>{story.title}</h3>
      <p className={`text-xs line-clamp-2 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{story.description}</p>
    </div>
  );
}

function FeaturedToday({ news, onClick, theme }: { news?: News; onClick: (id: string) => void; theme: string }) {
  if (!news) return null;
  return (
    <div className={`group cursor-pointer transition-shadow rounded-lg overflow-hidden hover:shadow-lg`} onClick={() => onClick(news.id)}>
      <div className="overflow-hidden">
        <img src={news.image_url} alt={news.title} className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="mt-4">
        <p className={`text-xs mb-1 uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {news.topics} · {news.posted_at}
        </p>
        <h2 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-gray-100 hover:text-blue-400" : "hover:text-blue-600"}`}>{news.title}</h2>
        <p className={`text-sm line-clamp-3 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{news.description}</p>
        <p className={`mt-3 text-xs font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>Continue Reading...</p>
      </div>
    </div>
  );
}

function FeaturedStory({ news, onClick, theme }: { news?: News; onClick: (id: string) => void; theme: string }) {
  if (!news) return null;
  return (
    <div className={`group cursor-pointer rounded-lg overflow-hidden transition-shadow hover:shadow-md`} onClick={() => onClick(news.id)}>
      <div className="overflow-hidden">
        <img src={news.image_url} alt={news.title} className="w-full h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {Array.isArray(news.topics)
            ? news.topics.map((t, i) => <TopicTag key={i} text={t} theme={theme} />)
            : <TopicTag text={news.topics} theme={theme} />}
          <p className={`text-[11px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{news.posted_at}</p>
        </div>
        <h2 className={`text-lg font-bold mb-1 ${theme === "dark" ? "text-gray-100 hover:text-blue-400" : "hover:text-blue-600"}`}>{news.title}</h2>
        <p className={`text-sm line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{news.description}</p>
      </div>
    </div>
  );
}

function TrendingCard({ story, onClick, theme }: { story: News; onClick: (id: string) => void; theme: string }) {
  return (
    <div className={`cursor-pointer group rounded-lg overflow-hidden transition-shadow hover:shadow-md`} onClick={() => onClick(story.id)}>
      <div className="overflow-hidden">
        <img src={story.image_url} alt={story.title} className="w-full h-28 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {Array.isArray(story.topics)
            ? story.topics.map((t, i) => <TopicTag key={i} text={t} theme={theme} />)
            : <TopicTag text={story.topics} theme={theme} />}
          <p className={`text-[11px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{story.posted_at}</p>
        </div>
        <h4 className={`text-sm font-semibold mb-1 line-clamp-2 ${theme === "dark" ? "text-gray-100 hover:text-blue-400" : "hover:text-blue-600"}`}>{story.title}</h4>
        <p className={`text-xs line-clamp-2 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{story.description}</p>
      </div>
    </div>
  );
}

function NewsGrid({ title, data, onClick, theme }: { title: string; data: News[] | null; onClick: (id: string) => void; theme: string }) {
  return (
    <>
      <SectionHeader title={title} theme={theme} />
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-b pb-8 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <div className="md:col-span-2 lg:col-span-1">
          <FeaturedStory news={data?.[0]} onClick={onClick} theme={theme} />
        </div>
        <div className={`flex flex-col divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
          {data?.slice(1, 4).map((story) => (
            <SmallStory key={story.id} story={story} onClick={onClick} theme={theme} />
          ))}
        </div>
        <div className={`flex flex-col divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
          {data?.slice(4, 7).map((story) => (
            <SmallStory key={story.id} story={story} onClick={onClick} theme={theme} />
          ))}
        </div>
      </div>
    </>
  );
}
