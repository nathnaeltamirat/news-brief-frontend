'use client'
import Button from "@/components/reusable_components/Button";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import { apiClient } from "@/lib/api";
import { useEffect, useState } from "react";
import ForyouComponent from "@/components/news_component/foryouComponent";

const ForYou = () => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await apiClient.getUser(); 
      setTopics(user.topic_interest);
    };
    fetchUser();
  }, []);

  const MainTopics = () => {
    return (
      <div className="flex gap-7 my-5 overflow-x-auto pb-2">
        {topics.map((item, index) => (
          <Button variant="tertiary" key={index}>
            {item}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex gap-5 bg-white text-black min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0 lg:mt-10 mt-20 px-4 lg:px-0 lg:mr-10">
        <div className="flex justify-between">
          <TopBar />
        </div>
        <MainTopics />
        <ForyouComponent />
      </div>
    </div>
  );
};

export default ForYou;
