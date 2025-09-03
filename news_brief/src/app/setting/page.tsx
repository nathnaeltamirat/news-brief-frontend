"use client";
import Sidebar from "@/components/siderbar/main";
import React, { useState } from "react";
import { Newspaper, Podcast, Rss } from "lucide-react";

type TabId = "customization" | "account" | "categories" | "subscriptions";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("account");

  const [tags, setTags] = useState(["Technology", "Climate", "AI"]);
  const [newTag, setNewTag] = useState("");

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "The Daily Journal",
      icon: <Newspaper className="w-5 h-5" />,
    },
    { id: 2, name: "Tech Brief Weekly", icon: <Podcast className="w-5 h-5" /> },
    { id: 3, name: "Global News RSS", icon: <Rss className="w-5 h-5" /> },
  ]);
  const [newSubscription, setNewSubscription] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tabs: { id: TabId; label: string }[] = [
    { id: "customization", label: "Customization" },
    { id: "account", label: "Account" },
    { id: "categories", label: "Categories" },
    { id: "subscriptions", label: "Subscriptions" },
  ];

  const addTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const addSubscription = () => {
    if (newSubscription.trim() !== "") {
      setSubscriptions([
        ...subscriptions,
        {
          id: Date.now(),
          name: newSubscription,
          icon: <Newspaper className="w-5 h-5" />,
        },
      ]);
      setNewSubscription("");
    }
  };

  const removeSubscription = (id: number) =>
    setSubscriptions(subscriptions.filter((s) => s.id !== id));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 pt-6 md:pt-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Settings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your preferences, account details, categories, and
              subscriptions.
            </p>
          </div>
          <button className="bg-[#0B66FF] text-white px-5 py-2 rounded-lg hover:bg-[#EAF2FF] hover:text-black transition w-full md:w-auto">
            Save changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-3 mb-6 bg-gray-100 p-2 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#EAF2FF] text-black shadow-sm hover:bg-[#EAF2FF] hover:text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Customization Tab */}
        {activeTab === "customization" && (
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
              <h2 className="text-lg font-medium text-gray-900">
                Customization
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]">
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Avatars</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-black rounded"
                />
              </div>
            </section>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Account Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                    <span className="ml-2 text-gray-500 cursor-pointer">✎</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                    <span className="ml-2 text-gray-500 cursor-pointer">✎</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                    <span className="ml-2 text-gray-500 cursor-pointer">✎</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                    <span className="ml-2 text-gray-500 cursor-pointer">✎</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">
                  Account Created:
                </span>{" "}
                Jan 12, 2023
              </div>

              <div className="border border-gray-200 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-red-600">
                    Danger Zone
                  </h3>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">
                    Delete Account
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  This action is irreversible
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Favorited Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </section>

            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Add New Tags
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Search tags"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                />
                <button
                  onClick={addTag}
                  className="bg-[#0B66FF] text-white px-4 py-2 rounded-lg hover:bg-[#EAF2FF] hover:text-black transition w-full sm:w-auto"
                >
                  + Add
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Your Subscriptions
              </h2>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border border-gray-200 rounded-xl px-4 py-3 gap-2 sm:gap-0"
                  >
                    <div className="flex items-center gap-3">
                      {sub.icon}
                      <span className="text-gray-800 font-medium">
                        {sub.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeSubscription(sub.id)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-[#EAF2FF] w-full sm:w-auto"
                    >
                      – Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Search New News Media
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="text"
                  value={newSubscription}
                  onChange={(e) => setNewSubscription(e.target.value)}
                  placeholder="Search publications, podcasts, RSS"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#EAF2FF]"
                />
                <button
                  onClick={addSubscription}
                  className="bg-[#0B66FF] text-white px-4 py-2 rounded-lg hover:bg-[#EAF2FF] hover:text-black transition w-full sm:w-auto"
                >
                  + Add
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
