"use client";
import React, { useState } from "react";
import Navbar from "../../../components/siderbar/setting";

export default function Settings() {
  const [voiceType, setVoiceType] = useState("Male");
  const [speed, setSpeed] = useState("Normal");
  const [feedType, setFeedType] = useState("Feed");
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [globalSources, setGlobalSources] = useState(false);

  return (
    <div className="flex">
      <Navbar />

      <main className="ml-65 w-full p-8 space-y-10 scroll-smooth bg-gray-50 min-h-screen">
        
        {/* Language & Translation */}
        <section id="language" className="bg-white p-6 rounded-2xl shadow max-w-3xl space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Language & Translation</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">App Language</label>
            <select className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 text-gray-900">
              <option>English</option>
              <option>Amharic</option>
             
            </select>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-800">Auto-translate summaries</p>
              <p className="text-xs text-gray-500">
                Automatically translate news summaries to your preferred language
              </p>
            </div>
            <button
              onClick={() => setAutoTranslate(!autoTranslate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                autoTranslate ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  autoTranslate ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Voice Settings */}
        <section id="voice" className="bg-white p-6 rounded-2xl shadow max-w-3xl space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Voice Settings</h2>

          {/* Voice Type */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Voice Type</p>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Neutral"].map((t) => (
                <button
                  key={t}
                  onClick={() => setVoiceType(t)}
                  className={`w-full py-3 rounded-lg border transition ${
                    voiceType === t
                      ? "bg-black text-white border-transparent"
                      : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Speaking Speed */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Speaking Speed</p>
            <div className="grid grid-cols-3 gap-3">
              {["Slow", "Normal", "Fast"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`w-full py-3 rounded-lg border transition ${
                    speed === s
                      ? "bg-black text-white border-transparent"
                      : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Volume */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Volume</p>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="75"
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </section>

        {/* Content Preferences */}
        <section id="content" className="bg-white p-6 rounded-2xl shadow max-w-3xl space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Content Preferences</h2>

          {/* Feed Type */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Default Feed Type</p>
            <div className="grid grid-cols-2 gap-3">
              {["Feed", "For You"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFeedType(f)}
                  className={`w-full py-3 rounded-lg border transition ${
                    feedType === f
                      ? "bg-black text-white border-transparent"
                      : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Global Sources Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-800">Include Global Sources</p>
              <p className="text-xs text-gray-500">
                Show international news alongside local sources
              </p>
            </div>
            <button
              onClick={() => setGlobalSources(!globalSources)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                globalSources ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  globalSources ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
