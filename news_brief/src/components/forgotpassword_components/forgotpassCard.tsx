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
    <div className="w-full max-w-xs rounded-xl shadow-lg p-5 bg-white relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold"
        >
          ✕
        </button>
      )}

      <h1 className="text-xl font-bold text-center text-gray-900 mb-4">
        Forgot Password
      </h1>

      <p className="text-gray-600 mb-4 text-sm">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50 text-sm"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && <p className="mt-3 text-center text-xs">{message}</p>}

      <div className="mt-4 text-center">
        <button
          onClick={onBackToSignIn}
          className="text-xs font-medium text-black hover:underline"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
