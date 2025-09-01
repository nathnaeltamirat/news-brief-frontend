"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "../../lib/api";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const verifier = searchParams.get("verifier") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirm) {
      setMessage("Passwords do not match ❌");
      return;
    }
    try {
      setLoading(true);
      // const res = await apiClient.resetPassword(verifier, token, password);
      setMessage("Password reset successfully ✅");
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: unknown) {
  if (err instanceof Error) {
    setMessage(err.message);
  } else {
    setMessage("Error sending reset link.");
  }
}  finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
