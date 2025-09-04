"use client";
import React, { useContext, useState } from "react";
import { Bell, Globe, Search, Mic } from "lucide-react";
import Button from "./Button";
import SignInCard from "../signin_components/siginCard";
import SignUpCard from "../signup_components/signupCard";
import ForgotPasswordCard from "../../components/forgotpassword_components/forgotpassCard";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { ActiveCategoryContext } from "@/app/contexts/ActiveCategoryContext";
import { getAccessToken } from "@/lib/api";
import DarkMode from "../dark_mode/DarkMode";
import ProfileDropdown from "./DropDownBar";
import Link from "next/link";


const token = getAccessToken();

export default function TopBar() {
  const themeContext = useContext(ThemeContext);
  const activeCategoryContext = useContext(ActiveCategoryContext);
  
  if (!themeContext)
    throw new Error("TopBar must be used inside ThemeProvider");
  if (!activeCategoryContext)
    throw new Error("TopBar must be used inside ActiveCategoryProvider");
    
  const { theme } = themeContext;
  const { activeCategory, setActiveCategory } = activeCategoryContext;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"signin" | "signup" | "forgot">("signin");


  const categories = [
    "All",
    "World",
    "National",
    "Politics",
    "Business",
    "Economy",
    "Finance",
    "Technology",
    "Science",
    "Health",
    "Environment",
    "Education",
    "Law",
    "Crime",
    "Weather",
    "Opinion",
    "Sport",
  ];

  const bgInput =
    theme === "light"
      ? "bg-gray-100 text-black placeholder-gray-500"
      : "bg-gray-800 text-white placeholder-gray-400";

  const bgBtn =
    theme === "light"
      ? "hover:bg-gray-100 text-black"
      : "hover:bg-gray-700 text-white";

      

  return (
    <>
      <header
        className={`w-full sticky  top-0 z-20 transition-colors ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          {/* 🔹 First Row: Logo + Right Actions */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" className="w-6" alt="logo" />
              <p className="font-semibold ">News Brief</p>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Notifications */}
              <DarkMode />
              <button
                className={`p-2 rounded-full ${bgBtn}`}
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>

              {/* Language dropdown */}
              <div className="relative hidden sm:block">
                <select
                  className={`appearance-none bg-transparent pr-6 cursor-pointer text-sm outline-none ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                  defaultValue="eng"
                >
                  <option value="eng">English</option>
                  <option value="amh">Amharic</option>
                </select>
                <Globe
                  size={16}
                  className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              {/* Login / Profile Dropdown */}
              {!token ? (
                <Button
                  variant="primary"
                  className="rounded-lg px-4 py-1.5 text-sm"
                  onClick={() => {
                    setOpen(true);
                    setView("signin");
                  }}
                >
                  Login
                </Button>
              ) : (
                <ProfileDropdown
                  onLogoutClick={() => {
                    setView("signin");
                    setOpen(true);
                  }}
                />
              )}
            </div>
          </div>

          {/* 🔹 Second Row: Topics (Below on mobile, inline on desktop) */}
          <div className="flex gap-6 text-sm font-medium overflow-x-auto scrollbar-hide border-b border-gray-200 sm:border-none pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative whitespace-nowrap pb-2 transition-colors ${
                  activeCategory === cat
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* 🔹 Third Row: Search Bar */}
          <div
            className={`flex items-center rounded-full px-3 sm:px-4 py-2 ${bgInput}`}
          >
            <Search size={18} className="mr-2 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search news, topics, or people..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <Mic
              size={18}
              className="text-gray-500 cursor-pointer flex-shrink-0"
            />
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          {view === "signin" && (
            <SignInCard
              onClose={() => setOpen(false)}
              onSwitchToSignUp={() => setView("signup")}
              onSwitchToForgot={() => setView("forgot")}
            />
          )}
          {view === "signup" && (
            <SignUpCard
              onClose={() => setOpen(false)}
              onSwitchToSignIn={() => setView("signin")}
            />
          )}
          {view === "forgot" && (
            <ForgotPasswordCard
              onClose={() => setOpen(false)}
              onBackToSignIn={() => setView("signin")}
            />
          )}
        </div>
      )}
    </>
  );
}
