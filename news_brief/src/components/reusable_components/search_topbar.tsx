"use client";
import React, { useContext } from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";
import { ThemeContext } from "@/app/contexts/ThemeContext";

export default function TopBar() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  const bgInput = theme === "light" ? "bg-gray-100 text-black" : "bg-gray-800 text-white";
  const bgBtn = theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-black" : "bg-gray-700 hover:bg-gray-600 text-white";
  const textSelect = theme === "light" ? "text-black" : "text-white";

  return (
    <header
      className={`w-full transition-colors ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col px-2 py-1 gap-2">
        {/* Top row - Controls */}
        <div className="flex items-center justify-end gap-2">
          {/* Notification Bell */}
          <button className={`p-1.5 sm:p-2 rounded-full ${bgBtn}`}>
            <Bell size={16} />
          </button>

          {/* Language Selector */}
          <div
            className={`flex items-center border rounded px-1.5 sm:px-2 py-0.5 sm:py-1 ${bgInput}`}
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 flex-shrink-0" />
            <select className={`bg-transparent outline-none text-xs sm:text-sm ${textSelect}`}>
              <option value="English">English</option>
              <option value="Amharic">Amharic</option>
            </select>
          </div>

          {/* Login Button */}
          <Button variant="primary" className="rounded-lg px-3 py-1 text-sm">
            Login
          </Button>
        </div>

        {/* Bottom row - Search bar */}
        <div className="w-full mt-2">
          <div
            className={`flex items-center rounded-full px-3 sm:px-4 py-2 sm:py-1.5 ${bgInput}`}
          >
            <Search size={16} className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search topics, people, places ..."
              className="bg-transparent outline-none flex-1 text-xs sm:text-sm"
            />
            <Mic size={16} className="text-gray-500 cursor-pointer flex-shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
