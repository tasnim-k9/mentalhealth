import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  PhoneIcon, 
  UserIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from './Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <InformationCircleIcon className="w-5 h-5" /> },
    { name: 'Services', path: '/services', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'AI Chat', path: '/chatbot', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'Blog', path: '/blog', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'Forum', path: '/forum', icon: <UserGroupIcon className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <PhoneIcon className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-lavender-600 dark:text-lavender-400">
                Mindful<span className="text-seafoam-600 dark:text-seafoam-400">Space</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-lavender-700 dark:text-lavender-300 bg-lavender-100 dark:bg-lavender-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <UserIcon className="w-5 h-5 inline mr-1" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-lavender-700 dark:text-lavender-300 bg-lavender-100 dark:bg-lavender-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3 px-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 hover:bg-lavender-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2 rounded-md text-base font-medium text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;