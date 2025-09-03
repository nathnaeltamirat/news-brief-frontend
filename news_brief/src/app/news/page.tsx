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
import TopBar from "@/components/reusable_components/search_topbar";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white text-gray-800">
      <Sidebar />

      <div className="flex-1 lg:ml-0 lg:mt-1 mt-16 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
        {/* Top Bar with horizontal scrolling */}
        <div className="w-full mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex justify-between min-w-max">
            <TopBar />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-1 p-6 gap-6 flex-col lg:flex-row bg-gray-50">
          <NewsFeed />
          <TrendingNews />
        </div>

        <Chatbot />
      </div>
    </div>
  );
}

//    <div className="flex justify-between w-full mb-4">
//      <TopBar />
//    </div>

//    <NewsComponent />
//    {/* <Footer /> */}
//  </div>;