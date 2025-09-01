"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api";

interface SignUpCardProps {
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({
  onClose,
  onSwitchToSignIn,
}) => {
  useEffect(() => {
    localStorage.removeItem("person");
  }, []);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  // Password validation message
  const getPasswordMessage = (pwd: string) => {
    const messages: string[] = [];
    if (pwd.length < 8) messages.push("at least 8 characters");
    if (!/[A-Z]/.test(pwd)) messages.push("an uppercase letter");
    if (!/[a-z]/.test(pwd)) messages.push("a lowercase letter");
    if (!/\d/.test(pwd)) messages.push("a number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd))
      messages.push("a special character");

    if (messages.length === 0) return ""; // Hide if all rules met
    return "Password must include " + messages.join(", ") + ".";
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (getPasswordMessage(password) !== "") {
      setError("Password does not meet all requirements ❌");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiClient.signUp(fullName, email, password);
      if (res.status_code == 201) {
        setSuccess(
          res.message ||
            "User created successfully Check your email to Verify ✅"
        );
      }

      // Clear inputs immediately
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPasswordMessage(false);

      // Delay transition to Sign In
      setTimeout(() => {
        window.location.href = "/news";
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const statusError = err as Error & { statusCode?: number };

        if (statusError.statusCode === 409) {
          setError("Account already registered ❌");
        } else {
          setError(statusError.message);
        }
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordMessage = getPasswordMessage(password);

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto rounded-2xl shadow-xl p-6 sm:p-8 bg-gray-50 transition-all duration-300">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
        Create your account
      </h1>

      {success && (
        <p className="text-green-600 text-center mb-3 text-sm sm:text-base">
          {success}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center mb-3 text-sm sm:text-base">
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full mb-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm sm:text-base"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm sm:text-base"
      />

      {/* Password */}
      <div className="relative mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowPasswordMessage(true)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 pr-10 text-sm sm:text-base"
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

      {/* Live password message */}
      {showPasswordMessage && passwordMessage && (
        <p className="text-red-500 text-sm mb-4">{passwordMessage}</p>
      )}

      {/* Confirm Password */}
      <div className="relative mb-6">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 pr-10 text-sm sm:text-base"
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

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-[30px] font-semibold hover:bg-gray-900 disabled:opacity-50 text-sm sm:text-base"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <div className="flex items-center my-4 sm:my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 sm:px-3 text-gray-500 text-xs sm:text-sm">
          OR
        </span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <button
        onClick={() => apiClient.signInWithGoogle()}
        className="w-full border py-3 rounded-[30px] flex items-center justify-center gap-2 sm:gap-3 text-black font-medium text-sm sm:text-base"
      >
        <Image
          src="/images/google.png"
          width={24}
          height={24}
          alt="Google Logo"
        />
        Continue with Google
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => setTimeout(() => onSwitchToSignIn?.(), 1000)}
            className="text-black font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpCard;
