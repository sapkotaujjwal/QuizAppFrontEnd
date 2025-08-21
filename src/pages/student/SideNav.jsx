import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Brain,
  BookOpen,
  LayoutDashboard,
  Trophy,
  Settings,
} from "lucide-react";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
    { icon: BookOpen, label: "Available Quizzes", path: "/student/quiz" },
    { icon: Trophy, label: "My Results", path: "/student/myStats" },
    { icon: Settings, label: "Profile Settings", path: "/student/profileSettings" },
  ];

  // Update activeIndex whenever location changes
  useEffect(() => {
    const currentIndex = sidebarItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const handleNavigation = (path, index) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveIndex(index); // update state immediately on click
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r h-screen border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900"> Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path, index)}
            className={`flex items-center justify-between px-6 py-3 text-sm cursor-pointer transition-all duration-200 ${
              index === activeIndex
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } mb-2`}
          >
            <div className="flex items-center space-x-3">
              <item.icon
                className={`w-5 h-5 ${index === activeIndex ? "text-blue-600" : "text-gray-500"}`}
              />
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
