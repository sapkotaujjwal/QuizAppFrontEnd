import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserCheck,
  Upload,
  Eye,
  EyeOff,
  Save,
  X,
  Shield,
  GraduationCap,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { callApi } from "../../tools/api";

const CreateUser = ({ close }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const roles = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "teacher", label: "Teacher", icon: BookOpen },
    { value: "admin", label: "Admin", icon: Shield },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showNotification("error", "Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      showNotification("error", "Password must be at least 6 characters long!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for API
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // If there's a profile image, we'll need to handle it differently
      // For now, we'll skip image upload as the API doesn't specify it
      await callApi({
        url: "/users",
        method: "POST",
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      showNotification("success", `${formData.role} user created successfully!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        profileImage: null,
      });
      setImagePreview(null);
    } catch (error) {
      showNotification(
        "error",
        error.message || "Failed to create user. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                close();
              }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Create New User
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-8"
        >
          <div className="space-y-6">
            {/* Profile Image Upload */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative">
                {imagePreview ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative"
                  >
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 bg-gray-100 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                  </motion.div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profileImage"
              />
              <label
                htmlFor="profileImage"
                className="text-sm bg-gray-600 p-3 px-8 rounded-3xl text-white cursor-pointer hover:text-white transition-colors"
              >
                {imagePreview ? "Change Profile Image" : "Upload Profile Image"}
              </label>
            </motion.div>

            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                  placeholder="Enter full name"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                  placeholder="Enter email address"
                />
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                User Role *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <motion.label
                      key={role.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        formData.role === role.value
                          ? "border-gray-800 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <IconComponent
                          className={`w-6 h-6 mx-auto mb-2 ${
                            formData.role === role.value
                              ? "text-gray-800"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            formData.role === role.value
                              ? "text-gray-800"
                              : "text-gray-600"
                          }`}
                        >
                          {role.label}
                        </span>
                      </div>
                    </motion.label>
                  );
                })}
              </div>
            </motion.div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gray-800 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <div className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Creating User...</span>
                  </>
                ) : (
                  <>
                    <span>Create User</span>
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg max-w-sm border ${
                notification.type === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                {notification.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{notification.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CreateUser;