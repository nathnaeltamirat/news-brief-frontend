"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DarkMode from "../dark_mode/DarkMode";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true); // expanded by default
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const context = useContext(ThemeContext);
  if (!context) throw new Error("Sidebar must be used inside ThemeProvider");
  const { theme } = context;

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
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      children: [
        { name: "Account", href: "/profile/account" },
        { name: "Categories", href: "/profile/categories" },
        { name: "Subscription", href: "/profile/subscription" },
        { name: "Notifications", href: "/profile/notifications" },
        { name: "Saved News", href: "/profile/saved" },
      ],
    },
  ];

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  const sidebarBg =
    theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700";
  const activeBg =
    theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white";

  return (
    <div
      className={`${sidebarBg} min-h-screen shadow-md transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <Image src="/logo.png" alt="Logo" width={36} height={36} />
        {isExpanded && <h1 className="ml-2 text-2xl font-bold">News Brief</h1>}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full transition-colors ${
            theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
          }`}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"} // 👈 tooltip
        >
          {isExpanded ? (
            <ChevronLeft size={20} className="text-gray-600" />
          ) : (
            <ChevronRight size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1">
        <ul className="mt-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.children && item.children.some((c) => pathname === c.href));
            return (
              <li key={item.name}>
                <button
                  onClick={() => item.children && toggleSubMenu(item.name)}
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    isActive ? activeBg : hoverBg
                  }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {isExpanded && <span className="ml-3">{item.name}</span>}
                </button>

                {/* Submenu */}
                {item.children && isExpanded && openSubMenu === item.name && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 rounded-md transition-colors ${
                              isChildActive ? activeBg : hoverBg
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
