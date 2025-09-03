"use client";
import React, { useEffect, useState } from "react";
import { apiClient, News } from "@/lib/api";
import { NewsGrid } from "@/components/news_component/NewsComponent";
import TopBar from "@/components/reusable_components/search_topbar";
import router from "next/router";

interface ForYouProps {
  theme: "light" | "dark";
  handleNewsClick: (id: string) => void;
}

const SkeletonNewsGrid = ({
  title,
  theme,
}: {
  title: string;
  theme: "light" | "dark";
}) => {
  const bg = theme === "dark" ? "bg-gray-700" : "bg-gray-300";

  return (
    <div>
      {/* Section Header */}
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>

      {/* Grid layout same as NewsGrid */}
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Featured story skeleton */}
        <div className="md:col-span-2 lg:col-span-1 animate-pulse space-y-3">
          <div className={`${bg} h-48 w-full rounded-md`} />
          <div className={`${bg} h-4 w-3/4 rounded-md`} />
          <div className={`${bg} h-4 w-1/2 rounded-md`} />
        </div>

        {/* Column 1 of small stories */}
        <div className="flex flex-col divide-y animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-4 space-y-2">
              <div className={`${bg} h-20 w-full rounded-md`} />
              <div className={`${bg} h-3 w-2/3 rounded-md`} />
              <div className={`${bg} h-3 w-1/3 rounded-md`} />
            </div>
          ))}
        </div>

        {/* Column 2 of small stories */}
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
const handleNewsClick = (newsId: string) => router.push(`/news/${newsId}`);
const ForYouComponent: React.FC<ForYouProps> = ({ theme, handleNewsClick }) => {
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
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to fetch news"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-8 mx-10 mt-4">
      <TopBar />

      {loading ? (
        <>
          <SkeletonNewsGrid title="Arts" theme={theme} />
          <SkeletonNewsGrid title="Business" theme={theme} />
        </>
      ) : errorMessage ? (
        <p className="text-center py-10 text-red-500">{errorMessage}</p>
      ) : (
        <>
          <NewsGrid
            title="Arts"
            data={artsNews}
            onClick={handleNewsClick}
            theme={theme}
          />
          <NewsGrid
            title="Business"
            data={businessNews}
            onClick={handleNewsClick}
            theme={theme}
          />
          <NewsGrid
            title="Poltics"
            data={businessNews}
            onClick={handleNewsClick}
            theme={theme}
          />
        </>
      )}
    </div>
  );
};

export default ForYouComponent;
