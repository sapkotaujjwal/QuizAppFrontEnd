import React, { useState } from 'react';
import { Search, Calendar, Clock, Users, BookOpen, Filter, Star, Play, ChevronRight, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrowseQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // Mock data based on your models
  const quizzes = [
    {
      _id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and objects.',
      subject: 'Programming',
      timeLimit: 45,
      maxAttempts: 3,
      passingScore: 70,
      totalAttempts: 156,
      averageScore: 78,
      questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
      createdAt: '2024-01-15T10:00:00Z',
      difficulty: 'medium'
    },
    {
      _id: '2',
      title: 'React Hooks Deep Dive',
      description: 'Advanced concepts in React Hooks including useEffect, useContext, and custom hooks.',
      subject: 'Programming',
      timeLimit: 60,
      maxAttempts: 2,
      passingScore: 75,
      totalAttempts: 89,
      averageScore: 82,
      questions: ['q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'],
      createdAt: '2024-01-20T14:30:00Z',
      difficulty: 'hard'
    },
    {
      _id: '3',
      title: 'Database Design Principles',
      description: 'Understanding normalization, relationships, and query optimization in databases.',
      subject: 'Database',
      timeLimit: 50,
      maxAttempts: 3,
      passingScore: 65,
      totalAttempts: 203,
      averageScore: 73,
      questions: ['q13', 'q14', 'q15', 'q16', 'q17', 'q18'],
      createdAt: '2024-01-18T09:15:00Z',
      difficulty: 'medium'
    },
    {
      _id: '4',
      title: 'HTML & CSS Basics',
      description: 'Essential web development skills covering HTML structure and CSS styling.',
      subject: 'Web Development',
      timeLimit: 30,
      maxAttempts: 5,
      passingScore: 60,
      totalAttempts: 324,
      averageScore: 85,
      questions: ['q19', 'q20', 'q21', 'q22'],
      createdAt: '2024-01-12T16:45:00Z',
      difficulty: 'easy'
    },
    {
      _id: '5',
      title: 'Node.js & Express',
      description: 'Backend development with Node.js, Express framework, and API creation.',
      subject: 'Programming',
      timeLimit: 55,
      maxAttempts: 3,
      passingScore: 70,
      totalAttempts: 127,
      averageScore: 76,
      questions: ['q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29'],
      createdAt: '2024-01-22T11:20:00Z',
      difficulty: 'hard'
    }
  ];

  const subjects = ['all', 'Programming', 'Database', 'Web Development'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
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
    // Navigate to the quiz play page
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
                className="w-full pl-10 pr-4 py-2 shadow1  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 shadow1  rounded-lg hover:bg-gray-50 transition-colors"
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
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

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
      </div>
    </div>
  );
};

export default BrowseQuiz;