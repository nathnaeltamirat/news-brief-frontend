'use client';
import { apiClient, News } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import Button from "../reusable_components/Button";
import { Bookmark, ThumbsDown } from "lucide-react";
import { ThemeContext } from "@/app/contexts/ThemeContext";


export default function ForyouComponent() {
  const [news, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    const getInformation = async () => {
      try {
        setLoading(true);
        const topicNews = await apiClient.getTopicFeed();
        setNews(topicNews);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    getInformation();
  }, []);

  if (loading) return <p>Loading news ...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;

  return (
    <div className={`${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} w-full`}>
      <h1 className="my-5 font-bold text-xl">For You Feed</h1>

      <div className="space-y-4">
        {news?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-5 rounded-lg border shadow-sm my-2 border-[#E6E6E6] w-full overflow-hidden"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
              className="w-full lg:w-[20%] h-48 lg:h-auto object-cover rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none"
              alt="Top-News_image"
            />
            <div className="p-4 flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((value, idx) => (
                    <Button
                      key={idx}
                      variant="tertiary"
                      className="rounded-full px-4 py-1 text-sm flex-shrink-0"
                    >
                      {value}
                    </Button>
                  ))}
                </div>
                <p className="text-gray-400 my-2 text-sm">{item.posted_at}</p>
              </div>

              <div className="mt-2">
                <p className="font-bold text-lg my-2">{item.title}</p>
                <p className="my-2 font-light">{item.description}</p>
              </div>

              <div className="flex gap-2 my-2">
                <Button variant="tertiary" className="rounded-full p-2">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="tertiary" className="rounded-full p-2">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-400">Source: {item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
