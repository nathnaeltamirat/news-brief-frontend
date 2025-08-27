"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../../components/siderbar/profile";
import { apiClient, Category } from "@/lib/api";
import Button from "@/components/reusable_components/Button";
import { Edit, Search } from "lucide-react";

const App = () => {
  const [topics, setTopics] = useState<null | Category[]>(null);

  useEffect(() => {
    const getTopics = async () => {
      const data: Category[] = await apiClient.getTopic();
      if (!data) return;
      setTopics(data);
    };
    getTopics();
  }, []);
  if(!topics){
    return <>Loading....</>
  }
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-black font-bold text-xl">Categories of Interest</h1>
        <p className="my-5 text-gray-400">
          Select or add topics to personalize your “For You” feed.
        </p>
        <div className="bg-white w-[80%] p-6">
          <h1 className="text-black font-bold text-xl">Selected Categories</h1>
          <div className="flex flex-wrap my-5">
            {topics?.map((item, index) => (
              <div key={index} className="p-2 -b">
                <Button variant="tertiary">{item.name} </Button>
                {/* <p className="text-sm text-gray-600">{item.name}</p> */}
              </div>
            ))}
          </div>
          <div className="ml-4">
            <Button variant="primary">
              <span className="flex ">
                <Edit />
                Edit
              </span>
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-8 ml-5">
            <div className="flex flex-1 gap-2 border w-[80%] px-3 py-1 rounded-lg">
              <Search />
              <input
                type="text"
                placeholder="Add New Categories"
                className="outline-0 flex-1"
              />
            </div>
            <button className="bg-black text-white rounded-lg px-4 py-2">
              + ADD
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
