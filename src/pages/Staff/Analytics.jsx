import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, BookOpen, FileText, Trophy, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { callApi } from '../../tools/api';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState(null);
  const [stats, setStats] = useState(null);
  const [quizAnalyticsData, setQuizAnalyticsData] = useState(null);
  const [studentPerformanceData, setStudentPerformanceData] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (activeTab === 'student-performance' && studentPerformanceData.length === 0 && (role === 'admin' || role === 'teacher')) {
      fetchStudentPerformance();
    }
  }, [activeTab, role]);

  useEffect(() => {
    if (activeTab === 'quiz-analytics' && selectedQuizId) {
      fetchQuizAnalytics();
    }
  }, [activeTab, selectedQuizId]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard stats and quizzes in parallel
      const [dashboardData, quizzesData] = await Promise.all([
        callApi({ url: '/analytics/dashboard' }),
        callApi({ url: '/quizzes' })
      ]);

      if (dashboardData.success) {
        setStats(dashboardData.stats);
        setRole(
          dashboardData.stats.totalUsers !== undefined ? 'admin' :
          dashboardData.stats.totalQuizzes !== undefined ? 'teacher' : 'student'
        );
      }

      if (quizzesData.success) {
        setQuizzes(quizzesData.quizzes);
        // Auto-select first quiz for teachers/admin
        if (quizzesData.quizzes.length > 0 && (role === 'admin' || role === 'teacher')) {
          setSelectedQuizId(quizzesData.quizzes[0]._id);
        }
      }
    } catch (error) {
      setError('Failed to load initial data');
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      setError(null);
      const data = await callApi({ url: '/analytics/student-performance' });
      if (data.success) {
        setStudentPerformanceData(data.performanceData);
      }
    } catch (error) {
      setError('Failed to load student performance data');
      console.error('Error fetching student performance:', error);
    }
  };

  const fetchQuizAnalytics = async () => {
    if (!selectedQuizId) return;
    try {
      setError(null);
      const data = await callApi({ url: `/analytics/quiz-analytics/${selectedQuizId}` });
      if (data.success) {
        setQuizAnalyticsData(data.analytics);
      }
    } catch (error) {
      setError('Failed to load quiz analytics');
      console.error('Error fetching quiz analytics:', error);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white shadow-md p-6 rounded-2xl shadow1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className={`h-12 w-12 text-${color}-500`} />
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDashboard = () => {
    if (!stats) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {role === 'admin' && (
            <>
              <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
              <StatCard title="Total Teachers" value={stats.totalTeachers} icon={Users} color="green" />
              <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="purple" />
              <StatCard title="Total Quizzes" value={stats.totalQuizzes} icon={BookOpen} color="yellow" />
            </>
          )}
          {role === 'teacher' && (
            <>
              <StatCard title="My Quizzes" value={stats.totalQuizzes} icon={BookOpen} />
              <StatCard title="My Questions" value={stats.totalQuestions} icon={FileText} color="green" />
              <StatCard title="Total Attempts" value={stats.totalAttempts} icon={Trophy} color="purple" />
              <StatCard title="Published Quizzes" value={stats.publishedQuizzes} icon={CheckCircle} color="yellow" />
            </>
          )}
          {role === 'student' && (
            <>
              <StatCard title="Quiz Attempts" value={stats.totalAttempts} icon={Trophy} />
              <StatCard title="Average Score" value={`${stats.averageScore}%`} icon={TrendingUp} color="green" />
              <StatCard title="Passed Quizzes" value={stats.passedQuizzes} icon={CheckCircle} color="purple" />
              <StatCard title="Available Quizzes" value={stats.availableQuizzes} icon={BookOpen} color="yellow" />
            </>
          )}
        </div>

        {role === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Students', value: stats.totalStudents },
                      { name: 'Teachers', value: stats.totalTeachers },
                      { name: 'Admins', value: stats.totalUsers - stats.totalStudents - stats.totalTeachers }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentUsers?.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(user.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {role === 'teacher' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Quiz Attempts</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentAttempts?.map((attempt, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.quiz.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(attempt.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderQuizAnalytics = () => {
    if (role !== 'admin' && role !== 'teacher') {
      return <div className="bg-white rounded-lg shadow-md p-6">Access denied: Quiz analytics available only to admins and teachers</div>;
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Quiz for Analytics</h3>
          <select
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          >
            <option value="">Select a quiz</option>
            {quizzes.map(quiz => (
              <option key={quiz._id} value={quiz._id}>{quiz.title}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {quizAnalyticsData && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{quizAnalyticsData.quiz.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{quizAnalyticsData.quiz.totalAttempts}</p>
                  <p className="text-gray-600">Total Attempts</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{quizAnalyticsData.quiz.averageScore}%</p>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{quizAnalyticsData.quiz.passRate}%</p>
                  <p className="text-gray-600">Pass Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(quizAnalyticsData.scoreDistribution).map(([range, count]) => ({
                    range,
                    count
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Performance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correct %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quizAnalyticsData.questionAnalytics.map((q, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.question.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            q.question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            q.question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {q.question.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.correctPercentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.averageTimeSpent}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attempts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quizAnalyticsData.recentAttempts.map((attempt, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.student}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.score}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {attempt.passed ? (
                            <span className="text-green-600">Passed</span>
                          ) : (
                            <span className="text-red-600">Failed</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(attempt.submittedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderStudentPerformance = () => {
    if (role !== 'admin' && role !== 'teacher') {
      return <div className="bg-white rounded-lg shadow-md p-6">Access denied: Student performance available only to admins and teachers</div>;
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Performance Overview</h2>
          
          {studentPerformanceData.map((student, index) => (
            <div key={index} className="mb-6 p-4 shadow1 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.student.name}</h3>
                  <p className="text-gray-600">{student.student.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pass Rate</p>
                  <p className="text-xl font-bold text-green-600">{student.passRate.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-blue-600">{student.totalAttempts}</p>
                  <p className="text-gray-600">Total Attempts</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-green-600">{student.averageScore.toFixed(1)}%</p>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-purple-600">{Math.round(student.totalAttempts * student.passRate / 100)}</p>
                  <p className="text-gray-600">Passed Quizzes</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Recent Attempts</h4>
                <div className="space-y-2">
                  {student.attempts.slice(0, 3).map((attempt, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{attempt.quiz.title}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${attempt.passed ? 'text-green-600' : 'text-red-600'}`}>
                          {attempt.score}%
                        </span>
                        {attempt.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setQuizAnalyticsData(null);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            {(role === 'admin' || role === 'teacher') && (
              <>
                <button
                  onClick={() => setActiveTab('quiz-analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'quiz-analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Quiz Analytics
                </button>
                <button
                  onClick={() => setActiveTab('student-performance')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'student-performance'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Student Performance
                </button>
              </>
            )}
          </nav>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'quiz-analytics' && renderQuizAnalytics()}
        {activeTab === 'student-performance' && renderStudentPerformance()}
      </div>
    </div>
  );
};

export default Analytics;