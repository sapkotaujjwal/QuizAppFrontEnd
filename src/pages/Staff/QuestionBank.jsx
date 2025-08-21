import React from "react";
import { Plus, HelpCircle, ChevronDown } from "lucide-react";

const QuestionBank = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Question Bank
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your question repository for quizzes
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
            <Plus size={16} />
            Add Question
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Questions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Questions
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                <p className="text-sm text-green-600 mt-2">+15 this week</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Multiple Choice */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Multiple Choice
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* True/False */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">True/False</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Short Answer */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Short Answer
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Subject Filter */}
            <div className="relative">
              <select className="appearance-none px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-8 cursor-pointer transition duration-200">
                <option>All Subjects</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select className="appearance-none px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-8 cursor-pointer transition duration-200">
                <option>All Difficulties</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Questions
            </h2>
          </div>

          {/* Table Header */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
              <div>Question</div>
              <div>Type</div>
              <div>Subject</div>
              <div>Difficulty</div>
              <div>Used</div>
              <div>Created</div>
              <div>Actions</div>
            </div>
          </div>

          {/* Empty State */}
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Showing 1 to 0 of 0 results</p>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 1 to 0 of 0 results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
