"use client";
import { apiClient, News } from "@/lib/api";
import { useEffect, useState } from "react";
import Button from "../reusable_components/Button";
import { Bookmark, ThumbsDown } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import

export default function NewsComponent() {
  const [topNews, setTopNews] = useState<News[] | null>(null);
  const [news, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

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
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to fetch news");
        }
      } finally {
        setLoading(false);
      }
    };
    getInformation();
  }, []);

  // Function to handle news item click
  const handleNewsClick = (newsId: string) => {
    router.push(`/news/${newsId}`);
  };

  if (loading) return <p>Loading news ...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;

  return (
    <div className="w-full max-w-2xl  overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 rounded-lg border shadow-sm border-[#E6E6E6] w-full cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
          className="w-full lg:w-[30%] object-cover rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none"
          alt="Top-News_image"
        />
        <div className="p-2 flex-1 min-w-0">
          {topNews?.map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  <Button variant="tertiary">Top Story</Button>
                </div>
                <p className="text-gray-400 text-xs lg:text-sm">
                  {item.posted_at}
                </p>
              </div>
              <div className="">
                <p
                  className="font-bold my-2 cursor-pointer hover:text-gray-500 line-clamp-2"
                  onClick={() => handleNewsClick(item.id)}
                >
                  {item.title}
                </p>
                <p className=" text-sm font-light line-clamp-2 lg:line-clamp-none mb-3">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 my-2 lg:my-3">
                <Button variant="tertiary">
                  <Bookmark className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                </Button>
                <Button variant="tertiary">
                  <ThumbsDown className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                </Button>
              </div>
              <p className="text-xs lg:text-sm text-gray-400">
                Source: {item.source}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h1 className="my-4 sm:my-5 lg:my-6 font-bold text-base sm:text-lg lg:text-xl">
        Your Briefing
      </h1>

      <div className="space-y-4 sm:space-y-5 w-full">
        {news?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-3 p-2 lg:gap-4 rounded-lg border shadow-sm border-[#E6E6E6] w-full cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
            onClick={() => handleNewsClick(item.id)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
              className="w-full lg:w-[20%] object-cover rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none"
              alt="News image"
            />
            <div className="  flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <div className="flex gap-1 lg:gap-2 flex-wrap">
                  {item.topics.map((value, index) => (
                    <Button variant="tertiary" key={index}>
                      {value}
                    </Button>
                  ))}
                </div>
                <p className="text-gray-400 text-xs ">
                  {item.posted_at}
                </p>
              </div>
              <div className="mt-2 lg:mt-3">
                <p className="font-bold text-sm sm:text-base lg:text-lg my-2 lg:my-3 hover:text-gray-500 line-clamp-2">
                  {item.title}
                </p>
                <p className="sm:text-sm font-light line-clamp-2 lg:line-clamp-none mb-3">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 my-2 lg:my-3">
                <Button variant="tertiary">
                  <Bookmark className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                </Button>
                <Button variant="tertiary">
                  <ThumbsDown className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                </Button>
              </div>
              <p className="text-xs lg:text-sm text-gray-400">
                Source: {item.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
