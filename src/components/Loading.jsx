import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Loading = () => {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .animate-pulseScale {
          animation: pulseScale 2.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-tr from-indigo-900 via-purple-800 to-blue-600
          px-6 py-12
          animate-fadeIn
        "
      >
        <img
          src="https://scholib.com/images/logo.png"
          alt="Logo"
          className="w-32 mb-4 rounded-xl shadow-lg
            transform
            animate-pulseScale
          "
        />

        <p className="text-white text-lg font-semibold mb-6 tracking-wide drop-shadow-md">
          Loading...
        </p>

        <LoadingSpinner />

        <p className="text-gray-200 text-lg font-semibold mt-6 tracking-wide drop-shadow-md">
          Please wait a moment...
        </p>
      </div>
    </>
  );
};

export default Loading;
