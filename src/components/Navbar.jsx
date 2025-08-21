import { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.svg";

const Navbar = ({ userDetailsController }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} className="h-8" alt="FunLearn Pro Logo" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              FunLearn Pro
            </h1>
          </div>

          {/* Desktop Search & Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative min-w-[50vw]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-xl shadow1 focus:ring-2 focus:ring-indigo-500 focus:outline-gray-200 focus:bg-white transition-all duration-300"
              />
            </div>

            <button
              className="flex items-center space-x-2 shadow1 border-gray-300 rounded-full px-3 py-1 hover:shadow-md transition-shadow focus:ring-2 focus:ring-indigo-400"
              onClick={userDetailsController}
            >
              <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-600" />
              <span className="text-sm hidden lg:block text-gray-700">Hi, Ujjwal</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

{/* Mobile Menu */}
<div
  className={`md:hidden transform origin-top transition-all duration-300 ease-in-out 
    ${isOpen ? "max-h-[500px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"} 
    overflow-hidden bg-white px-4 pb-4`}
>
  <div className="space-y-4 flex flex-col">
    {/* Search Input */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search quizzes, users..."
        className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-xl shadow1 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
      />
    </div>

    {/* User Button */}
    <div className="flex items-center">
      <button
        className="flex items-center space-x-2 shadow1 border border-gray-300 rounded-full px-3 py-1 hover:shadow-md transition-shadow focus:ring-2 focus:ring-indigo-400"
        onClick={userDetailsController}
      >
        <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-600" />
        <span className="text-sm text-gray-700">Hi, Ujjwal</span>
      </button>
    </div>
  </div>
</div>



    </nav>
  );
};

export default Navbar;
