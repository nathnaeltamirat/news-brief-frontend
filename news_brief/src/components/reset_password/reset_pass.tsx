"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "../../lib/api"; // adjust path if needed

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const verifier = searchParams.get("verifier") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Password validation rules
  const getPasswordMessage = (pwd: string) => {
    const messages: string[] = [];
    if (pwd.length < 8) messages.push("at least 8 characters");
    if (!/[A-Z]/.test(pwd)) messages.push("an uppercase letter");
    if (!/[a-z]/.test(pwd)) messages.push("a lowercase letter");
    if (!/\d/.test(pwd)) messages.push("a number");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd))
      messages.push("a special character");

    if (messages.length === 0) return "";
    return "Password must include " + messages.join(", ") + ".";
  };

  const passwordMessage = getPasswordMessage(password);

  useEffect(() => {
    if (!token || !verifier) {
      setError("Invalid or missing reset link ❌");
    }
  }, [token, verifier]);

  const handleSubmit = async () => {
    if (!token || !verifier) {
      setError("Missing reset credentials ❌");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (passwordMessage !== "") {
      setError("Password does not meet all requirements ❌");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiClient.resetPassword(verifier, token, password);
      setSuccess(res.message || "Password reset successfully ✅");

      // clear input fields
      setPassword("");
      setConfirmPassword("");
      setShowPasswordMessage(false);

      setTimeout(() => router.push("/"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="relative w-full max-w-md sm:max-w-lg mx-auto rounded-2xl shadow-xl p-6 sm:p-8 bg-gray-50 transition-all duration-300">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
      Reset Your Password
    </h1>

    {/* Success / Error */}
    {success && (
      <p className="text-green-600 text-center mb-4 text-sm sm:text-base">
        {success}
      </p>
    )}
    {error && (
      <p className="text-red-500 text-center mb-4 text-sm sm:text-base">
        {error}
      </p>
    )}

    {/* New Password */}
    <div className="relative mb-4">
      <input
        id="new-password"
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setShowPasswordMessage(true)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black/50"
      />
      {password && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>

    {/* Live password validation */}
    {showPasswordMessage && passwordMessage && (
      <p
        className={`text-sm mb-4 ${
          passwordMessage.includes("strong")
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {passwordMessage}
      </p>
    )}

    {/* Confirm Password */}
    <div className="relative mb-6">
      <input
        id="confirm-password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black/50"
      />
      {confirmPassword && (
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>

    {/* Submit */}
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full bg-black text-white py-3 rounded-[30px] font-semibold hover:bg-gray-900 disabled:opacity-50 text-sm sm:text-base"
    >
      {loading ? "Resetting..." : "Reset Password"}
    </button>
  </div>
);

}
