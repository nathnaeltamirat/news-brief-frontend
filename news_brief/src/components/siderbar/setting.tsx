"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import DarkMode from "../dark_mode/DarkMode";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Language & Translation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;

  const items = [
    { id: "home", label: "Home" },
    { id: "language", label: "Language" },
    { id: "voice", label: "Voice Settings" },
    { id: "content", label: "Content Preferences" },
    { id: "accessibility", label: "Accessibility" },
    { id: "general", label: "General" },
    { id: "account", label: "Account" },
  ];

  const handleClick = (id: string, itemName: string) => {
    if (id === "home") {
      router.push("/");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(itemName);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderMenuItem = (item: typeof items[0]) => (
    <li key={item.id}>
      <button
        onClick={() => handleClick(item.id, item.label)}
        className={`flex items-center px-4 py-3 rounded-md transition-colors ${
          activeItem === item.label
            ? theme === "light"
              ? "bg-[#F3F4F6] text-black"
              : "bg-[#1F2937] text-white"
            : theme === "light"
            ? "text-black hover:bg-[#dddfe2]"
            : "text-white hover:bg-[#374151]"
        }`}
      >
        <span className="mr-3 w-5 h-5 flex items-center justify-center">
          {/* Replace with your icons */}
          {item.label === "Home" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
            </svg>
          )}
          {/* Add other icons for each label as needed */}
        </span>
        {item.label}
      </button>
    </li>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop */}
      <div
        className={`hidden lg:flex fixed w-64 min-h-screen flex-col p-2 rounded-lg shadow-md ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="m-4">
          <div className="flex justify-between">
            <h1 className="text-2xl md:text-3xl font-bold m-2">Settings</h1>
            <DarkMode />
          </div>
          <div className="px-4 pb-3 text-xs text-gray-400">
            Customize your app experience
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">{items.map(renderMenuItem)}</ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out rounded-r-lg ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "light"
            ? "bg-white text-black shadow-lg"
            : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="m-4">
          <div className="flex justify-between">
            <h1 className="text-2xl md:text-3xl font-bold m-2">Settings</h1>
            <DarkMode />
          </div>
          <div className="px-4 pb-3 text-xs text-gray-400">
            Customize your app experience
          </div>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">{items.map(renderMenuItem)}</ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
