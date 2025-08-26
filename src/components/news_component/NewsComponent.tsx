"use client";
import { apiClient, News } from "@/lib/api";
import { useEffect, useState } from "react";
import Button from "../reusable_components/Button";
import { Bookmark, ThumbsDown } from "lucide-react";

export default function NewsComponent() {
  const [topNews, setTopNews] = useState<News[] | null>(null);
  const [news, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  if (loading) return <p>Loading news ...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;
  return (
    <>
      <div className="flex gap-5 rounded-lg border shadow-sm border-[#E6E6E6]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
          className="w-[40%] rounded-tl-lg rounded-bl-lg"
          alt="Top-News_image"
        />
        <div>
          {topNews?.map((item, index) => (
            <div key={index} className="p-2">
              <div className="flex gap-2">
                <Button variant="tertiary">Top Story</Button>
                <p className="text-gray-200 my-2">{item.posted_at}</p>
              </div>
              <div className="w-[70%]">
                {" "}
                <p className="font-bold text-lg my-2">{item.title}</p>
                <p className="my-2 font-light">{item.description}</p>
              </div>
              <div className="flex gap-2 my-2">
                <Button variant="tertiary">
                  <Bookmark className="w-4 h-4 mr-1" />
                </Button>

                <Button variant="tertiary">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className="my-5 font-bold text-xl">Your Brifieng</h1>

      <div>
        {news?.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-lg border shadow-sm my-2 border-[#E6E6E6]"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
              className="w-[20%]  rounded-tl-lg rounded-bl-lg"
              alt="Top-News_image"
            />
            <div className="p-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {item.topics.map((value, index) => (
                    <Button variant="tertiary" key={index}>
                      {value}
                    </Button>
                  ))}
                </div>

                <p className="text-gray-200 my-2">{item.posted_at}</p>
              </div>
              <div className="w-[90%]">
                {" "}
                <p className="font-bold text-lg my-2">{item.title}</p>
                <p className="my-2 font-light">{item.description}</p>
              </div>
              <div className="flex gap-2 my-2">
                <Button variant="tertiary">
                  <Bookmark className="w-4 h-4 mr-1" />
                </Button>

                <Button variant="tertiary">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
