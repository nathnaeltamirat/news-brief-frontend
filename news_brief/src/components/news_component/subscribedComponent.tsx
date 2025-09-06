"use client";
import { apiClient, News, Topic } from "@/lib/api";
import { useEffect, useState, useContext } from "react";
import Button from "../reusable_components/Button";
import { Bookmark, ThumbsDown } from "lucide-react";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function SubscribedComponent() {
  const [news, setNews] = useState<News[] | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const context = useContext(ThemeContext);
  if (!context) throw new Error("SubscribedComponent must be used inside ThemeProvider");
  const { theme } = context;
  const { i18n } = useTranslation();

  useEffect(() => {
    const getInformation = async () => {
      try {
        setLoading(true);
        const [topicNews, topicsData] = await Promise.all([
          apiClient.getSubscribedFeed(),
          apiClient.getTopics()
        ]);
        setNews(topicNews);
        setTopics(topicsData);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    getInformation();
  }, []);

  // Helper function to convert topic IDs to topic names
  const getTopicNames = (topicIds: string[]): string[] => {
    return topicIds.map(id => {
      const topic = topics.find(t => t.id === id);
      return topic ? (i18n.language === 'am' ? topic.label.am : topic.label.en) : id;
    });
  };

  if (loading) return <p>Loading news ...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;

  return (
    <>
      <h1 className={`my-5 font-bold text-xl ${theme === "light" ? "text-black" : "text-white"}`}>
        Subscribed Feed
      </h1>

      <div className="space-y-4">
        {news?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row gap-5 rounded-lg border shadow-sm my-2 w-full transition-colors ${
              theme === "light" ? "bg-white text-black border-[#E6E6E6]" : "bg-gray-900 text-white border-gray-700"
            }`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
              className="w-full lg:w-[20%] h-48 lg:h-auto object-cover rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none"
              alt="Top-News_image"
            />
            <div className="p-4 flex-1">
              {/* Topics & Date */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex gap-2 flex-wrap">
                  {getTopicNames(item.topics).map((topicName, idx) => (
                    <Button key={idx} variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">
                      {topicName}
                    </Button>
                  ))}
                </div>
                <p className="text-gray-400 my-2 text-sm">{item.posted_at}</p>
              </div>

              {/* Title & Description */}
              <div className="mt-2">
                <p className="font-bold text-lg my-2">{item.title}</p>
                <p className="my-2 font-light">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 my-2">
                <Button variant="tertiary" className="p-2 rounded-full">
                  <Bookmark className="w-5 h-5" />
                </Button>
                <Button variant="tertiary" className="p-2 rounded-full">
                  <ThumbsDown className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-gray-400">Source: {item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
