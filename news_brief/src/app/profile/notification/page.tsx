"use client";
import Notification from "@/components/notification_component/notification";
import Sidebar from "@/components/siderbar/profile";
import React, { useContext } from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import Button from "@/components/reusable_components/Button";

const NotificationPage = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("NotificationPage must be used inside ThemeProvider");
  const { theme } = context;

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        theme === "light" ? "bg-gray-50 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Sidebar />

      <div className="flex-1 p-4 lg:p-8 flex flex-col lg:ml-0 mt-20 lg:mt-0">
        <div className="text-xl lg:text-2xl font-bold mb-6">
          Notification Settings
        </div>

        <div
          className={`p-6 rounded-2xl shadow-md transition-colors ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          {/* Notification content */}
          <Notification />

          {/* Action buttons */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <Button
              variant="primary"
              className="rounded-full px-6 py-2"
            >
              Save Changes
            </Button>
            <Button
              variant="secondary"
              className="rounded-full px-6 py-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
