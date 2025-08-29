"use client";
import { apiClient, News } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import Button from "../reusable_components/Button";
import { Bookmark } from "lucide-react";
import { ThemeContext } from "@/app/contexts/ThemeContext";

export default function SavedNewsComponent() {
  const [news, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const context = useContext(ThemeContext);

  if (!context) throw new Error("SavedNewsComponent must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    const getInformation = async () => {
      try {
        setLoading(true);
        const newsData = await apiClient.getDummyNews();
        setNews(newsData);
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
    <div className="space-y-4">
      {news?.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row gap-5 rounded-lg border shadow-sm my-2 border-[#E6E6E6] transition-colors ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
            className="w-full lg:w-[20%] h-48 lg:h-auto object-cover rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none"
            alt="Top-News_image"
          />
          <div className="p-4 lg:p-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <div className="flex gap-2 flex-wrap">
                {item.topics.map((value, idx) => (
                  <Button key={idx} variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">
                    {value}
                  </Button>
                ))}
              </div>
              <p className="text-gray-400 my-2">{item.posted_at}</p>
            </div>

            <div className="w-full lg:w-[90%]">
              <p className="font-bold text-lg my-2">{item.title}</p>
              <p className="my-2 font-light">{item.description}</p>
            </div>

            <div className="flex gap-2 my-2">
              <Button variant="tertiary" className="p-2 rounded-full">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
