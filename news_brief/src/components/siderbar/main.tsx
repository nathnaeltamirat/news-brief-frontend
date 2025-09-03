"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Menu, Bell, LogIn } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const context = useContext(ThemeContext);
  if (!context) throw new Error("Sidebar must be used inside ThemeProvider");
  const { theme } = context;

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsExpanded(window.innerWidth >= 768); // Collapse sidebar on mobile
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "/news",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
        </svg>
      ),
    },
    {
      name: "For you",
      href: "/foryou",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM9 8h2v8H9zm4 0h2v8h-2z" />
        </svg>
      ),
    },
    {
      name: "Subscribed",
      href: "/subscribed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ),
    },
    {
      name: "Saved News",
      href: "/news/saved",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
    {
      name: "Setting",
      href: "/setting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.007 7.007 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.14.55-1.63.94l-2.39-.96a.5.5 0 0 0-.61.22L2.7 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.3-.06.62-.06.94s.02.64.06.94L2.82 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.68.22l2.39-.96c.49.39 1.04.7 1.63.94l.36 2.54c.05.25.25.42.5.42h3.84c.25 0 .45-.17.5-.42l.36-2.54c.59-.24 1.14-.55 1.63-.94l2.39.96c.25.12.54.02.68-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" />
        </svg>
      ),
    },
  ];

  const sidebarBg =
    theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700";
  const activeBg =
    theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white";

  return (
    <>
      {/* Top Navbar on mobile */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 border-b shadow-sm md:hidden">
          {/* Left: Menu + NB Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu size={22} />
            </button>
            <div className="rounded bg-black text-white font-bold px-2 py-1 text-sm">
              NB
            </div>
          </div>

          {/* Right: Icons + Login */}
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell size={18} />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="text-sm font-medium">文A</span>
            </button>
            <Link href="/login">
              <button className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-medium shadow-sm">
                <LogIn size={16} />
                <span>Login</span>
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: isMobile ? -260 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className={`${sidebarBg} fixed md:relative z-50 top-0 left-0 h-screen w-[260px] shadow-lg flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black text-white text-xs font-bold flex items-center justify-center rounded">
                  NB
                </div>
                {!isMobile && <h1 className="text-xl font-bold">News Brief</h1>}
              </div>
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                          isActive ? activeBg : hoverBg
                        }`}
                      >
                        <span className="w-5 h-5 flex items-center justify-center">
                          {item.icon}
                        </span>
                        <span className="ml-3 text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
