"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Language & Translation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const handleClick = (id: string, itemName: string) => {
    if (id === "home") {
      // Route to homepage instead of scrolling
      router.push("/");
    } else {
      // Scroll to section
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(itemName);
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };
  
  const items = [
    { id: "home", label: "Home" },
    { id: "language", label: "Language" },
    { id: "voice", label: "Voice Settings" },
    { id: "content", label: "Content Preferences" },
    { id: "accessibility", label: "Accessibility" },
    { id: "general", label: "General" },
    { id: "account", label: "Account" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop (unchanged) */}
      <div className="hidden lg:block fixed w-64 bg-white text-black min-h-screen flex flex-col p-2 rounded-lg shadow-md">
        {/* Header with News Brief */}
        <div className=" m-4">
          <h1 className="text-2xl md:text-3xl font-bold m-2">Setting</h1>
          <div className="px-4 pb-3 text-xs text-gray-400">
            Customize your app experience
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id, item.label)}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                activeItem === item.label
                  ? "bg-[#F3F4F6] text-black"
                  : "text-black hover:bg-[#dddfe2]"
              }`}
                >
                  <span className="mr-3 w-5 h-5 flex items-center justify-center">
                    {/* icons based on label */}
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
                    {item.label === "Language" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="m12.87 15.07-2.54-2.51.03-.03A17.5 17.5 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35A17 17 0 016.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56L2.58 17.58 4 19l5-5 3.11 3.11z" />
                      </svg>
                    )}
                    {item.label === "Voice Settings" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.26 3.3a1.1 1.1 0 011.74.89v15.61a1.1 1.1 0 01-1.74.89L6.68 16H4a2 2 0 01-2-2v-4a2 2 0 012-2h2.68l6.58-4.7z" />
                      </svg>
                    )}
                    {item.label === "Content Preferences" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.08A5.5 5.5 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                      </svg>
                    )}
                    {item.label === "Accessibility" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                      </svg>
                    )}
                    {item.label === "General" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                      </svg>
                    )}
                    {item.label === "Account" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                    {/* you can add icons for Accessibility, General, Account too */}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with News Brief */}
        <div className=" m-4">
          <h1 className="text-2xl md:text-3xl font-bold m-2">Setting</h1>
          <div className="px-4 pb-3 text-xs text-gray-400">
            Customize your app experience
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id, item.label)}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                activeItem === item.label
                  ? "bg-[#F3F4F6] text-black"
                  : "text-black hover:bg-[#dddfe2]"
              }`}
                >
                  <span className="mr-3 w-5 h-5 flex items-center justify-center">
                    {/* icons based on label */}
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
                    {item.label === "Language" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="m12.87 15.07-2.54-2.51.03-.03A17.5 17.5 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35A17 17 0 016.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56L2.58 17.58 4 19l5-5 3.11 3.11z" />
                      </svg>
                    )}
                    {item.label === "Voice Settings" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.26 3.3a1.1 1.1 0 011.74.89v15.61a1.1 1.1 0 01-1.74.89L6.68 16H4a2 2 0 01-2-2v-4a2 2 0 012-2h2.68l6.58-4.7z" />
                      </svg>
                    )}
                    {item.label === "Content Preferences" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.08A5.5 5.5 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                      </svg>
                    )}
                    {item.label === "Accessibility" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                      </svg>
                    )}
                    {item.label === "General" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                      </svg>
                    )}
                    {item.label === "Account" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                    {/* you can add icons for Accessibility, General, Account too */}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
