"use client";
import React, { useContext } from "react";
import Button from "@/components/reusable_components/Button";
import NewsComponent from "@/components/news_component/NewsComponent";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import ChatBot from "@/components/reusable_components/chatbot";
import { ThemeContext } from "../contexts/ThemeContext";

const News = () => {
  const context = useContext(ThemeContext);
 
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  const categories = [
    "All",
    "Technology",
    "Business",
    "Sports",
    "Science",
    "Health",
    "World",
  ];

  const MainTopics = () => (
    <div className="flex gap-3 sm:gap-5 my-3 sm:my-5 overflow-x-auto pb-3 w-full scrollbar-hide">
      {categories.map((item, index) => (
        <Button
          key={index}
          variant="tertiary"
          className="flex-shrink-0 rounded-lg px-4 py-2 text-sm"
        >
          {item}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <ChatBot />
      <div
        className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <Sidebar />
        <div className="flex-1 lg:ml-0 lg:mt-10 mt-16 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
          <div className="flex justify-between w-full mb-4">
            <TopBar />
          </div>
          <MainTopics />
          <NewsComponent />
        </div>
      </div>
    </>
  );
};

export default News;
