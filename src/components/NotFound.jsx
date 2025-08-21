import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-6 text-white">
      <h1
        className="text-[8rem] font-extrabold text-blue-400 select-none
          animate-float mb-4"
        aria-label="404"
      >
        404
      </h1>
      <p className="text-lg sm:text-xl max-w-md text-gray-300 mb-8 text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="relative inline-block px-8 py-3 font-semibold text-blue-400 border border-blue-400 rounded-md
          overflow-hidden group
          hover:text-white
          transition-colors duration-300"
      >
        <span className="relative z-10">Go Home</span>
        <span
          className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400
            scale-x-0 group-hover:scale-x-100
            origin-left
            transition-transform duration-300"
        />
      </a>

      {/* Tailwind animation styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
