import React from 'react';
import { Plus, FileText, HelpCircle, Users, BarChart3, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Ujjwal Sapkota!</h1>
            <p className="text-gray-600 mt-1">Manage your quizzes and track student progress</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              Add Question
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Create Quiz
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">My Quizzes</h3>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Question Bank</h3>
              <HelpCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15 this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Quiz Attempts</h3>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +45 this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Avg. Score</h3>
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.2% improvement
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Quizzes</h3>
                <p className="text-sm text-gray-600">Create and edit your quiz assessments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Question Bank</h3>
                <p className="text-sm text-gray-600">Manage your question repository</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Results & Analytics</h3>
                <p className="text-sm text-gray-600">View student performance data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quizzes */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Quizzes</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Algebra Fundamentals</h4>
                    <p className="text-sm text-gray-600">15 questions • 23 attempts</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">85%</div>
                  <div className="text-xs text-gray-500">avg score</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Physics Motion Laws</h4>
                    <p className="text-sm text-gray-600">20 questions • 12 attempts</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">78%</div>
                  <div className="text-xs text-gray-500">avg score</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Chemistry Basics</h4>
                    <p className="text-sm text-gray-600">18 questions • 8 attempts</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">92%</div>
                  <div className="text-xs text-gray-500">avg score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Performance */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Student Performance</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Top Performer</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">Sarah Johnson</div>
                    <div className="text-xs text-gray-500">Algebra Fundamentals</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">94%</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Most Active</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">Mike Chen</div>
                    <div className="text-xs text-gray-500">attempts this week</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">12</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Needs Help</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">Alex Wilson</div>
                    <div className="text-xs text-gray-500">Physics Motion Laws</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-500">45%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;