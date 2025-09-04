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
  <div className="relative w-full max-w-xs mx-auto rounded-lg shadow-md p-4 bg-white">
    {onClose && (
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-sm font-bold"
      >
        ✕
      </button>
    )}

    <h1 className="text-lg font-bold text-center text-gray-900 mb-3">
      Forgot Password
    </h1>

    <p className="text-gray-600 mb-3 text-center text-xs">
      Enter your email address and we'll send you a link to reset your password.
    </p>

    {/* Email input */}
    <label htmlFor="reset-email" className="sr-only">
      Email Address
    </label>
    <input
      id="reset-email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="w-full px-3 py-2 mb-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
    />

    {/* Submit */}
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 text-xs"
    >
      {loading ? "Sending..." : "Send Reset Link"}
    </button>

    {/* Feedback message */}
    {message && (
      <p
        className={`mt-2 text-center text-xs ${
          message.toLowerCase().includes("error")
            ? "text-red-500"
            : "text-green-600"
        }`}
      >
        {message}
      </p>
    )}

    {/* Back to Sign In */}
    <div className="mt-3 text-center">
      <button
        onClick={onBackToSignIn}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        ← Back to Sign In
      </button>
    </div>
  </div>
);


};

export default ForgotPasswordCard;
