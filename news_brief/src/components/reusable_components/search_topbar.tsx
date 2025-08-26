import React from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";

export default function TopBar() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-2">
        
        {/* Search bar */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search topics, people, places ..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <Mic size={18} className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-2">
          {/* Notification Bell */}
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell size={18} className="text-black" />
          </button>

          {/* Language */}
          <button className="flex items-center gap-1 border bg-white px-2.5 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50">
            <Globe size={16} className="text-black" />
            English
          </button>

          {/* Login */}
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
