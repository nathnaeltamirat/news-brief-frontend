import React from "react";
import Image from "next/image";

const SignUpCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8"
        style={{ background: "rgb(245, 245, 245)" }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create your account
        </h1>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <button className="w-full bg-black text-white py-3 rounded-[30px] font-semibold hover:bg-gray-900 transition">
          Sign Up
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          className="w-full border py-3 rounded-[30px] flex items-center justify-center gap-3 text-black font-medium"
          aria-label="Sign up with Google"
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
            Already have an account?{" "}
            <a href="#" className="hover:underline font-medium text-black">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
