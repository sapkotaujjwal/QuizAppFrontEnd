import React, { useState } from "react";
import { Plus, Eye, Edit, Users, Search, ChevronDown } from "lucide-react";
import CreateQuiz from "./CreateQuiz";

export default function Quiz() {
  const [createQuiz, setCreateQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {createQuiz && (
        <>
          <CreateQuiz close={() => setCreateQuiz(false)} />
        </>
      )}

      {!createQuiz && <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              My Quizzes
            </h1>
            <p className="text-gray-600">
              Create, manage, and track your quiz assessments
            </p>
          </div>
          <button
            onClick={() => setCreateQuiz(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Create New Quiz
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Quizzes */}
          <div className="bg-white rounded-lg p-6 shadow-sm shadow1 ">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Total Quizzes</span>
              <Plus size={16} className="text-gray-400" />
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">0</div>
            <div className="text-green-600 text-sm">+2 this week</div>
          </div>

          {/* Published */}
          <div className="bg-white rounded-lg p-6 shadow-sm shadow1 ">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Published</span>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye size={16} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">0</div>
            <div className="text-green-600 text-sm">Active quizzes</div>
          </div>

          {/* Drafts */}
          <div className="bg-white rounded-lg p-6 shadow-sm shadow1 ">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Drafts</span>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Edit size={16} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">0</div>
            <div className="text-yellow-600 text-sm">Pending publish</div>
          </div>

          {/* Total Attempts */}
          <div className="bg-white rounded-lg p-6 shadow-sm shadow1 ">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Total Attempts</span>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users size={16} className="text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">0</div>
            <div className="text-purple-600 text-sm">All time</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm shadow1  mb-6">
          <div className="p-6">
            <div className="flex gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="w-full pl-10 pr-4 py-2 shadow1  shadow1 -gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Subject Filter */}
              <div className="relative">
                <select className="appearance-none bg-white shadow1  shadow1 -gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>All Subjects</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select className="appearance-none bg-white shadow1  shadow1 -gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>All Status</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Table */}
        <div className="bg-white rounded-lg shadow-sm shadow1 ">
          <div className="px-6 py-4 shadow1 -b shadow1 -gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Quizzes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Showing 1 to 0 of 0 results
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 shadow1 -t shadow1 -gray-200">
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 text-gray-400 bg-gray-100 rounded cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 text-gray-400 bg-gray-100 rounded cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
