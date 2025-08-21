import {
  Brain,
  BookOpen,
  BarChart3,
  HelpCircle,
  Users,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", path: "/staff" },
    { icon: BookOpen, label: "My Questions", path: "/staff/quiz", badge: "12" },
    // {
    //   icon: HelpCircle,
    //   label: "Question Bank",
    //   path: "/staff/questionBank",
    //   badge: "248",
    // },
        { icon: Users, label: "Users", path: "/staff/users" },
    { icon: BarChart3, label: "Results & Analytics", path: "/staff/analytics" },

    {
      icon: Settings,
      label: "Profile Settings",
      path: "/staff/profile/settings",
    },
  ];

  useEffect(() => {
    // First try exact match
    let currentIndex = sidebarItems.findIndex(
      (item) => item.path === location.pathname
    );

    // If no exact match, find longest prefix match
    if (currentIndex === -1) {
      currentIndex = sidebarItems
        .map((item, index) => ({
          index,
          matchLength: location.pathname.startsWith(item.path)
            ? item.path.length
            : 0,
        }))
        .sort((a, b) => b.matchLength - a.matchLength)[0].index;
    }

    setActiveIndex(currentIndex);
  }, [location.pathname]);

  const handleNavigation = (path, index) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r h-screen border-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path, index)}
            className={`flex items-center justify-between px-6 py-3 text-sm cursor-pointer transition-all duration-200 ${
              index === activeIndex
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon
                className={`w-5 h-5 ${
                  index === activeIndex ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  item.badge === "12"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
