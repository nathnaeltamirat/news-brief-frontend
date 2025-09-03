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

  if (loading) return <p className="text-center py-10">Loading news...</p>;
  if (errorMessage) return <p className="text-center py-10 text-red-500">Error: {errorMessage}</p>;

  return (
    <div
      className={`w-full max-w-7xl mx-auto space-y-12 px-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* === Breaking Bar ===
      {news?.[0] && (
        <div className="bg-gray-900 text-white text-sm py-2 px-4 rounded-md shadow-md">
          <span className="font-semibold text-red-400">Breaking:</span>{" "}
          {news[0].title}
        </div>
      )} */}

      {/* === Today Section === */}
      <SectionHeader title="Today" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 dark:border-gray-700 pb-10">
        {/* Featured big story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2"
        >
          <FeaturedToday news={topNews?.[0]} onClick={handleNewsClick} />
        </motion.div>

        {/* Stacked smaller stories */}
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {topNews?.slice(1, 4).map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <SmallStory story={story} onClick={handleNewsClick} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Trending Section === */}
      <SectionHeader title="Trending" />
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 border-b border-gray-200 dark:border-gray-700 pb-10">
        <div className="flex gap-6 min-w-max">
          {news?.slice(0, 6).map((item) => (
            <div key={item.id} className="w-64 flex-shrink-0">
              <TrendingCard story={item} onClick={handleNewsClick} />
            </div>
          ))}
        </div>
      </div>

      {/* === Arts Section === */}
      <NewsGrid title="Arts" data={artsNews} onClick={handleNewsClick} />

      {/* === Business Section === */}
      <NewsGrid title="Business" data={businessNews} onClick={handleNewsClick} />
    </div>
  );
}

/* --- Helper Components --- */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
        {title}
      </h2>
      <button className="text-xs text-blue-600 hover:underline">View All</button>
    </div>
  );
}

function FeaturedToday({ news, onClick }: { news?: News; onClick: (id: string) => void }) {
  if (!news) return null;
  return (
    <div
      className="group cursor-pointer hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
      onClick={() => onClick(news.id)}
    >
      <div className="overflow-hidden">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
          {news.topics} · {news.posted_at}
        </p>
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-600">{news.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {news.description} 
        </p>
        <p className="mt-3 text-blue-600 text-xs font-medium">Continue Reading...</p>
      </div>
    </div>
  );
}

function TopicTag({ text }: { text: string }) {
  return (
    <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] font-medium text-gray-600 dark:text-gray-300 rounded-full uppercase tracking-wide">
      {text}
    </span>
  );
}

function FeaturedStory({ news, onClick }: { news?: News; onClick: (id: string) => void }) {
  if (!news) return null;
  return (
    <div
      className="group cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden"
      onClick={() => onClick(news.id)}
    >
      <div className="overflow-hidden">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {Array.isArray(news.topics)
            ? news.topics.map((t, i) => <TopicTag key={i} text={t} />)
            : <TopicTag text={news.topics} />}
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{news.posted_at}</p>
        </div>
        <h2 className="text-lg font-bold mb-1 hover:text-blue-600">{news.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{news.description}</p>
      </div>
    </div>
  );
}

function SmallStory({ story, onClick }: { story: News; onClick: (id: string) => void }) {
  return (
    <div
      className="py-4 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-2 transition-colors"
      onClick={() => onClick(story.id)}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        {Array.isArray(story.topics)
          ? story.topics.map((t, i) => <TopicTag key={i} text={t} />)
          : <TopicTag text={story.topics} />}
        <p className="text-[11px] text-gray-500 dark:text-gray-400">{story.posted_at}</p>
      </div>
      <h3 className="text-sm font-semibold mb-1 hover:text-blue-600">{story.title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
        {story.description}
      </p>
    </div>
  );
}

function TrendingCard({ story, onClick }: { story: News; onClick: (id: string) => void }) {
  return (
    <div
      className="cursor-pointer group hover:shadow-md transition-shadow rounded-lg overflow-hidden"
      onClick={() => onClick(story.id)}
    >
      <div className="overflow-hidden">
        <img
          src={story.image_url}
          alt={story.title}
          className="w-full h-28 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {Array.isArray(story.topics)
            ? story.topics.map((t, i) => <TopicTag key={i} text={t} />)
            : <TopicTag text={story.topics} />}
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{story.posted_at}</p>
        </div>
        <h4 className="text-sm font-semibold mb-1 hover:text-blue-600 line-clamp-2">
          {story.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {story.description}
        </p>
      </div>
    </div>
  );
}

/* Grid Section (Arts/Business) */
function NewsGrid({
  title,
  data,
  onClick,
}: {
  title: string;
  data: News[] | null;
  onClick: (id: string) => void;
}) {
  return (
    <>
      <SectionHeader title={title} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 dark:border-gray-700 pb-8">
        <div className="md:col-span-2 lg:col-span-1">
          <FeaturedStory news={data?.[0]} onClick={onClick} />
        </div>
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {data?.slice(1, 4).map((story) => (
            <SmallStory key={story.id} story={story} onClick={onClick} />
          ))}
        </div>
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {data?.slice(4, 7).map((story) => (
            <SmallStory key={story.id} story={story} onClick={onClick} />
          ))}
        </div>
      </div>
    </>
  );
}
