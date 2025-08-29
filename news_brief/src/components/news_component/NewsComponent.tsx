"use client";
import { apiClient, News } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import Button from "../reusable_components/Button";
import { Bookmark, ThumbsDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/app/contexts/ThemeContext";

export default function NewsComponent() {
  const [topNews, setTopNews] = useState<News[] | null>(null);
  const [news, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const context = useContext(ThemeContext);
  if (!context) throw new Error("NewsComponent must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    const getInformation = async () => {
      try {
        setLoading(true);
        const [newsData, topNewsData] = await Promise.all([
          apiClient.getDummyNews(),
          apiClient.getTopNews(),
        ]);
        setNews(newsData);
        setTopNews(topNewsData);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    getInformation();
  }, []);

  const handleNewsClick = (newsId: string) => {
    router.push(`/news/${newsId}`);
  };

  if (loading) return <p>Loading news ...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;

  const cardBg = theme === "light" ? "bg-white text-black border-[#E6E6E6]" : "bg-gray-800 text-white border-gray-700";

  return (
    <div className="w-full space-y-6">
      {/* Top News */}
      <div className={`flex flex-col lg:flex-row gap-3 lg:gap-4 rounded-lg border shadow-sm cursor-pointer transition-shadow overflow-hidden ${cardBg}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
          className="w-full lg:w-[30%] object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
          alt="Top-News_image"
        />
        <div className="p-3 flex-1 min-w-0">
          {topNews?.map((item, index) => (
            <div key={index} className="w-full space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex gap-1 flex-wrap">
                  <Button variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">Top Story</Button>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">{item.posted_at}</p>
              </div>

              <p
                className="font-bold my-2 cursor-pointer hover:text-gray-500 line-clamp-2"
                onClick={() => handleNewsClick(item.id)}
              >
                {item.title}
              </p>
              <p className="text-sm font-light line-clamp-2 sm:line-clamp-none mb-2">{item.description}</p>

              <div className="flex gap-2">
                <Button variant="tertiary" className="rounded-lg px-2 py-1">
                  <Bookmark className="w-4 h-4 mr-1" /> 
                </Button>
                <Button variant="tertiary" className="rounded-lg px-2 py-1">
                  <ThumbsDown className="w-4 h-4 mr-1" /> 
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">Source: {item.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Your Briefing */}
      <h1 className="font-bold text-base sm:text-lg lg:text-xl">Your Briefing</h1>

      <div className="space-y-4">
        {news?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row gap-3 p-3 rounded-lg border shadow-sm cursor-pointer transition-shadow overflow-hidden ${cardBg}`}
            onClick={() => handleNewsClick(item.id)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
              className="w-full lg:w-[20%] object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
              alt="News image"
            />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-1 lg:gap-2">
                  {item.topics.map((topic, idx) => (
                    <Button key={idx} variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">{topic}</Button>
                  ))}
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">{item.posted_at}</p>
              </div>

              <p className="font-bold text-sm sm:text-base lg:text-lg my-1 hover:text-gray-500 line-clamp-2">{item.title}</p>
              <p className="text-sm font-light line-clamp-2 sm:line-clamp-none mb-2">{item.description}</p>

              <div className="flex gap-2">
                <Button variant="tertiary" className="rounded-lg px-2 py-1">
                  <Bookmark className="w-4 h-4 mr-1" />
                </Button>
                <Button variant="tertiary" className="rounded-lg px-2 py-1">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">Source: {item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
