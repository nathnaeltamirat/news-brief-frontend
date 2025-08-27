import React from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";

export default function TopBar() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex flex-col px-2 py-1 gap-2">
        
        {/* Top row - Controls (notification, language, login) */}
        <div className="flex items-center justify-end order-1">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notification Bell */}
            <button className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Bell size={16} className="text-black" />
            </button>

            {/* Language */}
            <div className="flex items-center border rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 flex-shrink-0" />
              <select className="bg-transparent outline-none text-xs sm:text-sm">
                <option value="English">English</option>
                <option value="Amharic">Amharic</option>
              </select>
            </div>

            {/* Login */}
            <Button>Login</Button>
          </div>
        </div>

        {/* Bottom row - Search bar */}
        <div className="w-full order-2">
          <div className="flex items-center bg-gray-100 rounded-full px-3 sm:px-3 py-2 sm:py-1.5">
            <Search size={16} className="text-gray-500 mr-1 sm:mr-2 flex-shrink-0" />
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
