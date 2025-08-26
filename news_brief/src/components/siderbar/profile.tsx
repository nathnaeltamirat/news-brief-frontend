// components/Sidebar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <div className="w-64 bg-white text-black min-h-screen flex flex-col p-2 rounded-lg shadow-md">
      {/* Header with News Brief */}
      <div className=" m-4">
        <h1 className="text-2xl md:text-3xl font-bold m-2">Profile</h1>
        <div className="px-4 pb-3 text-xs text-gray-400">
          Customize your app experience
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            "Home",
            "Account",
            "Categories",
            "Subscription",
            "Notifications",
            "Saved News",
          ].map((item) => (
            <li key={item}>
              <Link
                // href={`/${item.toLowerCase().replace(" ", "-")}`}
                href={`/`}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  activeItem === item
                    ? "bg-[#F3F4F6] text-black"
                    : "text-black hover:[#dddfe2]"
                }`}
                onClick={() => handleItemClick(item)}
              >
                <span className="mr-3 w-5 h-5 flex items-center justify-center">
                  {item === "Home" && (
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
                  {item === "Account" && (
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
                  {item === "Categories" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="#000"
                          d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49"
                        />
                      </g>
                    </svg>
                  )}
                  {item === "Subscription" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                  {item === "Notifications" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="#000"
                          d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
                        />
                      </g>
                    </svg>
                  )}
                  {item === "Saved News" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  )}
                </span>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/`}
          className={`flex items-center px-4 py-3 rounded-md transition-colors text-red-600 hover:bg-red-50 border-t border-gray-200 mt-2 pt-2`}
          onClick={() => handleItemClick("Logout")}
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
