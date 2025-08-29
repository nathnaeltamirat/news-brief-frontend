"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useContext } from "react";
import DarkMode from "../dark_mode/DarkMode";
import { ThemeContext } from "@/app/contexts/ThemeContext";

const Sidebar = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Sidebar must be used inside ThemeProvider");
  const { theme } = context;

  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/news" },
    { name: "Account", href: "/profile/account" },
    { name: "Categories", href: "/profile/categories" },
    { name: "Subscription", href: "/profile/subscription" },
    { name: "Notifications", href: "/profile/notification" },
    { name: "Saved News", href: "/profile/savedNews" },
  ];

  const getIcon = (item: string) => {
    switch (item) {
      case "Home":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" /></svg>;
      case "Account":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>;
      case "Categories":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" /></svg>;
      case "Subscription":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>;
      case "Notifications":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21" /></svg>;
      case "Saved News":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>;
      default:
        return null;
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const sidebarBg = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700";
  const activeBg = theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white";
  const textGray = theme === "light" ? "text-gray-400" : "text-gray-400";

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobileMenu} className={`p-2 rounded-md shadow-md transition-colors ${sidebarBg}`} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 z-40" onClick={closeMobileMenu} />}

      {/* Sidebar - Desktop */}
      <div className={`hidden lg:block w-64 min-h-screen flex flex-col p-2 rounded-lg shadow-md transition-colors ${sidebarBg}`}>
        <div className="m-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
            <DarkMode />
          </div>
          <div className={`px-4 pb-3 text-xs ${textGray}`}>Customize your app experience</div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeBg : hoverBg}`}
                  >
                    <span className="mr-3 w-5 h-5 flex items-center justify-center">{getIcon(item.name)}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/"
            className={`flex items-center px-4 py-3 rounded-md transition-colors text-red-600 border-t border-gray-400 mt-2 pt-2 ${hoverBg}`}
          >
            <span className="mr-3 w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
            </span>
            Logout
          </Link>
        </nav>
      </div>

      {/* Sidebar - Mobile */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${sidebarBg}`}>
        <div className="m-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
            <DarkMode />
          </div>
          <div className={`px-4 pb-3 text-xs ${textGray}`}>Customize your app experience</div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeBg : hoverBg}`}
                  >
                    <span className="mr-3 w-5 h-5 flex items-center justify-center">{getIcon(item.name)}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/"
            onClick={closeMobileMenu}
            className={`flex items-center px-4 py-3 rounded-md transition-colors text-red-600 border-t border-gray-400 mt-2 pt-2 ${hoverBg}`}
          >
            <span className="mr-3 w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
            </span>
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
