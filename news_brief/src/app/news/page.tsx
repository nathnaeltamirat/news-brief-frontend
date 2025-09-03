// "use client";
// import React, { useContext } from "react";
// import Button from "@/components/reusable_components/Button";
// import NewsComponent from "@/components/news_component/NewsComponent";
// import TopBar from "@/components/reusable_components/search_topbar";
// import Sidebar from "@/components/siderbar/main";
// import ChatBot from "@/components/reusable_components/chatbot";
// import { ThemeContext } from "../contexts/ThemeContext";

// const News = () => {
//   const context = useContext(ThemeContext);

//   if (!context)
//     throw new Error("ToggleButton must be used inside ThemeProvider");
//   const { theme } = context;

//   const categories = [
//     "All",
//     "Technology",
//     "Business",
//     "Sports",
//     "Science",
//     "Health",
//     "World",
//   ];

//   const MainTopics = () => (
//     <div className="flex gap-3 sm:gap-5 my-3 sm:my-5 overflow-x-auto pb-3 w-full scrollbar-hide">
//       {categories.map((item, index) => (
//         <Button
//           key={index}
//           variant="tertiary"
//           className="flex-shrink-0 rounded-lg px-4 py-2 text-sm"
//         >
//           {item}
//         </Button>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       <ChatBot />
//       <div
//         className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors ${
//           theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
//         }`}
//       >
//         <Sidebar />
//         <div className="flex-1 lg:ml-0 lg:mt-10 mt-16 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
//           <div className="flex justify-between w-full mb-4">
//             <TopBar />
//           </div>
//           <MainTopics />
//           <NewsComponent />
//         </div>
//       </div>
//     </>
//   );
// };

// export default News;
"use client";
import { useState } from "react";
import { Search, LogIn, Menu } from "lucide-react";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, Rss, Bookmark, Settings, User, X } from "lucide-react";

import { Bell } from "lucide-react";
import { Languages } from "lucide-react";
import NewsFeed from "@/components/news_component/NewsComponent";
import Sidebar from "@/components/siderbar/main";

import Chatbot from "@/components/reusable_components/chatbot";
import TrendingNews from "@/components/news_component/TrendingNews";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="min-h-screen flex bg-white text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-4 shadow-sm bg-white">
          <div className="flex items-center gap-2  rounded border border-gray-200 px-3 py-2 w-full max-w-md ">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search news, topics, sources"
              className="bg-transparent outline-none flex-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Desktop Login */}
          <div className="flex items-center gap-4  ">
            <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100  hover:bg-[#696b6b] ">
              <Bell size={16} />
            </button>

            <div className="relative">
              {/* Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-300 transition-colors font-bold"
              >
                <Languages size={16} />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    English
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Amharic
                  </button>
                </div>
              )}
            </div>
            <button
              className="flex items-center gap-1 text-white rounded-lg px-4 py-2 shadow-md transition"
              style={{ backgroundColor: "#1E5A47" }}
            >
              <LogIn size={16} /> Login
            </button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex gap-3 px-4 py-3 text-sm text-gray-900 font-semibold overflow-x-auto shadow-sm bg-white">
          {[
            "Entertainment",
            "Agriculture",
            "Sports",
            "Business",
            "World",
            "Health",
            "Science",
          ].map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-gray-100 rounded-lg cursor-pointer whitespace-nowrap shadow-sm hover:bg-[#D9EDE5]"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Main Layout */}
        <div className="flex flex-1 p-6 gap-6 flex-col lg:flex-row bg-gray-50">
          {/* Left Column: News Feed */}
          <NewsFeed />

          {/* Right Column: Trending News */}
          <TrendingNews />
        </div>

        {/* Floating Chatbot Button */}

        <Chatbot />
      </div>
    </div>
  );
}
