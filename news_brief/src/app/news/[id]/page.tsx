// app/news/[id]/page.tsx
"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient, News } from "../../../lib/api";
import Sidebar from "../../../components/siderbar/main";
import ChatBot from "../../../components/reusable_components/chatbot";

// Example custom Card component (adjust to your design)
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-4">
      {children}
    </div>
  );
}
function PromptButton({ text }: { text: string }) {
  return (
    <button className="w-40 h-18 text-[14px] px-3 text-left shadow rounded-2xl border-l-4 relative bg-white hover:bg-gray-50 transition">
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [similarNews, setSimilarNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch top news (simulating detail page)
        const topNews = await apiClient.getTopNews();
        const selected = topNews.find((n) => n.id === params.id) || topNews[0];
        setNews(selected);

        // Fetch all news and filter for similar ones based on topics
        const allNews = await apiClient.getDummyNews();

        // Filter news that share at least one topic with the current news
        if (selected) {
          const similar = allNews.filter(
            (item) =>
              item.id !== selected.id && // Exclude the current news
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!news) return <p className="p-6">News not found.</p>;

  return (
    <>
      <ChatBot defaultOpen={true} />
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0 mt-20 lg:mt-0">
          {/* Header */}
          <header className="flex items-center p-4">
            <div className="relative w-full max-w-xl mx-auto">
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#8f8989"
                    d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search topics, people, ideas..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </header>

          <div className="flex flex-1 space-x-4 lg:space-x-17">
            {/* Left: News Content */}
            <div className="flex-1 p-4 lg:p-6 space-y-6">
              <button
                onClick={() => history.back()}
                className="text-md text-gray-500 hover:underline flex space-x-2 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 12 24"
                  className="flex-shrink-0"
                >
                  <path
                    fill="#8f8989"
                    fill-rule="evenodd"
                    d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
                  />
                </svg>{" "}
                <span> Back</span>
              </button>

              <h1 className="text-xl lg:text-2xl font-bold leading-snug">{news.title}</h1>
              <div className="flex flex-wrap gap-2">
                <button className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">
                  Summerized
                </button>
                <button className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">
                  english
                </button>
              </div>
              <p className="text-gray-600">{news.description}</p>

             
              <div className="bg-gray-200 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black"
                >
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>

              {/* Listening Mode */}

              <h2 className="text-xl lg:text-2xl font-bold mb-4 w-full max-w-sm">
                Listening Modes
              </h2>
              <div className="flex flex-col bg-gradient-to-r from-gray-500 to-white rounded-xl shadow-lg p-4 w-full lg:w-150 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-stretch space-y-4 lg:space-y-0 lg:space-x-4 h-full">
                  <div className="relative w-full lg:w-1/4 h-32 lg:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="/photo.png"
                      alt="Kids on laptops"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold">
                        Global markets rally as major
                      </h3>
                      <p className="text-sm text-gray-500">News Panel Listen</p>
                    </div>
                    <div className="flex flex-col items-start lg:items-end space-y-2 mt-4">
                      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 text-sm">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <span>1:00</span>
                          <div className="w-24 h-1 bg-gray-200 rounded-full">
                            <div className="w-1/4 h-full bg-gray-800 rounded-full"></div>
                          </div>
                          <span>2:23</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium">
                            English
                          </button>
                          <button className="text-gray-400 px-3 py-1 rounded-full font-medium">
                            Amharic
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Similar News */}
              <div>
                <h2 className="font-semibold mb-2">Similar News</h2>
                {similarNews.length > 0 ? (
                  similarNews.map((item) => (
                    <Card key={item.id}>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                          img
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 block mt-1">
                            {item.posted_at} • {item.source}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-500">No similar news found.</p>
                )}
              </div>
            </div>

            {/* Right: Empty space for layout balance - Chat is fixed positioned */}
            <div className="hidden lg:block w-0 md:w-80"></div>
          </div>
        </div>
      </div>
    </>
  );
}
