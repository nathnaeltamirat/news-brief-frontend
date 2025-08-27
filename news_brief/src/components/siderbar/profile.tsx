"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

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
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
          </svg>
        );
      case "Account":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case "Categories":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" />
          </svg>
        );
      case "Subscription":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case "Notifications":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21" />
          </svg>
        );
      case "Saved News":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="  w-64 bg-white text-black min-h-screen flex flex-col p-2 rounded-lg shadow-md">
      {/* Header */}
      <div className="m-4">
        <h1 className="text-2xl md:text-3xl font-bold m-2">Profile</h1>
        <div className="px-4 pb-3 text-xs text-gray-400">
          Customize your app experience
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#F3F4F6] text-black"
                      : "text-black hover:bg-[#dddfe2]"
                  }`}
                >
                  <span className="mr-3 w-5 h-5 flex items-center justify-center">
                    {getIcon(item.name)}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <Link
          href="/"
          className="flex items-center px-4 py-3 rounded-md transition-colors text-red-600 hover:bg-red-50 border-t border-gray-200 mt-2 pt-2"
        >
          <span className="mr-3 w-5 h-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </span>
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
