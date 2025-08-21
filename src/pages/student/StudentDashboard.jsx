import { Clock, Trophy, RefreshCw, Award, ChevronDown, BookOpen } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Ujjwal Sapkota!</h1>
        <p className="text-blue-100 text-lg">Ready to test your knowledge today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Completed Quizzes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-gray-500 text-sm">Completed Quizzes</div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0%</div>
          <div className="text-gray-500 text-sm">Average Score</div>
        </div>

        {/* Passed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-gray-500 text-sm">Passed</div>
        </div>

        {/* Study Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0h</div>
          <div className="text-gray-500 text-sm">Study Time</div>
        </div>
      </div>

      {/* Available Quizzes Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Available Quizzes</h2>
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>History</option>
                <option>English</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        
        {/* Empty State */}
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No quiz attempts yet. Start with your first quiz!</p>
        </div>
      </div>
    </div>
  );
}