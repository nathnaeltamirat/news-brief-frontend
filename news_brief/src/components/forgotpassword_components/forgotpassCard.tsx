import React from 'react'

const forgotpassCard = () => {
  return (
    <div className="max-h-[250px] flex items-center justify-center bg-gray-50">
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8"
        style={{ background: "rgb(245, 245, 245)" }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Forgot password
        </h1>
        <h2>
          Enter your email address below and we'll send you a link to reset your
          password.
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <button className="pl-5 pr-5 pt-3 pb-3 bg-white text-black">
            Cancel
          </button>
          <button className="pl-5 pr-5 pt-3 pb-3 bg-black text-white">
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default forgotpassCard
