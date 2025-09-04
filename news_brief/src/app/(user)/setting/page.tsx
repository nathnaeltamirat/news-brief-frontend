"use client";
import React, { useContext, useState } from "react";
import { Newspaper, Podcast, Rss } from "lucide-react";
import TopBar from "@/components/reusable_components/topBar";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@/app/contexts/ThemeContext";

type TabId = "customization" | "account" | "categories" | "subscriptions";

const SettingsPage = () => {
  const { t } = useTranslation();
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme, setTheme } = context;
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
    { id: "customization", label: t("settings.tabs.customization") },
    { id: "account", label: t("settings.tabs.account") },
    { id: "categories", label: t("settings.tabs.categories") },
    { id: "subscriptions", label: t("settings.tabs.subscriptions") },
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

  // Shared classes for consistent dark/light mode
  const inputClass = `w-full border rounded-lg px-3 py-2 ${
    theme === "dark"
      ? "bg-gray-800 border-gray-600 text-gray-100 focus:ring-gray-500"
      : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-gray-300"
  } focus:outline-none focus:ring-2`;
  const sectionClass = `border rounded-2xl p-5 sm:p-6 shadow-sm transition-colors duration-300 ${
    theme === "dark"
      ? "border-gray-700 bg-gray-900"
      : "border-gray-200 bg-gray-50"
  }`;
  const btnClass = `px-4 py-2 rounded-lg transition-colors ${
    theme === "dark"
      ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
      : "bg-gray-300 text-gray-900 hover:bg-gray-400"
  }`;

  return (
    <>
      <TopBar />
      <div
        className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#1A1A1A] text-gray-100"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="flex-1 pt-6 md:pt-10 px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {t("settings.title")}
              </h1>
              <button className={`${btnClass} w-full md:w-auto`}>
                {t("settings.saveChanges")}
              </button>
            </div>

            {/* Tabs */}
            <div
              className={`flex overflow-x-auto space-x-3 mb-6 p-2 rounded-xl transition-colors ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition flex-shrink-0 ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "bg-gray-700 text-gray-100 shadow-sm"
                        : "bg-gray-300 text-gray-900 shadow-sm"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-gray-100"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Customization Tab */}
            {activeTab === "customization" && (
              <section className={sectionClass}>
                <h2 className="text-lg font-medium">
                  {t("settings.customization.title")}
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {t("settings.customization.theme")}
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className={inputClass}
                  >
                    <option value="system">
                      {t("settings.themes.system")}
                    </option>
                    <option value="light">{t("settings.themes.light")}</option>
                    <option value="dark">{t("settings.themes.dark")}</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {t("settings.customization.showAvatars")}
                  </span>
                  <input type="checkbox" className="form-checkbox h-5 w-5" />
                </div>
              </section>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <section className={sectionClass}>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  {t("settings.account.title")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("auth.fullName")}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("settings.account.placeholders.fullName")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("auth.email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("settings.account.placeholders.email")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("settings.account.username")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("settings.account.placeholders.username")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("auth.password")}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("settings.account.placeholders.password")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="text-sm opacity-80 mt-2">
                  {t("settings.account.created")}: Jan 12, 2023
                </div>

                {/* Danger Zone */}
                <div
                  className={`${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  } border rounded-xl p-4 mt-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-red-700">
                      {t("settings.account.dangerZone.title")}
                    </h3>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">
                      {t("settings.account.dangerZone.delete")}
                    </button>
                  </div>
                  <p className="text-sm opacity-80">
                    {t("settings.account.dangerZone.warning")}
                  </p>
                </div>
              </section>
            )}

            {/* Categories Tab */}
            {activeTab === "categories" && (
              <section className={sectionClass}>
                <h2 className="text-lg font-medium mb-4">
                  {t("settings.categories.title")}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-100"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>✕</button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder={t("settings.categories.placeholder")}
                    className={inputClass}
                  />
                  <button onClick={addTag} className={btnClass}>
                    + {t("settings.categories.addButton")}
                  </button>
                </div>
              </section>
            )}

            {/* Subscriptions Tab */}
            {activeTab === "subscriptions" && (
              <section className={sectionClass}>
                <h2 className="text-lg font-medium mb-4">
                  {t("settings.subscriptions.title")}
                </h2>
                <div className="space-y-3 mb-4">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl px-4 py-3 gap-2 ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {sub.icon}
                        <span>{sub.name}</span>
                      </div>
                      <button
                        className={`text-sm rounded-lg px-3 py-1.5 border transition ${
                          theme === "dark"
                            ? "border-gray-600 hover:bg-gray-700 text-gray-100"
                            : "border-gray-300 hover:bg-gray-100 text-gray-900"
                        }`}
                        onClick={() => removeSubscription(sub.id)}
                      >
                        – {t("settings.subscriptions.remove")}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newSubscription}
                    onChange={(e) => setNewSubscription(e.target.value)}
                    placeholder={t("settings.subscriptions.placeholder")}
                    className={inputClass}
                  />
                  <button onClick={addSubscription} className={btnClass}>
                    + {t("settings.subscriptions.addButton")}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
