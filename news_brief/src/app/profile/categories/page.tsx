"use client";
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "@/components/siderbar/profile";
import { apiClient, Category } from "@/lib/api";
import { Edit, Search } from "lucide-react";
import Button from "@/components/reusable_components/Button";
import { ThemeContext } from "@/app/contexts/ThemeContext";

const CategoriesPage = () => {
  const [topics, setTopics] = useState<null | Category[]>(null);
  const context = useContext(ThemeContext);
  if (!context) throw new Error("CategoriesPage must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    const getTopics = async () => {
      const data: Category[] = await apiClient.getTopic();
      if (!data) return;
      setTopics(data);
    };
    getTopics();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans flex flex-col lg:flex-row transition-colors overflow-x-hidden ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 mt-20 lg:mt-0 w-full max-w-full">
        <h1 className="font-bold text-xl">Categories of Interest</h1>
        <p className={`my-5 ${theme === "light" ? "text-gray-500" : "text-gray-300"}`}>
          Select or add topics to personalize your For You feed.
        </p>

        {topics ? (
          <div
            className={`w-full max-w-full lg:w-[80%] p-6 rounded-2xl shadow-md transition-colors overflow-hidden ${
              theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
          >
            <h1 className="font-bold text-lg mb-4">Selected Categories</h1>

            {/* Selected Categories */}
            <div className="flex flex-wrap my-5 gap-2">
              {topics.map((item, index) => (
                <Button key={index} variant="tertiary" className="rounded-lg px-4 py-2 text-sm">
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Edit Button */}
            <div className="ml-0 sm:ml-2 mt-4">
              <Button variant="primary" className="rounded-lg px-4 py-2 text-sm">
                <span className="flex items-center gap-2">
                  <Edit size={16} /> Edit
                </span>
              </Button>
            </div>

            {/* Add New Categories */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-8 w-full">
              <div
                className={`flex flex-1 gap-2 border px-3 py-2 rounded-lg w-full sm:w-[80%] transition-colors ${
                  theme === "light" ? "border-gray-300" : "border-gray-600"
                }`}
              >
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Add New Categories"
                  className={`outline-none flex-1 bg-transparent ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </div>
              <Button variant="primary" className="rounded-lg px-4 py-2 text-sm w-full sm:w-auto">
                + ADD
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </main>
    </div>
  );
};

export default CategoriesPage;
