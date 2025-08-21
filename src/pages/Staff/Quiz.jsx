import React, { useState, useEffect } from "react";
import { Plus, Eye, Edit, Users, Search, ChevronDown, Trash2 } from "lucide-react";
import CreateQuiz from "./CreateQuiz";
import EditQuiz from "./EditQuiz";
import { callApi } from "../../tools/api";
import { format } from "date-fns";

export default function Quiz() {
  const [createQuiz, setCreateQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Fetch quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await callApi({
          url: "/quizzes/my-quizzes",
          method: "GET",
        });
        setQuizzes(response.data || []);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      setLoading(true);
      const response = await callApi({
        url: `/quizzes/${quizId}`,
        method: "DELETE",
      });

      if (response.success) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        alert("Quiz deleted successfully");
      } else {
        alert(response.message || "Failed to delete quiz");
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Error deleting quiz");
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalQuizzes = quizzes.length;
  const publishedQuizzes = quizzes.filter((quiz) => quiz.isPublished).length;
  const draftQuizzes = quizzes.filter((quiz) => !quiz.isPublished).length;
  const totalAttempts = quizzes.reduce((sum, quiz) => sum + quiz.totalAttempts, 0);

  // Filter quizzes based on search and filters
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "All Subjects" || quiz.subject === subjectFilter;
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Published" && quiz.isPublished) ||
      (statusFilter === "Draft" && !quiz.isPublished);
    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Get unique subjects for filter dropdown
  const subjects = ["All Subjects", ...new Set(quizzes.map((quiz) => quiz.subject))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {createQuiz && <CreateQuiz close={() => setCreateQuiz(false)} />}
      {editQuiz && (
        <EditQuiz
          quiz={editQuiz}
          close={() => setEditQuiz(null)}
          onUpdate={(updatedQuiz) => {
            setQuizzes(quizzes.map((q) => (q._id === updatedQuiz._id ? updatedQuiz : q)));
            setEditQuiz(null);
          }}
        />
      )}

      {!createQuiz && !editQuiz && (
        <div className="max-w-7xl mx-auto">
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
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm">Total Quizzes</span>
                <Plus size={16} className="text-gray-400" />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {totalQuizzes}
              </div>
              <div className="text-green-600 text-sm">+{totalQuizzes} this week</div>
            </div>

            {/* Published */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm">Published</span>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye size={16} className="text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {publishedQuizzes}
              </div>
              <div className="text-green-600 text-sm">Active quizzes</div>
            </div>

            {/* Drafts */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm">Drafts</span>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Edit size={16} className="text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {draftQuizzes}
              </div>
              <div className="text-yellow-600 text-sm">Pending publish</div>
            </div>

            {/* Total Attempts */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm">Total Attempts</span>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {totalAttempts}
              </div>
              <div className="text-purple-600 text-sm">All time</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Subject Filter */}
                <div className="relative">
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-400 pointer-events-none"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
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
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
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
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredQuizzes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No quizzes found
                      </td>
                    </tr>
                  ) : (
                    filteredQuizzes.map((quiz) => (
                      <tr key={quiz._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {quiz.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {quiz.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quiz.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quiz.questions.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quiz.totalAttempts}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              quiz.isPublished
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {quiz.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(quiz.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setEditQuiz(quiz)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end gap-2">
                <button
                  disabled={true}
                  className="px-3 py-1 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={true}
                  className="px-3 py-1 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}