import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

export default function CreateNewQuestion() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
  const [explanation, setExplanation] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <div className="max-w-4xl p-3 lg:p-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Create New Question</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Question Details Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Question Details</h3>
          
          {/* Question Title */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Question Text */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Question Text *
            </label>
            <div className="relative">
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter the question that students will see"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <button className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Question Type, Subject, Difficulty Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Question Type *
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Short Answer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Subject</option>
                <option>Math</option>
                <option>Science</option>
                <option>History</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Difficulty *
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Answer Options Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Answer Options</h3>
          
          <div className="space-y-3 mb-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <input
                    type="radio"
                    name="correctAnswer"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => removeOption(index)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addOption}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Add Option
          </button>
        </div>

        {/* Additional Information Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Additional Information</h3>
          
          {/* Explanation */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Explanation (Optional)
            </label>
            <div className="relative">
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Provide an explanation for the correct answer"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <button className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {tag}
                    <button
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
          Create Question
        </button>
      </div>
    </div>
  );
}