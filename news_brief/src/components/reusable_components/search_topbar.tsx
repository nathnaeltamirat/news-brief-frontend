"use client";
import React from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";
import LoginModal from "../signin_components/loginmodal";

export default function TopBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [view, setView] = React.useState<"signin" | "signup">("signin");

  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex flex-col px-2 py-2 gap-2">
        <div className="flex items-center justify-end order-1">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Bell size={18} className="text-black" />
            </button>

            <div className="flex items-center border rounded px-2 py-1">
              <Globe className="h-4 w-4 mr-1" />
              <select className="bg-transparent outline-none text-sm">
                <option value="English">English</option>
                <option value="Amharic">Amharic</option>
              </select>
            </div>
            <Button
              onClick={() => {
                setView("signin");
                setIsLoginModalOpen(true);
              }}
            >
              Login
            </Button>
          </div>
        </div>

        <div className="w-full order-2">
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
        <div className="flex items-center gap-2 ml-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell size={18} className="text-black" />
          </button>

          <div className="flex  items-center border rounded px-2 py-1">
            <Globe className="h-4 w-4 mr-1" />
            <select className="bg-transparent outline-none">
              <option value="English">English</option>
              <option value="Amharic">Amharic</option>
            </select>
          </div>
          <Button
            onClick={() => {
              setView("signin");
              setIsLoginModalOpen(true);
            }}
          >
            Login
          </Button>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        view={view}
        setView={setView}
      />
    </header>
  );
}
