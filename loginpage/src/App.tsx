import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Users, Lock, Cloud } from 'lucide-react';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (isSignUp && formData.password !== formData.confirmPassword) {
    alert("Passwords don't match");
    return;
  }
  
  console.log('Form submitted:', formData);
};

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Cloud className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">SecureShare</span>
          </div>

          {/* Form Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name - Only for Sign Up */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for Sign Up */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            {/* Toggle Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : 'Need an account? Sign up'
                }
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="w-1/2 bg-blue-100 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-red-500 mb-8">
            Secure File Sharing
          </h2>

          <div className="space-y-6">
            {/* Enterprise-Grade Security */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Enterprise-Grade Security
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  End-to-end encryption for your sensitive files and data.
                </p>
              </div>
            </div>

            {/* Team Collaboration */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Team Collaboration
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Share files securely with team members and track access and changes.
                </p>
              </div>
            </div>

            {/* Access Control */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Access Control
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Control who can view, edit, and share your files.
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-blue-600 text-white p-6 rounded-lg mt-8">
            <p className="text-lg font-medium mb-4 text-center">
              "If privacy is outlawed, only outlaws will have privacy."
            </p>
            <p className="text-blue-200 text-sm text-center">
              — Phil Zimmermann, Creator of PGP encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}