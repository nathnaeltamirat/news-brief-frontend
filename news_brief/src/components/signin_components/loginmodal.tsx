'use client';

import React from "react";
import SignInCard from "./siginCard";
import SignUpCard from "../signup_components/signupCard";


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  view : 'signin' | 'signup';
  setView :(view : 'signin' | 'signup') => void;

}

export default function LoginModal({ isOpen, onClose, view, setView }: LoginModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {view === "signin" ? (
          <SignInCard switchToSignUp={() => setView("signup")} />
        ) : (
          <SignUpCard switchToSignIn={() => setView("signin")} />
        )}
      </div>
    </div>
  );
}
