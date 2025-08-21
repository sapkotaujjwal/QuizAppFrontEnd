import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, BookOpen, FileText, Trophy, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin'); // Switch between admin, teacher, student
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Dummy data based on your API structure
  const dashboardStats = {
    admin: {
      totalUsers: 1250,
      totalTeachers: 45,
      totalStudents: 1180,
      totalQuizzes: 324,
      totalQuestions: 1850,
      totalAttempts: 5420,
      recentUsers: [
        { name: 'John Doe', email: 'john@example.com', role: 'student', createdAt: '2024-08-20T10:30:00Z' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', createdAt: '2024-08-19T14:20:00Z' },
        { name: 'Mike Johnson', email: 'mike@example.com', role: 'student', createdAt: '2024-08-18T09:15:00Z' }
      ],
      recentQuizzes: [
        { title: 'Advanced Mathematics', createdBy: { name: 'Dr. Wilson' }, createdAt: '2024-08-20T11:00:00Z' },
        { title: 'History of Science', createdBy: { name: 'Prof. Adams' }, createdAt: '2024-08-19T16:30:00Z' }
      ]
    },
    teacher: {
      totalQuizzes: 12,
      totalQuestions: 85,
      totalAttempts: 234,
      publishedQuizzes: 8,
      recentAttempts: [
        { student: { name: 'Alice Brown' }, quiz: { title: 'Algebra Basics' }, submittedAt: '2024-08-20T14:30:00Z' },
        { student: { name: 'Bob Wilson' }, quiz: { title: 'Geometry Test' }, submittedAt: '2024-08-20T13:15:00Z' }
      ],
      topPerformingQuizzes: [
        { title: 'Linear Equations', averageScore: 87.5, totalAttempts: 45 },
        { title: 'Quadratic Functions', averageScore: 82.3, totalAttempts: 38 }
      ]
    },
    student: {
      totalAttempts: 28,
      averageScore: 78.5,
      passedQuizzes: 22,
      recentAttempts: [
        { quiz: { title: 'Chemistry Basics', subject: 'Chemistry' }, submittedAt: '2024-08-20T10:00:00Z' },
        { quiz: { title: 'Physics Laws', subject: 'Physics' }, submittedAt: '2024-08-19T15:30:00Z' }
      ],
      availableQuizzes: 15
    }
  };

  const quizAnalytics = {
    quiz: {
      title: 'Advanced Mathematics Quiz',
      totalAttempts: 150,
      averageScore: 75.2,
      passRate: 68
    },
    questionAnalytics: [
      {
        question: { _id: '1', title: 'Linear Equations', difficulty: 'medium' },
        totalAttempts: 150,
        correctAnswers: 120,
        correctPercentage: 80,
        averageTimeSpent: 45
      },
      {
        question: { _id: '2', title: 'Quadratic Formula', difficulty: 'hard' },
        totalAttempts: 150,
        correctAnswers: 90,
        correctPercentage: 60,
        averageTimeSpent: 65
      },
      {
        question: { _id: '3', title: 'Basic Algebra', difficulty: 'easy' },
        totalAttempts: 150,
        correctAnswers: 135,
        correctPercentage: 90,
        averageTimeSpent: 30
      }
    ],
    scoreDistribution: {
      '0-20': 5,
      '21-40': 12,
      '41-60': 28,
      '61-80': 45,
      '81-100': 60
    },
    recentAttempts: [
      { student: 'John Doe', score: 85, passed: true, submittedAt: '2024-08-20T14:30:00Z' },
      { student: 'Jane Smith', score: 72, passed: true, submittedAt: '2024-08-20T13:15:00Z' },
      { student: 'Bob Wilson', score: 58, passed: false, submittedAt: '2024-08-20T12:00:00Z' }
    ]
  };

  const studentPerformance = [
    {
      student: { name: 'Alice Johnson', email: 'alice@example.com' },
      totalAttempts: 15,
      averageScore: 85.2,
      passRate: 87,
      attempts: [
        { quiz: { title: 'Math Quiz 1' }, score: 88, passed: true, submittedAt: '2024-08-18T10:00:00Z' },
        { quiz: { title: 'Science Quiz 1' }, score: 92, passed: true, submittedAt: '2024-08-17T14:30:00Z' }
      ]
    },
    {
      student: { name: 'Bob Smith', email: 'bob@example.com' },
      totalAttempts: 12,
      averageScore: 72.5,
      passRate: 67,
      attempts: [
        { quiz: { title: 'Math Quiz 1' }, score: 75, passed: true, submittedAt: '2024-08-18T11:00:00Z' },
        { quiz: { title: 'Science Quiz 1' }, score: 68, passed: true, submittedAt: '2024-08-17T15:30:00Z' }
      ]
    }
  ];

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
    const stats = dashboardStats[userRole];

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userRole === 'admin' && (
            <>
              <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
              <StatCard title="Total Teachers" value={stats.totalTeachers} icon={Users} color="green" />
              <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="purple" />
              <StatCard title="Total Quizzes" value={stats.totalQuizzes} icon={BookOpen} color="yellow" />
            </>
          )}
          {userRole === 'teacher' && (
            <>
              <StatCard title="My Quizzes" value={stats.totalQuizzes} icon={BookOpen} />
              <StatCard title="My Questions" value={stats.totalQuestions} icon={FileText} color="green" />
              <StatCard title="Total Attempts" value={stats.totalAttempts} icon={Trophy} color="purple" />
              <StatCard title="Published Quizzes" value={stats.publishedQuizzes} icon={CheckCircle} color="yellow" />
            </>
          )}
          {userRole === 'student' && (
            <>
              <StatCard title="Quiz Attempts" value={stats.totalAttempts} icon={Trophy} />
              <StatCard title="Average Score" value={`${stats.averageScore}%`} icon={TrendingUp} color="green" />
              <StatCard title="Passed Quizzes" value={stats.passedQuizzes} icon={CheckCircle} color="purple" />
              <StatCard title="Available Quizzes" value={stats.availableQuizzes} icon={BookOpen} color="yellow" />
            </>
          )}
        </div>

        {/* Charts Section */}
        {userRole === 'admin' && (
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
                {stats.recentUsers.map((user, index) => (
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

        {userRole === 'teacher' && (
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
                  {stats.recentAttempts.map((attempt, index) => (
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
    const scoreData = Object.entries(quizAnalytics.scoreDistribution).map(([range, count]) => ({
      range,
      count
    }));

    return (
      <div className="space-y-6">
        {/* Quiz Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{quizAnalytics.quiz.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{quizAnalytics.quiz.totalAttempts}</p>
              <p className="text-gray-600">Total Attempts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{quizAnalytics.quiz.averageScore}%</p>
              <p className="text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{quizAnalytics.quiz.passRate}%</p>
              <p className="text-gray-600">Pass Rate</p>
            </div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Question Analytics */}
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
                {quizAnalytics.questionAnalytics.map((q, index) => (
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
      </div>
    );
  };

  const renderStudentPerformance = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Performance Overview</h2>
          
          {studentPerformance.map((student, index) => (
            <div key={index} className="mb-6 p-4 shadow1 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.student.name}</h3>
                  <p className="text-gray-600">{student.student.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pass Rate</p>
                  <p className="text-xl font-bold text-green-600">{student.passRate}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-blue-600">{student.totalAttempts}</p>
                  <p className="text-gray-600">Total Attempts</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-green-600">{student.averageScore}%</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            {(userRole === 'admin' || userRole === 'teacher') && (
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

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'quiz-analytics' && renderQuizAnalytics()}
        {activeTab === 'student-performance' && renderStudentPerformance()}
      </div>
    </div>
  );
};

export default Analytics;