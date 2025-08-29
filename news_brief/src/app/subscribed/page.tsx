'use client'
import Button from "@/components/reusable_components/Button";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import { apiClient } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import SubscribedComponent from "@/components/news_component/subscribedComponent";
import { ThemeContext } from "../contexts/ThemeContext";

const ForYou = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await apiClient.getUser(); 
      setTopics(user.topic_interest);
    };
    fetchUser();
  }, []);

  const MainTopics = () => {
    return (
      <div
        className={`flex gap-3 sm:gap-5 my-5 overflow-x-auto pb-2 scrollbar-hide px-2 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        {topics.map((item, index) => (
          <Button
            variant="tertiary"
            key={index}
            className="rounded-full px-3 py-1 text-sm flex-shrink-0"
          >
            {item}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Sidebar />
      <div className="flex-1 lg:ml-0 lg:mt-10 mt-20 px-4 lg:px-6 lg:mr-10 w-full max-w-full overflow-x-hidden">
        <div className="flex justify-between">
          <TopBar />
        </div>
        <MainTopics />
        <SubscribedComponent />
      </div>
    </div>
  );
};

export default ForYou;
