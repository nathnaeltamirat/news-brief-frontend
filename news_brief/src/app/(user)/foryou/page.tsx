"use client";
import React, { useEffect, useState, useContext } from "react";
import { apiClient, News } from "@/lib/api";
import { NewsGrid } from "@/components/news_component/NewsComponent";
import TopBar from "@/components/reusable_components/search_topbar";
import ChatBot from "@/components/reusable_components/chatbot";
import router from "next/router";
import { ThemeContext } from "@/app/contexts/ThemeContext";

interface ForYouProps {
  handleNewsClick: (id: string) => void;
}

const SkeletonNewsGrid = ({ title }: { title: string }) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("SkeletonNewsGrid must be used inside ThemeProvider");
  const { theme } = context;

  const bg = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const text = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className="mb-6 ml-5">
      <h2 className={`text-xl font-semibold mb-4 ${text}`}>{title}</h2>
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${border}`}>
        <div className="md:col-span-2 lg:col-span-1 animate-pulse space-y-3">
          <div className={`${bg} h-48 w-full rounded-md`} />
          <div className={`${bg} h-4 w-3/4 rounded-md`} />
          <div className={`${bg} h-4 w-1/2 rounded-md`} />
        </div>
        <div className="flex flex-col divide-y animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-4 space-y-2">
              <div className={`${bg} h-20 w-full rounded-md`} />
              <div className={`${bg} h-3 w-2/3 rounded-md`} />
              <div className={`${bg} h-3 w-1/3 rounded-md`} />
            </div>
          ))}
        </div>
        <div className="flex flex-col divide-y animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-4 space-y-2">
              <div className={`${bg} h-20 w-full rounded-md`} />
              <div className={`${bg} h-3 w-2/3 rounded-md`} />
              <div className={`${bg} h-3 w-1/3 rounded-md`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// const handleNewsClick = (newsId: string) => router.push(`/news/${newsId}`);

const ForYouComponent: React.FC<ForYouProps> = ({ handleNewsClick }) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ForYouComponent must be used inside ThemeProvider");
  const { theme } = context;

  const [artsNews, setArtsNews] = useState<News[] | null>(null);
  const [businessNews, setBusinessNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [artsData, businessData] = await Promise.all([
          apiClient.getArtsNews(),
          apiClient.getBusinessNews(),
        ]);
        setArtsNews(artsData);
        setBusinessNews(businessData);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <ChatBot />
      <div
        className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="flex-1 lg:ml-0 lg:mt-1 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
          {/* Top Bar aligned consistently with News page */}
          <div className="flex justify-between w-full mb-4">
            <TopBar />
          </div>

          {/* Content */}
          {loading ? (
            <>
              <SkeletonNewsGrid title="Arts" />
              <SkeletonNewsGrid title="Business" />
            </>
          ) : errorMessage ? (
            <p className="text-center py-10 text-red-500">{errorMessage}</p>
          ) : (
            <>
              <div className="mb-6 ml-5">
                <NewsGrid title="Arts" data={artsNews} onClick={handleNewsClick} theme={theme} />
              </div>
              <div className="mb-6 ml-5">
                <NewsGrid title="Business" data={businessNews} onClick={handleNewsClick} theme={theme} />
              </div>
              <div className="mb-6 ml-5">
                <NewsGrid title="Politics" data={businessNews} onClick={handleNewsClick} theme={theme} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForYouComponent;
