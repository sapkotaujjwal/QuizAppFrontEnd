import React, { useState } from 'react';
import { 
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Clock,
  Users,
  Target,
  Calendar,
  Settings,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Zap,
  GripVertical
} from 'lucide-react';

const CreateQuiz = ({close}) => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    subject: '',
    timeLimit: 30,
    maxAttempts: 3,
    passingScore: 60,
    startDate: '',
    endDate: '',
    isPublished: false
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: '',
      questionType: 'multiple-choice',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      explanation: '',
      difficulty: 'medium'
    }
  ]);

  const [activeTab, setActiveTab] = useState('basic');

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      questionText: '',
      questionType: 'multiple-choice',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      explanation: '',
      difficulty: 'medium'
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, optionIndex, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        options: q.options.map((opt, idx) => 
          idx === optionIndex ? { ...opt, [field]: value } : opt
        )
      } : q
    ));
  };

  const subjects = ['Mathematics', 'Science', 'History', 'Programming', 'Literature', 'Physics'];
  const questionTypes = ['multiple-choice', 'true-false', 'short-answer'];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={()=>{close()}}>
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Create New Question</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>

              <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl">
                <CheckCircle className="w-4 h-4" />
                <span>Publish Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'basic', label: 'Basic Info', icon: BookOpen },
            { id: 'questions', label: 'Questions', icon: AlertCircle },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Information</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Title*</label>
                    <input
                      type="text"
                      value={quiz.title}
                      onChange={(e) => setQuiz({...quiz, title: e.target.value})}
                      placeholder="Enter question title..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject*</label>
                    <select
                      value={quiz.subject}
                      onChange={(e) => setQuiz({...quiz, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={quiz.description}
                      onChange={(e) => setQuiz({...quiz, description: e.target.value})}
                      placeholder="Brief description of the quiz..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
                      <input
                        type="number"
                        value={quiz.timeLimit}
                        onChange={(e) => setQuiz({...quiz, timeLimit: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Attempts</label>
                      <input
                        type="number"
                        value={quiz.maxAttempts}
                        onChange={(e) => setQuiz({...quiz, maxAttempts: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                    <input
                      type="number"
                      value={quiz.passingScore}
                      onChange={(e) => setQuiz({...quiz, passingScore: parseInt(e.target.value)})}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="datetime-local"
                        value={quiz.startDate}
                        onChange={(e) => setQuiz({...quiz, startDate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="datetime-local"
                        value={quiz.endDate}
                        onChange={(e) => setQuiz({...quiz, endDate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900"> Questions</h2>
              <button
                onClick={addQuestion}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <select
                        value={question.questionType}
                        onChange={(e) => updateQuestion(question.id, 'questionType', e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        {questionTypes.map(type => (
                          <option key={type} value={type}>
                            {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                      
                      <select
                        value={question.difficulty}
                        onChange={(e) => updateQuestion(question.id, 'difficulty', e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        {difficulties.map(diff => (
                          <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                          </option>
                        ))}
                      </select>
                      
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question Text*</label>
                      <textarea
                        value={question.questionText}
                        onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                        placeholder="Enter your question here..."
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    
                    {question.questionType === 'multiple-choice' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Answer Options</label>
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={option.isCorrect}
                                onChange={() => {
                                  const newOptions = question.options.map((opt, idx) => ({
                                    ...opt,
                                    isCorrect: idx === optionIndex
                                  }));
                                  updateQuestion(question.id, 'options', newOptions);
                                }}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                              />
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={option.text}
                                  onChange={(e) => updateOption(question.id, optionIndex, 'text', e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.questionType === 'true-false' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Correct Answer</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`true-false-${question.id}`}
                              value="true"
                              onChange={() => updateQuestion(question.id, 'correctAnswer', 'true')}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mr-2"
                            />
                            True
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`true-false-${question.id}`}
                              value="false"
                              onChange={() => updateQuestion(question.id, 'correctAnswer', 'false')}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mr-2"
                            />
                            False
                          </label>
                        </div>
                      </div>
                    )}

                    {question.questionType === 'short-answer' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sample Answer</label>
                        <input
                          type="text"
                          value={question.sampleAnswer || ''}
                          onChange={(e) => updateQuestion(question.id, 'sampleAnswer', e.target.value)}
                          placeholder="Provide a sample correct answer..."
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Explanation (Optional)</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                        placeholder="Explain the correct answer..."
                        rows="2"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6"> Settings</h2>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                      Time & Attempts
                    </h3>
                    
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Randomize Questions</p>
                          <p className="text-sm text-gray-600">Show questions in random order</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Show Results Immediately</p>
                          <p className="text-sm text-gray-600">Display scores after submission</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Allow Review</p>
                          <p className="text-sm text-gray-600">Let students review their answers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-indigo-600" />
                      Access Control
                    </h3>
                    
                    <div className="space-y-4 pl-7">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question Visibility</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
                          <option value="public">Public - Anyone can access</option>
                          <option value="private">Private - Invite only</option>
                          <option value="password">Password protected</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Access Password</label>
                        <input
                          type="password"
                          placeholder="Enter access password..."
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Groups</label>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">All Students</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Advanced Math</span>
                          <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all">
                            + Add Group
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                    <Target className="w-5 h-5 mr-2 text-indigo-600" />
                    Grading & Feedback
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grading Method</label>
                      <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
                        <option value="points">Points Based</option>
                        <option value="percentage">Percentage</option>
                        <option value="letter">Letter Grade</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                      <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
                        <option value="immediate">Immediate</option>
                        <option value="after-submit">After Submission</option>
                        <option value="manual">Manual Review</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Show Correct Answers</label>
                      <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
                        <option value="always">Always</option>
                        <option value="after-deadline">After Deadline</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
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

export default CreateQuiz;