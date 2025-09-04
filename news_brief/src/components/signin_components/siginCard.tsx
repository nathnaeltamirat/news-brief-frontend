"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(ThemeContext);
  if (!context) throw new Error("SignInCard must be used inside ThemeProvider");
  const { theme } = context;

  useEffect(() => {
    localStorage.removeItem("person");
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await apiClient.signIn(email, password);
      setTimeout(() => (window.location.href = "/news"), 1000);
      if (onClose) onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const statusError = err as Error & { statusCode?: number };
        setError(
          statusError.statusCode === 401
            ? t("auth.invalidCredentials")
            : err.message
        );
      } else setError(t("auth.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  // Theme-based classes
  const bgCard = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-400";
  const inputBg =
    theme === "light"
      ? "bg-gray-50 border-gray-200 text-black placeholder-gray-500"
      : "bg-gray-800 border-gray-700 text-white placeholder-gray-400";
  const btnPrimary =
    theme === "light"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-white text-black hover:bg-gray-200";
  const btnGoogle =
    theme === "light"
      ? "text-black border border-gray-300 hover:bg-gray-100"
      : "text-white border border-gray-600 hover:bg-gray-700";

  return (
   <div
  className={`relative w-full max-w-sm mx-3 sm:mx-auto rounded-xl shadow-lg p-6 ${bgCard} transition-all duration-300`}
>
  {onClose && (
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg font-bold"
    >
      ✕
    </button>
  )}

  <h1
    className={`text-xl sm:text-2xl font-bold text-center mb-3 ${textMain}`}
  >
    {t("auth.welcomeBack")}
  </h1>

  {error && (
    <p className="text-red-500 text-center mb-2 text-sm">{error}</p>
  )}

  <input
    type="email"
    placeholder={t("auth.email")}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={`w-full mb-2.5 px-3 py-2.5 rounded-lg border ${inputBg} text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
  />

  <div className="relative mb-3">
    <input
      type={showPassword ? "text" : "password"}
      placeholder={t("auth.password")}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} pr-9 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
    />
    {password && (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    )}
  </div>

  <div className="mb-3 text-right">
    <button
      onClick={onSwitchToForgot}
      className={`hover:underline font-medium text-xs ${textMain}`}
    >
      {t("auth.forgotPassword")}
    </button>
  </div>

  <button
    onClick={handleSignIn}
    disabled={loading}
    className={`w-full py-2.5 rounded-full font-semibold ${btnPrimary} disabled:opacity-50 mb-3 text-sm`}
  >
    {loading ? t("auth.signingIn") : t("auth.login")}
  </button>

  <div className="flex items-center my-3">
    <hr className="flex-1 border-gray-300 dark:border-gray-700" />
    <span className={`px-2 text-xs ${textSecondary}`}>OR</span>
    <hr className="flex-1 border-gray-300 dark:border-gray-700" />
  </div>

  <button
    onClick={() => apiClient.signInWithGoogle()}
    className={`w-full border py-2.5 rounded-full flex items-center justify-center gap-2 font-medium ${btnGoogle} text-sm`}
  >
    <Image src="/images/google.png" width={18} height={18} alt="Google Logo" />
    {t("auth.continueWithGoogle")}
  </button>

  <div className="mt-3 text-center">
    <p className={`text-xs ${textSecondary}`}>
      {t("auth.dontHaveAccount")}{" "}
      <button
        onClick={onSwitchToSignUp}
        className={`hover:underline font-medium ${textMain}`}
      >
        {t("auth.signup")}
      </button>
    </p>
  </div>
</div>

  );
};

export default SignInCard;
