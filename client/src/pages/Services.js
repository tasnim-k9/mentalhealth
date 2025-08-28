import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  HeartIcon
} from '../components/Icons';

const Services = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (link) => {
    if (!currentUser) {
      navigate('/login', { state: { from: link } });
    } else {
      navigate(link);
    }
  };

  const services = [
    {
      name: 'AI Chat Support',
      description: 'Get immediate support from our AI chatbot, available 24/7 for mental health conversations.',
      icon: ChatBubbleLeftRightIcon,
      link: '/chatbot'
    },
    {
      name: 'Journaling Tool',
      description: 'Record your thoughts and track your mood with our easy-to-use digital journal.',
      icon: BookOpenIcon,
      link: '/journal'
    },
    {
      name: 'Community Forum',
      description: 'Connect with others who understand what you\'re going through in a supportive environment.',
      icon: UserGroupIcon,
      link: '/forum'
    },
    {
      name: 'Guided Programs',
      description: 'Structured self-guided programs with reminders and progress tracking.',
      icon: CalendarIcon,
      link: '/mindfulness'
    },
    {
      name: 'Mood Tracking',
      description: 'Visualize your emotional patterns with our mood tracking dashboard.',
      icon: ChartBarIcon,
      link: '/journal'
    },
    {
      name: 'Mindfulness Tools',
      description: 'Practice meditation and breathing exercises to reduce stress and anxiety.',
      icon: HeartIcon,
      link: '/mindfulness'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Comprehensive mental health support tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <service.icon className="h-12 w-12 text-lavender-600 dark:text-lavender-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-lg font-medium text-gray-900 dark:text-white truncate transition-colors duration-300">
                      {service.name}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500 dark:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 transition-colors duration-300">
              <div className="text-sm">
                <button
                  onClick={() => handleServiceClick(service.link)}
                  className="font-medium text-lavender-600 dark:text-lavender-400 hover:text-lavender-500 dark:hover:text-lavender-300 transition-colors duration-200 cursor-pointer"
                >
                  Explore service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-lavender-50 dark:bg-lavender-900/20 rounded-lg p-8 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Ready to get started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            {currentUser 
              ? 'Access all our services and continue your mental health journey today.'
              : 'Create an account to access all our services and start your mental health journey today.'
            }
          </p>
          {currentUser ? (
            <button
              onClick={() => navigate('/chatbot')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200"
            >
              Start Chatting
            </button>
          ) : (
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200"
            >
              Sign Up Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;