import { Clock, Trophy, RefreshCw, Award, ChevronDown, BookOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { callApi } from '../../tools/api';
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const user = useSelector((state) => state.user.data);
  const [quizAttempts, setQuizAttempts] = useState([]);

  async function fetchQuizAttempts() {
    try {
      const data = await callApi({
        url: '/analytics/self',
        method: 'GET',
      });
      setQuizAttempts(data);
    } catch (error) {
      console.error('Failed to fetch quiz attempts:', error.message);
      // Optionally dispatch an error to Redux or show a user-friendly message
      // showError({ message: 'Failed to fetch quiz attempts' });
    }
  }

  useEffect(() => {
    fetchQuizAttempts();
  }, []);

  // Helper function to calculate total study time in hours
  const calculateStudyTime = (attempts) => {
    const totalSeconds = attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
    return (totalSeconds / 3600).toFixed(1); // Convert seconds to hours
  };

  // Helper function to calculate average score
  const calculateAverageScore = (attempts) => {
    if (attempts.length === 0) return 0;
    const totalPercentage = attempts.reduce((sum, attempt) => sum + attempt.percentage, 0);
    return Math.round(totalPercentage / attempts.length);
  };

  // Helper function to count passed quizzes
  const countPassedQuizzes = (attempts) => {
    return attempts.filter((attempt) => attempt.passed).length;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
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
          <div className="text-3xl font-bold text-gray-900 mb-1">{quizAttempts.length}</div>
          <div className="text-gray-500 text-sm">Completed Quizzes</div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{calculateAverageScore(quizAttempts)}%</div>
          <div className="text-gray-500 text-sm">Average Score</div>
        </div>

        {/* Passed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{countPassedQuizzes(quizAttempts)}</div>
          <div className="text-gray-500 text-sm">Passed</div>
        </div>

        {/* Study Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{calculateStudyTime(quizAttempts)}h</div>
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
                <option>Programming</option>
                <option>Web Development</option>
                <option>Database</option>
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

        {quizAttempts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No quiz attempts yet. Start with your first quiz!</p>
          </div>
        ) : (
          <div className="p-6">
            {quizAttempts.map((attempt) => (
              <div
                key={attempt._id}
                className="border-b border-gray-100 py-4 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{attempt.quiz.title}</h3>
                    <p className="text-sm text-gray-500">{attempt.quiz.subject} • Attempt #{attempt.attemptNumber}</p>
                    <p className="text-sm text-gray-500">Taken on {formatDate(attempt.startedAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {attempt.score}/{attempt.quiz.totalQuestions} ({attempt.percentage}%)
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        attempt.passed ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {attempt.passed ? 'Passed' : 'Failed'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}