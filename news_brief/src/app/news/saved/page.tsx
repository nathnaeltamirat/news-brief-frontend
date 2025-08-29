"use client"
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import SavedNewsComponent from "@/components/news_component/SavedNewsComponent";
import { useContext } from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext";

const SavedNews = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  return (
    <>
      <div className={`flex gap-5  min-h-screen ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}>
        <Sidebar />
        <div className="flex-1 lg:ml-0 lg:mt-10 mt-20 px-4 lg:px-0 lg:mr-10">
          <TopBar />

          <h1 className="my-5 font-bold text-xl">Saved News</h1>
          <SavedNewsComponent />
        </div>
      </div>
    </>
  );
};

export default SavedNews;
