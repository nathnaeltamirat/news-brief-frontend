"use client";

import React, { useState } from "react";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api"; 

interface SignInCardProps {
  onClose?: () => void;
  onSwitchToSignUp?: () => void;
  onSwitchToForgot?: () => void;
}

const SignInCard: React.FC<SignInCardProps> = ({
  onClose,
  onSwitchToSignUp,
  onSwitchToForgot,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiClient.signIn(email, password);
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);

      if (onClose) onClose(); // close modal after login
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("401")) {
          setError("Verify Your Email");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl shadow-xl p-8 bg-gray-50">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>
      )}

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Welcome Back
      </h1>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
      />

      {/* Password with eye toggle */}
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 pr-10"
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

      <div className="mb-6 text-right">
        <button
          onClick={onSwitchToForgot}
          className="hover:underline font-medium text-[12px] text-black"
        >
          Forgot Password?
        </button>
      </div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-[30px] font-semibold hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="flex items-center my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <button
        onClick={() => apiClient.signInWithGoogle()}
        className="w-full border py-3 rounded-[30px] flex items-center justify-center gap-3 text-black font-medium"
      >
        <Image
          src="/images/google.png"
          width={24}
          height={24}
          alt="Google Logo"
        />
        Continue with Google
      </button>

      <div>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="hover:underline font-medium text-black"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInCard;
