import React from "react";

const VerificationCard = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
       
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">OTP Verification</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-10 h-10 border border-gray-300 text-center text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-gray-200 text-black px-6 py-2 rounded-full hover:bg-gray-300 transition">
            Cancel
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
