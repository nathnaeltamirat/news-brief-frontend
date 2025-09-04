"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface SignUpCardProps {
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({
  onClose,
  onSwitchToSignIn,
}) => {
  const { t } = useTranslation();

  const context = useContext(ThemeContext);
  if (!context) throw new Error("SignUpCard must be used inside ThemeProvider");
  const { theme } = context;

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

  useEffect(() => {
    localStorage.removeItem("person");
  }, []);

  // Password validation
  const getPasswordMessage = (pwd: string) => {
    const messages: string[] = [];
    if (pwd.length < 8) messages.push(t("auth.passwordRequirements").split(",")[0]);
    if (!/[A-Z]/.test(pwd)) messages.push(t("auth.passwordRequirements").split(",")[1]);
    if (!/[a-z]/.test(pwd)) messages.push(t("auth.passwordRequirements").split(",")[2]);
    if (!/\d/.test(pwd)) messages.push(t("auth.passwordRequirements").split(",")[3]);
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) messages.push(t("auth.passwordRequirements").split(",")[4]);
    return messages.length ? t("auth.passwordRequirements").split(":")[0] + " " + messages.join(", ") + "." : "";
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError(t("auth.passwordsDoNotMatch"));
      return;
    }
    if (getPasswordMessage(password) !== "") {
      setError(t("auth.passwordDoesNotMeetRequirements"));
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiClient.signUp(fullName, email, password);
      if (res.status_code === 201) {
        setSuccess(res.message || t("auth.userCreatedSuccess"));
      }
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPasswordMessage(false);
      setTimeout(() => (window.location.href = "/news"), 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const statusError = err as Error & { statusCode?: number };
        if (statusError.statusCode === 409) setError(t("auth.accountAlreadyRegistered"));
        else setError(statusError.message);
      } else setError(t("auth.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const passwordMessage = getPasswordMessage(password);

  // Theme-based classes
  const bgCard = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-400";
  const inputBase = `w-full mb-3 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`;
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
    {t("auth.signup")}
  </h1>

  {success && (
    <p className="text-green-600 text-center mb-2 text-sm">{success}</p>
  )}
  {error && (
    <p className="text-red-500 text-center mb-2 text-sm">{error}</p>
  )}

  <input
    type="text"
    placeholder={t("auth.fullName")}
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className={`${inputBase} ${inputBg} text-sm`}
  />
  <input
    type="email"
    placeholder={t("auth.email")}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={`${inputBase} ${inputBg} text-sm`}
  />

  {/* Password */}
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder={t("auth.password")}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onFocus={() => setShowPasswordMessage(true)}
      className={`${inputBase} ${inputBg} pr-9 text-sm`}
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
  {showPasswordMessage && passwordMessage && (
    <p className="text-red-500 text-xs mb-2">{passwordMessage}</p>
  )}

  {/* Confirm Password */}
  <div className="relative mb-3">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder={t("auth.confirmPassword")}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className={`${inputBase} ${inputBg} pr-9 text-sm`}
    />
    {confirmPassword && (
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    )}
  </div>

  <button
    onClick={handleSignUp}
    disabled={loading}
    className={`w-full py-2.5 rounded-full font-semibold ${btnPrimary} disabled:opacity-50 text-sm mb-3`}
  >
    {loading ? t("auth.signingUp") : t("auth.signup")}
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
      {t("auth.alreadyHaveAccount")}{" "}
      <button
        onClick={() => setTimeout(() => onSwitchToSignIn?.(), 100)}
        className={`font-medium hover:underline ${textMain}`}
      >
        {t("auth.login")}
      </button>
    </p>
  </div>
</div>

  );
};

export default SignUpCard;
