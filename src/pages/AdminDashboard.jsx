import {
  Search,
  Bell,
  Plus,
  BookOpen,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  TrendingUp,
  Brain,
  Atom,
} from "lucide-react";
import { useState } from "react";
import CreateUser from "./Staff/CreateUser";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const statsCards = [
    {
      title: "My Quizzes",
      value: "0",
      change: "+2 this week",
      changeColor: "text-green-500",
      icon: BookOpen,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Question Bank",
      value: "0",
      change: "+15 this week",
      changeColor: "text-green-500",
      icon: HelpCircle,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Quiz Attempts",
      value: "0",
      change: "+45 this week",
      changeColor: "text-green-500",
      icon: Users,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      title: "Avg. Score",
      value: "0%",
      change: "+3.2% improvement",
      changeColor: "text-green-500",
      icon: BarChart3,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ];

  const managementCards = [
    {
      title: "Manage Quizzes",
      description: "Create and edit your quiz assessments",
      icon: BookOpen,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Question Bank",
      description: "Manage your question repository",
      icon: HelpCircle,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Results & Analytics",
      description: "View student performance data",
      icon: BarChart3,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
  ];

  const recentQuizzes = [
    {
      title: "Algebra Fundamentals",
      questions: 15,
      attempts: 23,
      avgScore: 85,
      icon: Brain,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Physics Motion Laws",
      questions: 20,
      attempts: 12,
      avgScore: 78,
      icon: Atom,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ];

  const studentPerformance = [
    {
      category: "Top Performer",
      name: "Sarah Johnson",
      subject: "Algebra Fundamentals",
      value: "94%",
      valueColor: "text-green-500",
    },
    {
      category: "Most Active",
      name: "Mike Chen",
      subject: "attempts this week",
      value: "12",
      valueColor: "text-blue-500",
    },
    {
      category: "Needs Help",
      name: "Alex Wilson",
      subject: "Physics Motion Laws",
      value: "45%",
      valueColor: "text-red-500",
    },
  ];

  const [addUser, setAddUser] = useState(false);
    const user = useSelector((state) => state.user.data);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {addUser &&

      <div className="w-full mx-auto">

        <CreateUser close={()=> setAddUser(false)} />
      </div>}

      {!addUser && (
        <div className="flex-1">
          {/* Main Dashboard Content */}
          <main className="p-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">
                  Manage your quizzes and track student progress
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setAddUser(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New User</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm shadow1 border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center`}
                    >
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {card.value}
                    </p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${card.changeColor}`}>
                        {card.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Management Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {managementCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm shadow1 border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center mb-4`}
                  >
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-8">
              {/* Recent Quizzes */}
              <div className="bg-white rounded-lg shadow-sm shadow1 border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Quizzes
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg ${quiz.iconBg} flex items-center justify-center`}
                        >
                          <quiz.icon className={`w-5 h-5 ${quiz.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {quiz.questions} questions • {quiz.attempts}{" "}
                            attempts
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {quiz.avgScore}%
                        </p>
                        <p className="text-sm text-gray-600">avg score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Performance */}
              <div className="bg-white rounded-lg shadow-sm shadow1 border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Student Performance
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {studentPerformance.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {item.category}
                        </span>
                        <span className="text-right">
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.subject}
                          </p>
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-2xl font-bold ${item.valueColor}`}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
