"use client";
import React, { JSX, useState, useContext } from "react";
import { PiHouseLineLight } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import Sidebar from "../../../components/siderbar/profile";
import Button from "@/components/reusable_components/Button";
import { ThemeContext } from "@/app/contexts/ThemeContext";

interface Subscription {
  id: number;
  name: string;
  type: "Global" | "Local";
  icon: JSX.Element;
}

const SubscriptionsPage = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("SubscriptionsPage must be used inside ThemeProvider");
  const { theme } = context;

  const dummySubscriptions: Subscription[] = [
    { id: 1, name: "ENA", type: "Local", icon: <PiHouseLineLight className="text-xl" /> },
    { id: 2, name: "Fana Broadcasting", type: "Local", icon: <PiHouseLineLight className="text-xl" /> },
    { id: 3, name: "CNN", type: "Global", icon: <IoEarthSharp className="text-xl" /> },
    { id: 4, name: "BBC", type: "Global", icon: <IoEarthSharp className="text-xl" /> },
    { id: 5, name: "Al Jazeera", type: "Global", icon: <IoEarthSharp className="text-xl" /> },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = dummySubscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`flex min-h-screen font-sans transition-colors ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-0 mt-20 lg:mt-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Subscriptions
          </h1>
          <p className={`text-gray-500 ${theme === "dark" ? "text-gray-400" : ""}`}>
            Follow or unfollow news sources.
          </p>
        </div>

        <div
          className={`rounded-2xl shadow-md p-4 lg:p-6 max-w-4xl transition-colors ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
                theme === "light"
                  ? "bg-white border-gray-700 text-black focus:ring-gray-300"
                  : "bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
              }`}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Subscription List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No subscriptions found.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("SubscriptionCard must be used inside ThemeProvider");
  const { theme } = context;

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border gap-3 sm:gap-0 transition-colors ${
        theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            theme === "light" ? "bg-gray-200 text-gray-600" : "bg-gray-700 text-gray-300"
          }`}
        >
          {subscription.icon}
        </div>
        <div>
          <h3 className={`font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
            {subscription.name}
          </h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
              theme === "light"
                ? "text-gray-500 bg-gray-200"
                : "text-gray-300 bg-gray-700"
            }`}
          >
            {subscription.type}
          </span>
        </div>
      </div>

      {/* Fully Rounded Unsubscribe Button */}
      <Button
        variant="primary"
        className="rounded-full px-6 py-2 w-full sm:w-auto"
      >
        Unsubscribe
      </Button>
    </div>
  );
};

export default SubscriptionsPage;
