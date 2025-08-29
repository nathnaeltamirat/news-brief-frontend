"use client";
import React, { useContext, useState } from "react";
import Navbar from "../../components/siderbar/setting";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const [voiceType, setVoiceType] = useState("Male");
  const [speed, setSpeed] = useState("Normal");
  const [feedType, setFeedType] = useState("Feed");
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [globalSources, setGlobalSources] = useState(false);
  const [textSize, setTextSize] = useState("Medium");
  const [highContrast, setHighContrast] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const [user, setUser] = useState<{ name: string } | null>({ name: "Meki" });
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ToggleButton must be used inside ThemeProvider");
  const { theme } = context;
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  // Toggle button helpers
  const toggleButtonClasses = (isOn: boolean) =>
    `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
      isOn
        ? theme === "light"
          ? "bg-teal-500"
          : "bg-sky-400"
        : theme === "light"
        ? "bg-gray-300"
        : "bg-gray-700"
    }`;

  const toggleKnobClasses = (isOn: boolean) =>
    `inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
      isOn ? "translate-x-6" : "translate-x-1"
    }`;

  // Selection buttons
  const selectionButtonClasses = (selected: boolean) =>
    selected
      ? theme === "light"
        ? "bg-teal-500 text-white shadow hover:shadow-md border-transparent"
        : "bg-sky-400 text-white shadow hover:shadow-md border-transparent"
      : theme === "light"
      ? "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200 hover:shadow-sm"
      : "bg-gray-700 text-white border-transparent hover:bg-gray-600 hover:shadow-sm";

  return (
    <div
      className={`flex transition-colors ${
        theme === "light" ? "bg-gray-50 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Navbar />

      <main
        className={`lg:ml-65 w-full p-4 lg:p-8 space-y-10 scroll-smooth min-h-screen lg:mt-0 mt-20 transition-colors ${
          theme === "light" ? "bg-gray-50 text-black" : "bg-gray-800 text-white"
        }`}
      >
        {/* Language & Translation */}
        <section
          id="language"
          className={`p-6 rounded-2xl max-w-3xl space-y-4 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          <h2 className="text-lg font-semibold">Language & Translation</h2>
          <div>
            <label className="block text-sm font-medium">App Language</label>
            <select className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
              <option>English</option>
              <option>Amharic</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium">Auto-translate summaries</p>
              <p className="text-xs text-gray-500">
                Automatically translate news summaries to your preferred language
              </p>
            </div>
            <button
              onClick={() => setAutoTranslate(!autoTranslate)}
              className={toggleButtonClasses(autoTranslate)}
            >
              <span className={toggleKnobClasses(autoTranslate)} />
            </button>
          </div>
        </section>

        {/* Voice Settings */}
        <section
          id="voice"
          className={`p-6 rounded-2xl max-w-3xl space-y-6 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          <h2 className="text-lg font-semibold">Voice Settings</h2>
          <div>
            <p className="text-sm font-medium mb-2">Voice Type</p>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Neutral"].map((t) => (
                <button
                  key={t}
                  onClick={() => setVoiceType(t)}
                  className={`w-full py-3 rounded-lg border transition ${selectionButtonClasses(
                    voiceType === t
                  )}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Speaking Speed</p>
            <div className="grid grid-cols-3 gap-3">
              {["Slow", "Normal", "Fast"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`w-full py-3 rounded-lg border transition ${selectionButtonClasses(
                    speed === s
                  )}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Preferences */}
        <section
          id="content"
          className={`p-6 rounded-2xl max-w-3xl space-y-6 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          <h2 className="text-lg font-semibold">Content Preferences</h2>
          <div>
            <p className="text-sm font-medium mb-2">Default Feed Type</p>
            <div className="grid grid-cols-2 gap-3">
              {["Feed", "For You"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFeedType(f)}
                  className={`w-full py-3 rounded-lg border transition ${selectionButtonClasses(
                    feedType === f
                  )}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium">Include Global Sources</p>
              <p className="text-xs text-gray-500">
                Show international news alongside local sources
              </p>
            </div>
            <button
              onClick={() => setGlobalSources(!globalSources)}
              className={toggleButtonClasses(globalSources)}
            >
              <span className={toggleKnobClasses(globalSources)} />
            </button>
          </div>
        </section>

        {/* Accessibility */}
        <section
          id="accessibility"
          className={`p-6 rounded-2xl max-w-3xl space-y-6 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          <h2 className="text-lg font-semibold">Accessibility</h2>
          <div>
            <p className="text-sm font-medium mb-2">Text Size</p>
            <div className="grid grid-cols-3 gap-3">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`w-full py-3 rounded-lg border transition ${selectionButtonClasses(
                    textSize === size
                  )}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium">High contrast mode</p>
              <p className="text-xs text-gray-500">
                Improve text readability with higher contrast
              </p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={toggleButtonClasses(highContrast)}
            >
              <span className={toggleKnobClasses(highContrast)} />
            </button>
          </div>
        </section>

        {/* General */}
        <section
          id="general"
          className={`p-6 rounded-2xl max-w-3xl space-y-4 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          <h2 className="text-lg font-semibold">General</h2>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium">Offline mode</p>
              <p className="text-xs text-gray-500">
                Download articles for offline reading
              </p>
            </div>
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={toggleButtonClasses(offlineMode)}
            >
              <span className={toggleKnobClasses(offlineMode)} />
            </button>
          </div>
        </section>

        {/* Account / User */}
        <section
          id="account"
          className={`p-6 rounded-2xl max-w-3xl space-y-4 transition-colors ${
            theme === "light"
              ? "bg-white text-black shadow-lg"
              : "bg-gray-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          }`}
        >
          {user ? (
            <>
              <h2 className="text-lg font-semibold">User Full Name</h2>
              <div className="flex justify-between items-center p-4 border rounded-lg bg-red-100">
                <span className="text-gray-800 font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No user logged in.</p>
          )}
        </section>
      </main>
    </div>
  );
}
