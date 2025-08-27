import Notification from "@/components/notification_component/notification";
import Sidebar from "@/components/siderbar/profile";
import React from "react";

const page = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 flex flex-col">
        <div className="text-2xl font-bold mb-6">Notification Settings</div>
        <Notification />
      </div>
    </div>
  );
};

export default page;
