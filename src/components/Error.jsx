import React from "react";

const Error = ({
  title = "Oops! Something went wrong.",
  message = "We couldn't complete your request. Please try again.",
  code = null,
  onRetry = null,
}) => {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.85; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .animate-pulseScale {
          animation: pulseScale 2.5s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-tr from-indigo-900 via-purple-800 to-blue-600
          px-6 py-12
          animate-fadeIn
          text-center
          select-none
        "
      >
        {/* Error Icon */}
        <div
          className="text-7xl mb-6 text-pink-500 animate-bounce"
          aria-hidden="true"
        >
          ⚠️
        </div>

        {/* Error Code (optional) */}
        {code && (
          <div className="text-indigo-300 font-mono text-xl mb-2 tracking-wide">
            Error Code: <span className="font-semibold">{code}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          {title}
        </h1>

        {/* Message */}
        <p className="text-indigo-200 text-lg max-w-lg mb-8 leading-relaxed">
          {message}
        </p>

        {/* Retry Button (optional) */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 active:bg-pink-700
              text-white font-semibold rounded-lg shadow-lg transition
              focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
              select-text
            "
          >
            Try Again
          </button>
        )}
      </div>
    </>
  );
};

export default Error;
