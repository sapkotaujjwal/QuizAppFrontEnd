import React, { useState, useEffect } from 'react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  BookOpen,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../../tools/api';
import { showError } from '../../redux/basicSlice';

const PlayQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [quiz, setQuiz] = useState(null);
  const [userAttempts, setUserAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id: quizId } = useParams();

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const response = await callApi({
          url: `/quizzes/${quizId}`,
          method: 'GET',
        });

        if (response.success) {
          const { quiz, userAttempts } = response;
          if (!quiz.isPublished) {
            throw new Error('Quiz is not published');
          }
          if (userAttempts.length >= quiz.maxAttempts) {
            throw new Error('Maximum attempts exceeded');
          }
          setQuiz(quiz);
          setUserAttempts(userAttempts);
          setTimeRemaining(quiz.timeLimit * 60);
        } else {
          throw new Error(response.message || 'Failed to fetch quiz');
        }
      } catch (err) {
        setError(err.message);
        showError({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted && quiz) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted && quiz) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isSubmitted, quiz]);

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentQuestionIndex]);

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, optionText, timeSpent) => {
    setAnswers({
      ...answers,
      [questionId]: { selectedAnswer: optionText, timeSpent },
    });
  };

  const handleFlagQuestion = () => {
    if (!currentQuestion) return;
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion._id)) {
      newFlagged.delete(currentQuestion._id);
    } else {
      newFlagged.add(currentQuestion._id);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setIsSubmitted(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        selectedAnswer: answer.selectedAnswer,
        timeSpent: answer.timeSpent || 0,
      }));

      const response = await callApi({
        url: `/quizzes/${quizId}/submit`,
        method: 'POST',
        data: {
          answers: formattedAnswers,
          timeSpent: quiz.timeLimit * 60 - timeRemaining,
        },
      });

      if (response.success) {
        setTimeout(() => {
          setShowResults(response.attempt);
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to submit quiz');
      }
    } catch (err) {
      setError(err.message);
      showError({ message: err.message });
      setIsSubmitted(false);
    }
  };

  const getProgressPercentage = () => {
    if (!quiz || !quiz.questions) return 0;
    return ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (!quiz || !quiz.questions || currentQuestionIndex >= quiz.questions.length - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const goToQuestion = (index) => {
    if (!quiz || !quiz.questions || index < 0 || index >= quiz.questions.length) return;
    setCurrentQuestionIndex(index);
  };

  const handleRetakeQuiz = () => {
    if (!quiz) return;
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(quiz.timeLimit * 60);
    setIsSubmitted(false);
    setShowResults(false);
    setFlaggedQuestions(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Quiz...</h2>
          <p className="text-gray-600">Please wait while we fetch the quiz.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            className="flex items-center gap-2 px-6 py-3 mx-auto shadow1 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/student/quiz')}
          >
            <Home className="w-5 h-5" />
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h2>
          <p className="text-gray-600 mb-6">This quiz has no questions.</p>
          <button
            className="flex items-center gap-2 px-6 py-3 mx-auto shadow1 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/student/quiz')}
          >
            <Home className="w-5 h-5" />
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                showResults.passed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {showResults.passed ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {showResults.passed ? 'Congratulations!' : 'Quiz Completed'}
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              {showResults.passed
                ? 'You passed the quiz!'
                : 'You need more practice.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {showResults.score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>

              <div
                className={`rounded-lg p-6 ${
                  showResults.passed ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div
                  className={`text-3xl font-bold mb-2 ${
                    showResults.passed ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {showResults.percentage}%
                </div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-gray-600 mb-2">
                  {quiz.passingScore}%
                </div>
                <div className="text-sm text-gray-600">Required Score</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userAttempts.length + 1 < quiz.maxAttempts && (
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleRetakeQuiz}
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button>
              )}

              <button
                className="flex items-center gap-2 px-6 py-3 shadow1 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => navigate('/student/quiz')}
              >
                <Home className="w-5 h-5" />
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted && !showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculating Results...
          </h2>
          <p className="text-gray-600">
            Please wait while we process your answers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{quiz.title || 'Quiz'}</h1>
            <p className="text-sm text-gray-600">{quiz.subject || 'Unknown'}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock
                className={`w-4 h-4 ${
                  timeRemaining < 300 ? 'text-red-500' : 'text-gray-500'
                }`}
              />
              <span
                className={
                  timeRemaining < 300
                    ? 'text-red-500 font-medium'
                    : 'text-gray-700'
                }
              >
                {formatTime(timeRemaining)}
              </span>
            </div>

            <button
              onClick={handleSubmitQuiz}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Quiz
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>
              Progress: {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm shadow1 p-4 sticky top-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Questions
              </h3>
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`
                      relative w-10 h-10 text-sm font-medium rounded-lg shadow1 transition-colors
                      ${
                        currentQuestionIndex === index
                          ? 'bg-blue-600 text-white border-blue-600'
                          : answers[quiz.questions[index]._id]
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {index + 1}
                    {flaggedQuestions.has(quiz.questions[index]._id) && (
                      <Flag className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Answered:</span>
                  <span className="font-medium">
                    {Object.keys(answers).length}/{totalQuestions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <span>Flagged:</span>
                  <span className="font-medium">{flaggedQuestions.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm shadow1">
              {/* Question Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                      </span>
                      {currentQuestion.difficulty && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            currentQuestion.difficulty === 'easy'
                              ? 'bg-green-100 text-green-800'
                              : currentQuestion.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {currentQuestion.difficulty}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      {currentQuestion.title || 'Untitled Question'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {currentQuestion.questionText || 'No question text available'}
                    </p>
                  </div>

                  <button
                    onClick={handleFlagQuestion}
                    className={`ml-4 p-2 rounded-lg transition-colors ${
                      flaggedQuestions.has(currentQuestion._id)
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Question Options */}
              <div className="p-6">
                <div className="space-y-3">
                  {(currentQuestion.options || []).map((option, index) => {
                    const isSelected =
                      answers[currentQuestion._id]?.selectedAnswer === option.text;
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleAnswerSelect(
                            currentQuestion._id,
                            option.text,
                            quiz.timeLimit * 60 - timeRemaining
                          )
                        }
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span
                            className={`font-medium ${
                              isSelected ? 'text-blue-900' : 'text-gray-900'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span
                            className={
                              isSelected ? 'text-blue-900' : 'text-gray-700'
                            }
                          >
                            {option.text || 'No option text'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Status */}
                {answers[currentQuestion._id] && (
                  <div className="mt-4 p-3 bg-green-50 shadow1 border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">Answer saved</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white shadow1 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {!answers[currentQuestion._id] && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please select an answer</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestionIndex === totalQuestions - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : answers[currentQuestion._id]
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white shadow1 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quiz Info Card */}
            <div className="mt-6 bg-white rounded-lg shadow-sm shadow1 p-4">
              <h3 className="font-medium text-gray-900 mb-2">Quiz Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Time Limit:</span>
                  <span className="ml-2 font-medium">{quiz.timeLimit || 'N/A'} min</span>
                </div>
                <div>
                  <span className="text-gray-500">Passing Score:</span>
                  <span className="ml-2 font-medium">{quiz.passingScore || 0}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Max Attempts:</span>
                  <span className="ml-2 font-medium">{quiz.maxAttempts || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Questions:</span>
                  <span className="ml-2 font-medium">{totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;