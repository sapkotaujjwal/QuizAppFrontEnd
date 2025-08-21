import { Heart } from "lucide-react";
import logo from "../images/logo.svg";

export default function Footer() {
  return (


    <div className="bg-gray-50 shadow1 w-full border-gray-100 mt-6 relative left-0 bottom-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3 group">
            <div className="shadow1 rounded-xl overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
              <img 
                src={logo}
                alt="FunLearn Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">FunLearn</span>
              <div className="text-xs text-gray-500 mt-0.5">Admin Panel</div>
            </div>
          </div>

          {/* Animated Divider */}
          <div className="hidden md:block flex-1 mx-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent">
              <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500 w-0 animate-pulse"></div>
            </div>
          </div>

          {/* Copyright with Heart Animation */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
            <span>by FunLearn Team</span>
          </div>
        </div>

        {/* Subtle Bottom Animation */}
        <div className="mt-6 relative">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-pulse opacity-30"></div>
          </div>
        </div>
      </div>
    </div>

  );
}