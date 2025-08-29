"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import DarkMode from "../dark_mode/DarkMode";
import { ThemeContext } from "@/app/contexts/ThemeContext";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const context = useContext(ThemeContext);
  if (!context) throw new Error("Sidebar must be used inside ThemeProvider");
  const { theme } = context;

  const navItems = [
    { name: "Home", href: "/news" },
    { name: "For you", href: "/foryou" },
    { name: "Subscribed", href: "/subscribed" },
    { name: "Saved News", href: "/news/saved" },
    { name: "Setting", href: "/setting" },
    { name: "Profile", href: "/profile/account" },
  ];

  const getIcon = (item: string) => {
    switch (item) {
      case "Home":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
          </svg>
        );
      case "For you":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM9 8h2v8H9zm4 0h2v8h-2z" />
          </svg>
        );
      case "Subscribed":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case "Saved News":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        );
      case "Setting":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        );
      case "Profile":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const sidebarBg = theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white";
  const hoverBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700";
  const activeBg = theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white";

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobileMenu} className={`p-2 rounded-md shadow-md ${sidebarBg}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={closeMobileMenu} />}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-64 min-h-screen p-2 rounded-lg shadow-md transition-colors ${sidebarBg}`}>
        <div className="flex items-center space-x-4 m-4">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-md" />
          <h1 className="text-2xl md:text-3xl font-bold">News Brief</h1>
          <DarkMode />
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link href={item.href} className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeBg : hoverBg}`}>
                    <span className="mr-3 w-5 h-5 flex items-center justify-center">{getIcon(item.name)}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${sidebarBg} ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center space-x-4 m-4">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-md" />
          <h1 className="text-2xl md:text-3xl font-bold">News Brief</h1>
          <DarkMode />
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link href={item.href} onClick={closeMobileMenu} className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeBg : hoverBg}`}>
                    <span className="mr-3 w-5 h-5 flex items-center justify-center">{getIcon(item.name)}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
