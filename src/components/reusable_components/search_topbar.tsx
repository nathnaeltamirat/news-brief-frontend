import React from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";

export default function TopBar() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-2">
        
        {/* Search bar */}
        <div className="w-[60%] max-w-3xl">
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
              <div className="flex  items-center border rounded px-2 py-1">
                <Globe className="h-4 w-4 mr-1" />
                <select className="bg-transparent outline-none">
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                </select>
              </div>

          {/* Login */}
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
