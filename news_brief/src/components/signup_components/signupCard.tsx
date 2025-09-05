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

interface Topic {
  label?: { en?: string; [key: string]: string | undefined };
  slug: string;
}

const STORAGE_KEY = "selectedInterests";

const SignUpCard: React.FC<SignUpCardProps> = ({ onClose, onSwitchToSignIn }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext) || {};
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [show, setShow] = useState({ password: false, confirm: false, message: false, interest: false });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const [topics, setTopics] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    localStorage.removeItem("person");
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setInterests(JSON.parse(stored));
  }, []);

  const getPasswordMsg = (pwd: string) => {
    const parts = t("auth.passwordRequirements").split(",");
    const checks = [
      pwd.length < 8 && parts[0],
      !/[A-Z]/.test(pwd) && parts[1],
      !/[a-z]/.test(pwd) && parts[2],
      !/\d/.test(pwd) && parts[3],
      !/[!@#$%^&*(),.?":{}|<>]/.test(pwd) && parts[4]
    ].filter(Boolean) as string[];
    return checks.length ? `${t("auth.passwordRequirements").split(":")[0]} ${checks.join(", ")}.` : "";
  };

  const handleSignUp = async () => {
    if (form.password !== form.confirmPassword) return setStatus({ ...status, error: t("auth.passwordsDoNotMatch") });
    if (getPasswordMsg(form.password)) return setStatus({ ...status, error: t("auth.passwordDoesNotMeetRequirements") });

    setStatus({ ...status, loading: true, error: "" });
    try {
      const res = await apiClient.signUp(form.fullName, form.email, form.password);
      if (res.status_code === 201) {
        setStatus({ ...status, success: res.message || t("auth.userCreatedSuccess") });
        await apiClient.loadTopics();
        const allTopics = localStorage.getItem("all_topics");
        if (allTopics) {
          const parsedTopics: Topic[] = JSON.parse(allTopics);
          setTopics(parsedTopics.map(t => t.label?.en || t.slug));
        }
        setShow({ ...show, interest: true });
      }
      setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
      setShow({ ...show, message: false });
    } catch (err) {
      const error = err as Error & { statusCode?: number };
      const msg = error.statusCode === 409 ? t("auth.accountAlreadyRegistered") : error.message || t("auth.somethingWentWrong");
      setStatus({ ...status, error: msg });
    } finally {
      setStatus({ ...status, loading: false });
    }
  };

  const toggleInterest = (interest: string) => {
    const updated = interests.includes(interest) ? interests.filter(i => i !== interest) : [...interests, interest];
    setInterests(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isDark = theme === "dark";
  const bgCard = isDark ? "bg-gray-900" : "bg-gray-50";
  const textMain = isDark ? "text-gray-100" : "text-gray-900";
  const inputBg = isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black";
  const btnPrimary = isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800";
  const interestBtn = (selected: boolean) => 
    selected ? (isDark ? "bg-white text-black border-white" : "bg-black text-white border-black") : 
    (isDark ? "bg-gray-800 text-gray-300 border-gray-700" : "bg-gray-100 text-gray-700 border-gray-300");

  return (
    <div className={`relative w-80 mx-auto rounded-xl shadow p-4 ${bgCard}`}>
      {!show.interest ? (
        <>
          {onClose && <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✕</button>}
          <h1 className={`text-lg font-bold text-center mb-4 ${textMain}`}>{t("auth.signup")}</h1>
          
          {status.success && <p className="text-green-600 text-center mb-2 text-sm">{status.success}</p>}
          {status.error && <p className="text-red-500 text-center mb-2 text-sm">{status.error}</p>}

          {["fullName", "email"].map(field => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={t(`auth.${field}`)}
              value={form[field as keyof typeof form]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              className={`w-full p-2 mb-2 rounded border ${inputBg} text-sm`}
            />
          ))}

          {["password", "confirmPassword"].map((field, i) => (
            <div key={field} className="relative mb-2">
              <input
                type={show[field === "password" ? "password" : "confirm"] ? "text" : "password"}
                placeholder={t(`auth.${field === "password" ? "password" : "confirmPassword"}`)}
                value={form[field as keyof typeof form]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                onFocus={() => field === "password" && setShow({ ...show, message: true })}
                className={`w-full p-2 rounded border ${inputBg} pr-8 text-sm`}
              />
              {form[field as keyof typeof form] && (
                <button onClick={() => setShow({ ...show, [field === "password" ? "password" : "confirm"]: !show[field === "password" ? "password" : "confirm"] })} className="absolute right-2 top-2 text-gray-500">
                  {show[field === "password" ? "password" : "confirm"] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
            </div>
          ))}

          {show.message && getPasswordMsg(form.password) && <p className="text-red-500 text-xs mb-2">{getPasswordMsg(form.password)}</p>}

          <button onClick={handleSignUp} disabled={status.loading} className={`w-full p-2 rounded font-medium ${btnPrimary} disabled:opacity-50 text-sm mb-2`}>
            {status.loading ? t("auth.signingUp") : t("auth.signup")}
          </button>

          <div className="flex items-center my-3">
            <hr className="flex-1 border-gray-300" /><span className="px-2 text-xs text-gray-500">OR</span><hr className="flex-1 border-gray-300" />
          </div>

          <button onClick={() => apiClient.signInWithGoogle()} className="w-full border p-2 rounded flex items-center justify-center gap-2 text-sm mb-3">
            <Image src="/images/google.png" width={16} height={16} alt="Google" />
            {t("auth.continueWithGoogle")}
          </button>

          <p className="text-xs text-center text-gray-500">
            {t("auth.alreadyHaveAccount")} <button onClick={() => onSwitchToSignIn?.()} className="font-medium hover:underline">{t("auth.login")}</button>
          </p>
        </>
      ) : (
        <div>
          <h2 className={`text-md font-semibold mb-3 ${textMain}`}>{t("auth.selectYourInterests")}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {topics.length > 0 ? topics.map(topic => (
              <div key={topic} onClick={() => toggleInterest(topic)} className={`cursor-pointer px-3 py-1 rounded-full border text-xs ${interestBtn(interests.includes(topic))}`}>
                {topic}
              </div>
            )) : <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading topics...</p>}
          </div>
          <button onClick={() => (window.location.href = "/news")} className={`w-full p-2 rounded font-medium ${btnPrimary}`}>
            {t("auth.continue")}
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpCard;