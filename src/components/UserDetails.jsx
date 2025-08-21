import { useState, useEffect } from "react";
import avatar from "../images/avatar.svg"
import { useSelector } from "react-redux";

const UserDetails = ({ show = true, onClose, user, onLogout }) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timeoutId = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [show]);

  if (!shouldRender) return null;



  return (
    <>
      <style>{`
        .fade-slide-enter {
          opacity: 0;
          transform: translateY(-10px);
        }
        .fade-slide-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .fade-slide-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-slide-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 300ms ease, transform 300ms ease;
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        className={` z-3 fixed top-20 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-300  p-6
          ${show ? "fade-slide-enter-active" : "fade-slide-exit-active"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200 ease-in-out focus:outline-none"
          aria-label="Close user details"
        >
          ✕
        </button>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={user?.avatarUrl || avatar}
            alt={`${user?.name}'s avatar`}
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />

          <h2
            id="user-details-title"
            className="text-xl font-semibold text-gray-900"
          >
            {user?.name || "John Doe"}
          </h2>

          <div className="w-full space-y-2 text-gray-700 text-sm">
            <div>
              <strong>Email :</strong> {user?.email || "user@example.com"}
            </div>
            <div>
              <strong>Phone :</strong> {user?.phone || "(123) 456-7890"}
            </div>
            <div>
              <strong>Last logged in :</strong>{" "}
              {user?.lastLogin || "2025-05-20 15:30"}
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
