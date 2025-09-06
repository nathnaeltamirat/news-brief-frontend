"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../lib/api";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface SignUpCardProps {
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}
type Topic = {
  label?: {
    en?: string;
    [key: string]: string | undefined;
  };
  slug: string;
};

const STORAGE_KEY = "selectedInterests";

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
  const [showInterestSelection, setShowInterestSelection] = useState(false);

  const [topics, setTopics] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Remove old user data on mount
  useEffect(() => {
    localStorage.removeItem("person");
  }, []);

  const getPasswordMessage = (pwd: string) => {
    const messages: string[] = [];
    const parts = t("auth.passwordRequirements").split(",");
    if (pwd.length < 8) messages.push(parts[0]);
    if (!/[A-Z]/.test(pwd)) messages.push(parts[1]);
    if (!/[a-z]/.test(pwd)) messages.push(parts[2]);
    if (!/\d/.test(pwd)) messages.push(parts[3]);
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) messages.push(parts[4]);
    return messages.length
      ? t("auth.passwordRequirements").split(":")[0] +
          " " +
          messages.join(", ") +
          "."
      : "";
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

        // Load topics
        await apiClient.loadTopics();

        const allTopics = localStorage.getItem("all_topics");
        if (allTopics) {
          const parsed = JSON.parse(allTopics);
          const names = parsed.map((t: Topic) => t.label?.en || t.slug); // ✅ correct
          setTopics(names);
        }

        setShowInterestSelection(true);
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPasswordMessage(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const statusError = err as Error & { statusCode?: number };
        if (statusError.statusCode === 409)
          setError(t("auth.accountAlreadyRegistered"));
        else setError(statusError.message);
      } else setError(t("auth.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const updated = prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Tailwind theme classes
  const bgCard = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-400";
  const inputBase = `w-full mb-2 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`;
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

  const passwordMessage = getPasswordMessage(password);

// Interest button styles
const interestBase =
  "cursor-pointer px-3 py-1 rounded-2xl border-2 text-center font-medium transition-all w-[120px] text-xs";

// Dark mode: selected = black bg, white text; hover = dark gray
// Light mode: selected = white bg, black text; hover = light gray
const selectedClasses =
  theme === "dark"
    ? "bg-white text-black border-white hover:bg-gray-200"
    : "bg-black text-white border-black hover:bg-gray-800";

const unselectedClasses =
  theme === "dark"
    ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";

  return (
    <div
      className={`relative w-full max-w-xs sm:max-w-sm mx-2 sm:mx-auto rounded-xl shadow-lg p-3 sm:p-5 ${bgCard} transition-all duration-300`}
    >
      {!showInterestSelection ? (
        <>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 text-lg font-bold"
            >
              ✕
            </button>
          )}

          <h1
            className={`text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 ${textMain}`}
          >
            {t("auth.signup")}
          </h1>

          {success && (
            <p className="text-green-600 text-center mb-2 text-xs sm:text-sm">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center mb-2 text-xs sm:text-sm">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder={t("auth.fullName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`${inputBase} ${inputBg} text-xs sm:text-sm`}
          />
          <input
            type="email"
            placeholder={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputBase} ${inputBg} text-xs sm:text-sm`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowPasswordMessage(true)}
              className={`${inputBase} ${inputBg} pr-10 text-xs sm:text-sm`}
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
          {showPasswordMessage && passwordMessage && (
            <p className="text-red-500 text-xs mb-3">
              {passwordMessage}
            </p>
          )}

          <div className="relative mb-3 sm:mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("auth.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputBase} ${inputBg} pr-10 text-xs sm:text-sm`}
            />
            {confirmPassword && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className={`w-full py-2 rounded-[20px] font-semibold ${btnPrimary} disabled:opacity-50 text-xs sm:text-sm mb-3`}
          >
            {loading ? t("auth.signingUp") : t("auth.signup")}
          </button>

          <div className="flex items-center my-2 sm:my-3">
            <hr className="flex-1 border-gray-300 dark:border-gray-700" />
            <span
              className={`px-2 text-xs ${textSecondary}`}
            >
              OR
            </span>
            <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          </div>

          <button
            onClick={() => apiClient.signInWithGoogle()}
            className={`w-full border py-2 rounded-[20px] flex items-center justify-center gap-2 font-medium ${btnGoogle} text-xs sm:text-sm`}
          >
            <Image
              src="/images/google.png"
              width={20}
              height={20}
              alt="Google Logo"
            />
            {t("auth.continueWithGoogle")}
          </button>

          <div className="mt-3 sm:mt-4 text-center">
            <p className={`text-xs sm:text-sm ${textSecondary}`}>
              {t("auth.alreadyHaveAccount")}{" "}
              <button
                onClick={() => setTimeout(() => onSwitchToSignIn?.(), 100)}
                className={`font-medium hover:underline ${textMain}`}
              >
                {t("auth.login")}
              </button>
            </p>
          </div>
        </>
      ) : (
        <div className="mt-4">
          <h2 className={`text-base font-semibold mb-2 ${textMain}`}>
            {t("auth.selectYourInterests")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {topics.length > 0 ? (
              topics.map((topic) => {
                const isSelected = selectedInterests.includes(topic);
                return (
                  <div
                    key={topic}
                    onClick={() => toggleInterest(topic)}
                    className={`${interestBase} ${
                      isSelected ? selectedClasses : unselectedClasses
                    }`}
                  >
                    {topic}
                  </div>
                );
              })
            ) : (
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Loading topics...
              </p>
            )}
          </div>
          <button
            onClick={() => (window.location.href = "/news")}
            className={`mt-3 w-full py-2 rounded-[20px] font-semibold ${btnPrimary} text-xs sm:text-sm`}
          >
            {t("auth.continue")}
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpCard;