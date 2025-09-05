"use client";
import React, { useContext, useState } from "react";
import { Bell, Globe, Search, Mic } from "lucide-react";
import Button from "./Button";
import SignInCard from "../signin_components/siginCard";
import SignUpCard from "../signup_components/signupCard";
import ForgotPasswordCard from "../../components/forgotpassword_components/forgotpassCard";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { getAccessToken } from "@/lib/api";
import DarkMode from "../dark_mode/DarkMode";
import ProfileDropdown from "./DropDownBar";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const token = getAccessToken();

export default function TopBar() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("TopBar must be used inside ThemeProvider");
  const { theme } = context;

  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"signin" | "signup" | "forgot">("signin");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    "all",
    "world",
    "national",
    "politics",
    "business",
    "economy",
    "finance",
    "technology",
    "science",
    "health",
    "environment",
    "education",
    "law",
    "crime",
    "weather",
    "opinion",
    "sport",
  ];

  const bgInput =
    theme === "light"
      ? "bg-gray-100 text-black placeholder-gray-500"
      : "bg-gray-800 text-white placeholder-gray-400";

  const bgBtn =
    theme === "light"
      ? "hover:bg-gray-200 text-black"
      : "hover:bg-gray-700 text-white";

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <header
        className={`w-full sticky top-0 z-20 transition-colors ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          {/* First Row: Logo + Actions */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" className="w-6" alt="logo" />
              <p className="font-semibold hidden sm:block">News Brief</p>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden sm:block">    <DarkMode /></div>
          
              <button className={`p-2 rounded-full ${bgBtn}`} aria-label="Notifications">
                <Bell size={18} />
              </button>

              {/* Language Dropdown */}
              <div className="relative  ">
                <select
                  className={`appearance-none pr-6 cursor-pointer text-sm outline-none rounded-md border px-2 py-1 ${
                    theme === "light"
                      ? "bg-white text-black border-gray-300 hover:bg-gray-100"
                      : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                  }`}
                  value={i18n.language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">{t("languages.english")}</option>
                  <option value="am">{t("languages.amharic")}</option>
                </select>
                <Globe
                  size={16}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </div>

              {/* Login / Profile */}
              {!token ? (
                <Button
                  variant="primary"
                  className="rounded-lg px-4 py-1.5 text-sm"
                  onClick={() => {
                    setOpen(true);
                    setView("signin");
                  }}
                >
                  {t("auth.login")}
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

          {/* Second Row: Categories */}
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
                {t(`categories.${cat}`)}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Third Row: Search */}
          <div className={`flex items-center rounded-full px-3 sm:px-4 py-2 ${bgInput}`}>
            <Search size={18} className="mr-2 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <Mic size={18} className="text-gray-500 cursor-pointer flex-shrink-0" />
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
            <SignUpCard onClose={() => setOpen(false)} onSwitchToSignIn={() => setView("signin")} />
          )}
          {view === "forgot" && (
            <ForgotPasswordCard onClose={() => setOpen(false)} onBackToSignIn={() => setView("signin")} />
          )}
        </div>
      )}
    </>
  );
}
