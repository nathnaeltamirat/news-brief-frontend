"use client";
import React, { useContext, useState } from "react";
import { Search, Mic, Bell, Globe } from "lucide-react";
import Button from "./Button";
import SignInCard from "../signin_components/siginCard";
import SignUpCard from "../signup_components/signupCard";
import ForgotPasswordCard from "../../components/forgotpassword_components/forgotpassCard";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { getAccessToken } from "@/lib/api";
const token = getAccessToken();
export default function TopBar() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"signin" | "signup" | "forgot">("signin");

  const bgInput =
    theme === "light" ? "bg-gray-100 text-black" : "bg-gray-800 text-white";
  const bgBtn =
    theme === "light"
      ? "bg-gray-100 hover:bg-gray-200 text-black"
      : "bg-gray-700 hover:bg-gray-600 text-white";

  return (
    <>
      <header
        className={`w-full transition-colors ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col px-2 py-1 gap-2">
          <div className="flex items-center justify-end gap-2">
            <button className={`p-1.5 sm:p-2 rounded-full ${bgBtn}`}>
              <Bell size={16} />
            </button>

            <div
              className={`flex items-center border rounded px-1.5 sm:px-2 py-0.5 sm:py-1 ${bgInput}`}
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 flex-shrink-0" />
              <select
                className={`bg-transparent outline-none text-xs sm:text-sm ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                <option value="English">English</option>
                <option value="Amharic">Amharic</option>
              </select>
            </div>
              
            <Button
              variant="primary"
              className="rounded-lg px-3 py-1 text-sm"
              onClick={() => {
                setOpen(true);
                setView("signin"); 
              }}
            >
              {token ? "Logout" : "Login"}
              
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

      {/* Modal */}
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
