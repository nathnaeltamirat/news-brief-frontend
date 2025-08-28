"use client";
import React, { JSX, useState } from "react";
import { PiHouseLineLight } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import Sidebar from "../../../components/siderbar/profile";

interface Subscription {
  id: number;
  name: string;
  type: "Global" | "Local";
  icon: JSX.Element;
}

const App = () => {
  const dummySubscriptions: Subscription[] = [
    { id: 1, name: "ENA", type: "Local", icon: <PiHouseLineLight className="text-gray-600 text-xl" /> },
    { id: 2, name: "Fana Broadcasting", type: "Local", icon: <PiHouseLineLight className="text-gray-600 text-xl" /> },
    { id: 3, name: "CNN", type: "Global", icon: <IoEarthSharp className="text-gray-600 text-xl" /> },
    { id: 4, name: "BBC", type: "Global", icon: <IoEarthSharp className="text-gray-600 text-xl" /> },
    { id: 5, name: "Al Jazeera", type: "Global", icon: <IoEarthSharp className="text-gray-600 text-xl" /> },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = dummySubscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex md:flex-row">
      
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-0 mt-20 lg:mt-0">
        {/* Header (outside card) */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Subscriptions</h1>
          <p className="text-gray-500">Follow or unfollow news sources.</p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-md p-4 lg:p-6 max-w-4xl">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-800"
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
              <p className="text-gray-500 text-center py-4">No subscriptions found.</p>
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
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-700 gap-3 sm:gap-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600">
          {subscription.icon}
        </div>
        <div>
          <h3 className="font-semibold text-black">{subscription.name}</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {subscription.type}
          </span>
        </div>
      </div>
      <button className="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl shadow-md hover:bg-red-600 transition-colors w-full sm:w-auto">
        Unsubscribe
      </button>
    </div>
  );
};

export default App;
