import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={`
              w-4 h-4
              rounded-full
              bg-gradient-to-tr from-white via-gray-800 to-white
              opacity-75
              animate-bounce
              delay-[${i * 150}ms]
            `}
            style={{ animationDelay: `${i * 0.15}s` }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;






