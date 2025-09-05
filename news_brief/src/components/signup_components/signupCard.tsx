"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next"; // Added translation import

interface SignUpCardProps {
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({
  onClose,
  onSwitchToSignIn,
}) => {
  const { t } = useTranslation(); // Added translation hook

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
      setError(t("auth.passwordsDoNotMatch")); // Added translation
      return;
    }
    if (getPasswordMessage(password) !== "") {
      setError(t("auth.passwordDoesNotMeetRequirements")); // Added translation
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiClient.signUp(fullName, email, password);
      if (res.status_code === 201) {
        setSuccess(res.message || t("auth.userCreatedSuccess")); // Added translation
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
        if (statusError.statusCode === 409) setError(t("auth.accountAlreadyRegistered")); // Added translation
        else setError(statusError.message);
      } else setError(t("auth.somethingWentWrong")); // Added translation
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
    <div className={`relative w-full max-w-xs mx-auto rounded-lg shadow-md p-4 ${bgCard} transition-all duration-300`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm font-bold"
        >
          ✕
        </button>
      )}

      <h1 className={`text-lg font-bold text-center mb-2 ${textMain}`}>
        {t("auth.signup")} {/* Added translation */}
      </h1>

      {success && (
        <p className="text-green-600 text-center mb-1 text-xs">{success}</p>
      )}
      {error && (
        <p className="text-red-500 text-center mb-1 text-xs">{error}</p>
      )}

      <input
        type="text"
        placeholder={t("auth.fullName")} 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className={`${inputBase} ${inputBg} text-xs mb-2`}
      />
      <input
        type="email"
        placeholder={t("auth.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${inputBase} ${inputBg} text-xs mb-2`}
      />

      {/* Password */}
      <div className="relative mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.password")} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowPasswordMessage(true)}
          className={`${inputBase} ${inputBg} pr-9 text-xs`}
        />
        {password && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {showPasswordMessage && passwordMessage && (
        <p className="text-red-500 text-xs mb-1">{passwordMessage}</p>
      )}

      {/* Confirm Password */}
      <div className="relative mb-2">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder={t("auth.confirmPassword")} 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`${inputBase} ${inputBg} pr-9 text-xs`}
        />
        {confirmPassword && (
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`w-full py-2 rounded-full font-medium ${btnPrimary} disabled:opacity-50 text-xs mb-2`}
      >
        {loading ? t("auth.signingUp") : t("auth.signup")} {/* Added translation */}
      </button>

      <div className="flex items-center my-2">
        <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        <span className={`px-2 text-xs ${textSecondary}`}>OR</span>
        <hr className="flex-1 border-gray-300 dark:border-gray-700" />
      </div>

      <button
        onClick={() => apiClient.signInWithGoogle()}
        className={`w-full border py-2 rounded-full flex items-center justify-center gap-1 font-medium ${btnGoogle} text-xs`}
      >
        <Image src="/images/google.png" width={14} height={14} alt="Google Logo" />
        {t("auth.continueWithGoogle")} {/* Added translation */}
      </button>

      <div className="mt-2 text-center">
        <p className={`text-xs ${textSecondary}`}>
          {t("auth.alreadyHaveAccount")}{" "} {/* Added translation */}
          <button
            onClick={() => setTimeout(() => onSwitchToSignIn?.(), 100)}
            className="font-medium hover:underline text-blue-600"
          >
            {t("auth.login")} {/* Added translation */}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpCard;

