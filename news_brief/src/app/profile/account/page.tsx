"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/siderbar/profile";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AccountPage() {
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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-8 flex-1">
        <h2 className="text-2xl font-bold mb-6">Account Information</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid gap-4">
            <div className="flex justify-between items-center pb-3">
              <div className="flex items-center gap-3">
                <p className="text-gray-800 font-semibold w-32">Full Name :</p>
                {editingField === "fullName" ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleChange("fullName", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm backdrop-blur-sm bg-white/70"
                  />
                ) : (
                  <span>{formData.fullName}</span>
                )}
              </div>
              <div>
                {editingField === "fullName" ? (
                  <button
                    onClick={() => handleSave("fullName")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingField("fullName")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <div className="flex items-center gap-3">
                <p className="text-gray-800 font-semibold w-32">Email :</p>
                {editingField === "email" ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="border rounded px-2 py-1 text-sm backdrop-blur-sm bg-white/70"
                  />
                ) : (
                  <span>{formData.email}</span>
                )}
              </div>
              <div>
                {editingField === "email" ? (
                  <button
                    onClick={() => handleSave("email")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingField("email")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <div className="flex items-center gap-3">
                <p className="text-gray-800 font-semibold w-32">Password :</p>
                {editingField === "password" ? (
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleChange("password", e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm backdrop-blur-sm bg-white/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1.5 text-gray-500"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                ) : (
                  <span>●●●●●●●●</span>
                )}
              </div>
              <div>
                {editingField === "password" ? (
                  <button
                    onClick={() => handleSave("password")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingField("password")}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center pt-3">
              <p className="text-gray-800 font-semibold w-32">
                Account Created:
              </p>
              <span>{formData.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-red-600 font-semibold text-md mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Do you really want to delete your
              account?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  console.log("Account Deleted");
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
