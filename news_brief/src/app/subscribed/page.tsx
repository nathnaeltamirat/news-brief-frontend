'use client'
import Button from "@/components/reusable_components/Button";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import { apiClient } from "@/lib/api";
import { useEffect, useState } from "react";
import SubscribedComponent from "@/components/news_component/subscribedComponent";

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
      <div className="flex gap-7 my-5">
        {topics.map((item, index) => (
          <Button variant="tertiary" key={index}>
            {item}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex gap-5 bg-white text-black">
      <Sidebar />
      <div className="mt-10 flex-1 mr-10">
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
