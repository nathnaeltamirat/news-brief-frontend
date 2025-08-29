"use client";
import React, { useContext, useState } from "react";
import Sidebar from "@/components/siderbar/profile";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import Button from "@/components/reusable_components/Button";

export default function AccountPage() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("context not defined");
  const { theme } = context;

  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "Bien Moges",
    email: "bienmoges@gmail.com",
    password: "password123",
    createdAt: "20.08.2025",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (field: string) => {
    setEditingField(null);
    console.log(`Updated ${field}:`, formData[field as keyof typeof formData]);
  };

  const inputClasses = `border rounded-lg px-3 py-2 text-sm transition-colors w-full ${
    theme === "light"
      ? "bg-white text-black border-gray-300 focus:ring-black"
      : "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
  }`;

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen transition-colors overflow-x-hidden ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-4 lg:p-8 flex-1 w-full max-w-full lg:ml-0 mt-20 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6">Account Information</h2>

        {/* Account Details */}
        <div
          className={`shadow-md rounded-lg p-6 mb-8 transition-colors w-full max-w-full overflow-hidden ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          <div className="grid gap-4">
            {["fullName", "email", "password"].map((field) => (
              <div key={field} className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 gap-3 w-full">
                <p className="font-semibold w-full md:w-32 capitalize">{field === "fullName" ? "Full Name" : field}</p>

                <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-3">
                  {editingField === field ? (
                    field === "password" ? (
                      <div className="relative w-full md:w-auto flex-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData[field as keyof typeof formData]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          className={inputClasses}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-2 top-2 text-gray-500"
                        >
                          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                      </div>
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className={inputClasses}
                      />
                    )
                  ) : field === "password" ? (
                    <span>●●●●●●●●</span>
                  ) : (
                    <span>{formData[field as keyof typeof formData]}</span>
                  )}

                  {editingField === field ? (
                    <Button
                      variant="secondary"
                      className="rounded-lg px-4 py-2 text-sm mt-2 md:mt-0"
                      onClick={() => handleSave(field)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="rounded-lg px-4 py-2 text-sm mt-2 md:mt-0"
                      onClick={() => setEditingField(field)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Created At */}
            <div className="flex flex-col md:flex-row items-start md:items-center pt-3 gap-2">
              <p className="font-semibold w-full md:w-32">Account Created:</p>
              <span>{formData.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className={`shadow-md rounded-lg p-6 transition-colors w-full max-w-full overflow-hidden ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          <h3 className="font-semibold text-md mb-2">Danger Zone</h3>
          <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-500" : "text-gray-300"}`}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="primary"
            className="rounded-lg px-4 py-2 text-sm"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            className={`rounded-lg shadow-lg p-6 w-full max-w-md transition-colors`}
          >
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className={`text-gray-500 mb-6 ${theme === "dark" ? "text-gray-300" : ""}`}>
              This action cannot be undone. Do you really want to delete your account?
            </p>
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <Button
                variant="secondary"
                className="rounded-lg px-4 py-2 text-sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="rounded-lg px-4 py-2 text-sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
