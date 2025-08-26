import React, { useState } from "react";

export default function Notification() {
  const [dailyDigest, setDailyDigest] = useState(false);
  const [breakingNews, setBreakingNews] = useState(false);
  const [digestTime, setDigestTime] = useState("8:00 AM");

  const times = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "12:00 PM",
    "6:00 PM",
    "9:00 PM",
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
    
      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <div>
          <h2 className="font-semibold text-gray-800">Daily Digest</h2>
          <p className="text-sm text-gray-500">
            Receive a summary of top news daily
          </p>
        </div>
        <button
          onClick={() => setDailyDigest(!dailyDigest)}
          className={`relative w-12 h-6 flex items-center rounded-full transition ${
            dailyDigest ? "bg-black" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
              dailyDigest ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <div>
          <h2 className="font-semibold text-gray-800">Breaking News Alerts</h2>
          <p className="text-sm text-gray-500">
            Get notified about urgent news updates
          </p>
        </div>
        <button
          onClick={() => setBreakingNews(!breakingNews)}
          className={`relative w-12 h-6 flex items-center rounded-full transition ${
            breakingNews ? "bg-black" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
              breakingNews ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="py-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Daily Digest Time
        </label>
        <select
          value={digestTime}
          onChange={(e) => setDigestTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-black focus:outline-none"
        >
          {times.map((time, idx) => (
            <option key={idx} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
