import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Users, BookOpen, Filter, Play, ChevronRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../../tools/api';
import { showError } from '../../redux/basicSlice';

const BrowseQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [subjects, setSubjects] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch quizzes and subjects when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch subjects
        const subjectsData = await callApi({
          url: '/questions/subjects/list',
          method: 'GET',
        });
        if (subjectsData.success) {
          setSubjects(['all', ...subjectsData.subjects]);
        } else {
          throw new Error('Failed to fetch subjects');
        }

        // Fetch quizzes with populated questions
        const quizzesData = await callApi({
          url: '/quizzes',
          method: 'GET',
          params: { limit: 100 }, // Adjust limit as needed
        });
        if (quizzesData.success) {
          // Compute difficulty for each quiz
          const quizzesWithDifficulty = quizzesData.quizzes.map(quiz => {
            const difficulties = quiz.questions.map(q => {
              if (q.difficulty === 'easy') return 1;
              if (q.difficulty === 'medium') return 2;
              if (q.difficulty === 'hard') return 3;
              return 2; // Default to medium if undefined
            });
            const avgDifficulty = difficulties.length > 0
              ? difficulties.reduce((sum, val) => sum + val, 0) / difficulties.length
              : 2;
            let difficulty;
            if (avgDifficulty <= 1.5) difficulty = 'easy';
            else if (avgDifficulty <= 2.5) difficulty = 'medium';
            else difficulty = 'hard';

            return { ...quiz, difficulty };
          });
          setQuizzes(quizzesWithDifficulty);
        } else {
          throw new Error('Failed to stir up the quizzes');
        }
      } catch (err) {
        setError(err.message);
        showError({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter quizzes based on search term, subject, and difficulty
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (quiz.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/play/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Quizzes</h1>
          <p className="text-gray-600">Choose a quiz to test your knowledge and skills</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading quizzes...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm shadow1 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search quizzes by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 shadow1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 shadow1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full px-3 py-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>
                            {subject === 'all' ? 'All Subjects' : subject}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full px-3 py-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredQuizzes.length} of {quizzes.length} quizzes
              </p>
            </div>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map(quiz => (
                <div key={quiz._id} className="bg-white rounded-lg shadow-sm shadow1 hover:shadow-md transition-shadow">
                  {/* Quiz Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{quiz.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description || 'No description available'}</p>

                    {/* Quiz Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{quiz.questions.length} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.timeLimit} min</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{quiz.totalAttempts} attempts</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span className={getScoreColor(quiz.averageScore)}>
                            {quiz.averageScore}% avg
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Pass: {quiz.passingScore}% • Max attempts: {quiz.maxAttempts}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Footer */}
                  <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartQuiz(quiz._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Start Quiz
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredQuizzes.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseQuiz;