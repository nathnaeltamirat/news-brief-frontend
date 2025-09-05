"use client";
import React, { useState } from "react";
import { apiClient } from "../../lib/api";

interface ForgotPasswordCardProps {
  onClose?: () => void;
  onBackToSignIn?: () => void;  // 👈 new
}

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({ onClose, onBackToSignIn }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await apiClient.forgotPassword(email);
      setMessage(res.message || "Password reset link sent to your email.");
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage("Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl shadow-xl p-8 bg-white relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>
      )}

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Forgot Password
      </h1>

      <p className="text-gray-600 mb-6">
        Enter your email address and we’ll send you a link to reset your password.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}

      <div className="mt-6 text-center">
        <button
          onClick={onBackToSignIn}
          className="text-sm font-medium text-black hover:underline"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
