import React, { useEffect, useState } from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  BookOpen,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Eye,
  Download,
  Filter,
  ChevronRight,
  Star,
  Zap,
  Brain,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Repeat,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { callApi } from "../../tools/api";

const MyStats = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [viewMode, setViewMode] = useState("overview"); // overview, detailed, analytics

  const [quizAttempts, setQuizAttempts] = useState([]);

  async function fetchQuizAttempts() {
    try {
      const data = await callApi({
        url: "/analytics/self",
        method: "GET", // Explicitly specify if needed, though GET is the default
      });
      setQuizAttempts(data);
    } catch (error) {
      console.error("Failed to fetch quiz attempts:", error.message);
      // Optionally dispatch an error to Redux or show a user-friendly message
      showError({ message: "Failed to fetch quiz attempts" });
    }
  }

  useEffect(() => {

      fetchQuizAttempts();
    
  }, []);

  const quizAttempts1 = [
    {
      _id: "1",
      quiz: {
        _id: "q1",
        title: "JavaScript Fundamentals",
        subject: "Programming",
        passingScore: 70,
        totalQuestions: 10,
      },
      score: 8,
      percentage: 80,
      timeSpent: 1800, // 30 minutes in seconds
      startedAt: "2024-08-20T10:00:00Z",
      submittedAt: "2024-08-20T10:30:00Z",
      attemptNumber: 1,
      passed: true,
      answers: [
        { question: "q1", isCorrect: true, timeSpent: 120 },
        { question: "q2", isCorrect: true, timeSpent: 180 },
        { question: "q3", isCorrect: false, timeSpent: 240 },
        { question: "q4", isCorrect: true, timeSpent: 150 },
      ],
    },
    {
      _id: "2",
      quiz: {
        _id: "q2",
        title: "React Hooks Deep Dive",
        subject: "Programming",
        passingScore: 75,
        totalQuestions: 12,
      },
      score: 10,
      percentage: 83,
      timeSpent: 2700,
      startedAt: "2024-08-19T14:00:00Z",
      submittedAt: "2024-08-19T14:45:00Z",
      attemptNumber: 2,
      passed: true,
      answers: [],
    },
    {
      _id: "3",
      quiz: {
        _id: "q3",
        title: "Database Design Principles",
        subject: "Database",
        passingScore: 65,
        totalQuestions: 8,
      },
      score: 5,
      percentage: 63,
      timeSpent: 2100,
      startedAt: "2024-08-18T09:00:00Z",
      submittedAt: "2024-08-18T09:35:00Z",
      attemptNumber: 1,
      passed: false,
      answers: [],
    },
    {
      _id: "4",
      quiz: {
        _id: "q4",
        title: "HTML & CSS Basics",
        subject: "Web Development",
        passingScore: 60,
        totalQuestions: 6,
      },
      score: 6,
      percentage: 100,
      timeSpent: 900,
      startedAt: "2024-08-17T16:00:00Z",
      submittedAt: "2024-08-17T16:15:00Z",
      attemptNumber: 1,
      passed: true,
      answers: [],
    },
    {
      _id: "5",
      quiz: {
        _id: "q5",
        title: "Node.js & Express",
        subject: "Programming",
        passingScore: 70,
        totalQuestions: 9,
      },
      score: 6,
      percentage: 67,
      timeSpent: 2400,
      startedAt: "2024-08-16T11:00:00Z",
      submittedAt: "2024-08-16T11:40:00Z",
      attemptNumber: 3,
      passed: false,
      answers: [],
    },
  ];

  // Calculate statistics

  const totalAttempts = quizAttempts.length;
  const passedAttempts = quizAttempts.filter(
    (attempt) => attempt.passed
  ).length;
  const failedAttempts = totalAttempts - passedAttempts;
  const averageScore = Math.round(
    quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
      totalAttempts
  );
  const totalTimeSpent = quizAttempts.reduce(
    (sum, attempt) => sum + attempt.timeSpent,
    0
  );
  const averageTimePerQuiz = Math.round(totalTimeSpent / totalAttempts / 60); // in minutes

  const subjectStats = quizAttempts.reduce((acc, attempt) => {
    const subject = attempt.quiz.subject;
    if (!acc[subject]) {
      acc[subject] = { total: 0, passed: 0, totalScore: 0 };
    }
    acc[subject].total++;
    if (attempt.passed) acc[subject].passed++;
    acc[subject].totalScore += attempt.percentage;
    return acc;
  }, {});

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getPerformanceTrend = () => {
    if (quizAttempts.length < 2) return null;
    const recent = quizAttempts.slice(0, 2);
    const trend = recent[0].percentage - recent[1].percentage;
    return trend;
  };

  const trend = getPerformanceTrend();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                My Quiz Results
              </h1>
              <p className="text-gray-600 text-lg">
                Track your learning progress and performance insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white rounded-lg shadow1 shadow1-gray-300 p-1">
                {["overview", "detailed", "analytics"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      viewMode === mode
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/** Card 1 - Total Quizzes */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalAttempts}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>

          {/** Card 2 - Average Score */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {averageScore}%
                </p>
                {trend !== null && (
                  <div
                    className={`flex items-center gap-1 mt-1 text-sm ${
                      trend > 0
                        ? "text-green-600"
                        : trend < 0
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {trend > 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : trend < 0 ? (
                      <ArrowDown className="w-3 h-3" />
                    ) : null}
                    {trend > 0 ? "+" : ""}
                    {trend.toFixed(1)}%
                  </div>
                )}
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <Target className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>

          {/** Card 3 - Success Rate */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {Math.round((passedAttempts / totalAttempts) * 100)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {passedAttempts} of {totalAttempts} passed
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <Trophy className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>

          {/** Card 4 - Time Spent */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {formatTime(totalTimeSpent)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ~{averageTimePerQuiz}m avg
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {viewMode === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Quiz Attempts */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm shadow1">
              <div className="p-6 shadow1-b shadow1-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Quiz Attempts
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {quizAttempts.slice(0, 5).map((attempt) => (
                  <div
                    key={attempt._id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {attempt.quiz.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {attempt.quiz.subject}
                          </span>
                          {attempt.attemptNumber > 1 && (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                              <Repeat className="w-3 h-3" />
                              Attempt #{attempt.attemptNumber}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            {new Date(attempt.submittedAt).toLocaleDateString()}
                          </span>
                          <span>{formatTime(attempt.timeSpent)}</span>
                          <span>
                            {attempt.score}/{attempt.quiz.totalQuestions}{" "}
                            correct
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
                            attempt.percentage
                          )}`}
                        >
                          {attempt.percentage}%
                        </div>
                        {attempt.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white rounded-xl shadow-sm shadow1">
              <div className="p-6 shadow1-b shadow1-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Subject Performance
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(subjectStats).map(([subject, stats]) => {
                  const avgScore = Math.round(stats.totalScore / stats.total);
                  const successRate = Math.round(
                    (stats.passed / stats.total) * 100
                  );
                  return (
                    <div key={subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {subject}
                        </span>
                        <span className="text-sm text-gray-500">
                          {avgScore}% avg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${avgScore}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {stats.passed}/{stats.total} passed
                        </span>
                        <span>{successRate}% success rate</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewMode === "detailed" && (
          <div className="bg-white rounded-xl shadow-sm shadow1">
            <div className="p-6 shadow1-b shadow1-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Detailed Results
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 shadow1 shadow1-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Subjects</option>
                    {[...new Set(quizAttempts.map((a) => a.quiz.subject))].map(
                      (subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
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
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quizAttempts
                    .filter(
                      (attempt) =>
                        selectedSubject === "all" ||
                        attempt.quiz.subject === selectedSubject
                    )
                    .map((attempt) => (
                      <tr key={attempt._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {attempt.quiz.title}
                            </div>
                            {attempt.attemptNumber > 1 && (
                              <div className="text-xs text-gray-500">
                                Attempt #{attempt.attemptNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {attempt.quiz.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div
                              className={`text-sm font-medium ${
                                getGradeColor(attempt.percentage).split(" ")[0]
                              }`}
                            >
                              {attempt.percentage}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {attempt.score}/{attempt.quiz.totalQuestions}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTime(attempt.timeSpent)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(attempt.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {attempt.passed ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-700">
                                  Passed
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-700">
                                  Failed
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center gap-1">
                            View Details
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === "analytics" && (
          <div className="space-y-6">
            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm shadow1 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Score Distribution
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      range: "90-100%",
                      count: quizAttempts.filter((a) => a.percentage >= 90)
                        .length,
                      color: "bg-green-500",
                    },
                    {
                      range: "80-89%",
                      count: quizAttempts.filter(
                        (a) => a.percentage >= 80 && a.percentage < 90
                      ).length,
                      color: "bg-blue-500",
                    },
                    {
                      range: "70-79%",
                      count: quizAttempts.filter(
                        (a) => a.percentage >= 70 && a.percentage < 80
                      ).length,
                      color: "bg-yellow-500",
                    },
                    {
                      range: "60-69%",
                      count: quizAttempts.filter(
                        (a) => a.percentage >= 60 && a.percentage < 70
                      ).length,
                      color: "bg-orange-500",
                    },
                    {
                      range: "Below 60%",
                      count: quizAttempts.filter((a) => a.percentage < 60)
                        .length,
                      color: "bg-red-500",
                    },
                  ].map((item) => (
                    <div key={item.range} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-20">
                        {item.range}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-500`}
                          style={{
                            width: `${(item.count / totalAttempts) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm shadow1 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Learning Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Strongest Subject
                      </p>
                      <p className="text-sm text-blue-700">
                        {
                          Object.entries(subjectStats).reduce(
                            (best, [subject, stats]) =>
                              stats.totalScore / stats.total >
                              (best.avgScore || 0)
                                ? {
                                    subject,
                                    avgScore: stats.totalScore / stats.total,
                                  }
                                : best,
                            {}
                          ).subject
                        }{" "}
                        - Keep up the excellent work!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">
                        Needs Improvement
                      </p>
                      <p className="text-sm text-yellow-700">
                        {
                          Object.entries(subjectStats).reduce(
                            (worst, [subject, stats]) =>
                              stats.totalScore / stats.total <
                              (worst.avgScore || 100)
                                ? {
                                    subject,
                                    avgScore: stats.totalScore / stats.total,
                                  }
                                : worst,
                            {}
                          ).subject
                        }{" "}
                        - Focus more study time here.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Star className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Achievement</p>
                      <p className="text-sm text-green-700">
                        You've completed {totalAttempts} quizzes with a{" "}
                        {averageScore}% average!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="bg-white rounded-xl shadow-sm shadow1 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Management Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(totalTimeSpent)}
                  </div>
                  <div className="text-sm text-gray-600">Total Study Time</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {averageTimePerQuiz}m
                  </div>
                  <div className="text-sm text-gray-600">Average per Quiz</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      totalTimeSpent /
                        quizAttempts.reduce(
                          (sum, a) => sum + a.quiz.totalQuestions,
                          0
                        ) /
                        60
                    )}
                    m
                  </div>
                  <div className="text-sm text-gray-600">
                    Average per Question
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStats;
