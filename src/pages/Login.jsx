import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Key,
} from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      setSuccess("Login successful!");

      let user = response.data.user;
      const token = response.data.token; // Assuming token is in response.data

      // Store token in localStorage with Bearer prefix
      if (token) {
        localStorage.setItem("authToken", `Bearer ${token}`);
      }

      dispatch(setUser(user));

      // Redirect or update UI as needed
      setTimeout(() => {
        navigate(`/${user.role === "student" ? "student" : "staff"}/`);
      }, 600);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email,
      });
      setSuccess("OTP sent to your email!");
      setPage(3);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        otp,
        newPassword,
      });
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => setPage(1), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingOrb = ({ delay = 0, size = "w-32 h-32", position }) => (
    <div
      className={`absolute ${size} rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-xl animate-pulse ${position}`}
      style={{ animationDelay: `${delay}s`, animationDuration: "4s" }}
    />
  );

  const ParticleField = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ));
    return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <ParticleField />
        <FloatingOrb delay={0} size="w-32 h-32" position="top-1/4 left-1/4" />
        <FloatingOrb delay={1} size="w-24 h-24" position="top-3/4 left-3/4" />
        <FloatingOrb delay={2} size="w-40 h-40" position="top-1/2 right-1/4" />
        <div
          className="absolute top-1/4 right-1/3 w-32 h-32 border border-white/20 rotate-45 animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-white/10 rotate-12 animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-12">
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Learn Without Limits
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-md leading-relaxed">
              Join thousands of learners and access top courses, expert
              instructors, and interactive learning tools from anywhere in the
              world.
            </p>
            <img
              src="https://plus.unsplash.com/premium_vector-1720824711764-3dbcdcaf7609?q=80&w=839&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Online Learning Illustration"
              className="mt-8 rounded-xl shadow-xl mx-auto max-w-xs"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 fill-current text-white/5"
          >
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`w-full max-w-md space-y-8 transform transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
              {success}
            </div>
          )}

          {/* Login Form */}
          {page === 1 && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  onClick={() => setPage(2)}
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {page === 2 && (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div className="space-y-4">
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter your email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Reset Password Form */}
          {page === 3 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div className="group">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white animate-fade-in"
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white animate-fade-in"
                      placeholder="Create new password"
                    />
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white animate-fade-in"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 animate-fade-in"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
