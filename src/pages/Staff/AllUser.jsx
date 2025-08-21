import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Save, 
  User,
  Mail,
  Calendar,
  Shield,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  MoreVertical
} from 'lucide-react';

const AllUser = () => {
  // Sample user data based on the schema
  const [users, setUsers] = useState([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'student',
      profileImage: null,
      isActive: true,
      lastLogin: '2024-01-15T10:30:00Z',
      emailVerified: true,
      enrolledCourses: ['course1', 'course2'],
      totalQuizzesTaken: 25,
      averageScore: 87.5,
      quizzesCreated: [],
      questionsCreated: [],
      createdAt: '2023-12-01T08:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'teacher',
      profileImage: null,
      isActive: true,
      lastLogin: '2024-01-16T14:20:00Z',
      emailVerified: true,
      enrolledCourses: [],
      totalQuizzesTaken: 5,
      averageScore: 95.2,
      quizzesCreated: ['quiz1', 'quiz2', 'quiz3'],
      questionsCreated: ['q1', 'q2', 'q3', 'q4'],
      createdAt: '2023-11-15T09:00:00Z',
      updatedAt: '2024-01-16T14:20:00Z'
    },
    {
      _id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      profileImage: null,
      isActive: true,
      lastLogin: '2024-01-17T09:00:00Z',
      emailVerified: true,
      enrolledCourses: [],
      totalQuizzesTaken: 0,
      averageScore: 0,
      quizzesCreated: [],
      questionsCreated: [],
      createdAt: '2023-10-01T00:00:00Z',
      updatedAt: '2024-01-17T09:00:00Z'
    },
    {
      _id: '4',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      role: 'student',
      profileImage: null,
      isActive: false,
      lastLogin: '2024-01-10T16:45:00Z',
      emailVerified: false,
      enrolledCourses: ['course1'],
      totalQuizzesTaken: 12,
      averageScore: 72.3,
      quizzesCreated: [],
      questionsCreated: [],
      createdAt: '2023-12-15T12:00:00Z',
      updatedAt: '2024-01-10T16:45:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);
    const matchesVerification = verificationFilter === 'all' ||
                               (verificationFilter === 'verified' && user.emailVerified) ||
                               (verificationFilter === 'unverified' && !user.emailVerified);
    
    return matchesSearch && matchesRole && matchesStatus && matchesVerification;
  });

  const handleUserClick = (user) => {
    setSelectedUser({ ...user });
    setIsEditMode(false);
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handleSaveUser = () => {
    setUsers(users.map(user => 
      user._id === selectedUser._id ? selectedUser : user
    ));
    setIsEditMode(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== userId));
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser(null);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and permissions</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm shadow1 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

                        <div className='flex'>
             
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-2 px-10 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

          </div>

        </div>


      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm shadow1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user._id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {user.emailVerified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" title="Email Verified" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{user.totalQuizzesTaken} quizzes</span>
                      <span className="text-xs text-gray-500">{user.averageScore.toFixed(1)}% avg</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserClick(user);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user._id);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? 'Edit User' : 'User Details'}
              </h2>
              <div className="flex items-center gap-2">
                {!isEditMode && (
                  <button
                    onClick={handleEditUser}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                )}
                {isEditMode && (
                  <button
                    onClick={handleSaveUser}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditMode(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={selectedUser.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full p-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{selectedUser.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditMode ? (
                      <input
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{selectedUser.email}</p>
                        {selectedUser.emailVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500" title="Email Verified" />
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    {isEditMode ? (
                      <select
                        value={selectedUser.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full p-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    {isEditMode ? (
                      <select
                        value={selectedUser.isActive.toString()}
                        onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                        className="w-full p-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${
                        selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4" />
                      {formatDate(selectedUser.lastLogin)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedUser.createdAt)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Verification</label>
                    {isEditMode ? (
                      <select
                        value={selectedUser.emailVerified.toString()}
                        onChange={(e) => handleInputChange('emailVerified', e.target.value === 'true')}
                        className="w-full p-2 shadow1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="true">Verified</option>
                        <option value="false">Unverified</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${
                        selectedUser.emailVerified ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <Mail className="w-4 h-4" />
                        {selectedUser.emailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Academic Statistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Academic Statistics
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Quizzes Taken</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{selectedUser.totalQuizzesTaken}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Average Score</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">{selectedUser.averageScore.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Enrolled Courses</label>
                      <p className="text-gray-900">{selectedUser.enrolledCourses.length}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quizzes Created</label>
                      <p className="text-gray-900">{selectedUser.quizzesCreated.length}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Questions Created</label>
                    <p className="text-gray-900">{selectedUser.questionsCreated.length}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Updated</label>
                    <p className="text-gray-900">{formatDate(selectedUser.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;