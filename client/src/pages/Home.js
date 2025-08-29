// File: client/src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import ChatWidget from '../components/ChatWidget';
import { 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  CalendarIcon,
  ChartBarIcon,
  HeartIcon
} from '../components/Icons';

const Home = () => {
  const features = [
    {
      name: 'Journaling Tool',
      description: 'Record your thoughts and track your mood with our easy-to-use journal.',
      icon: BookOpenIcon,
      color: 'text-pastel-pink-500'
    },
    {
      name: 'AI Chat Support',
      description: 'Get immediate support from our AI chatbot, available 24/7.',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-soft-blue-500'
    },
    {
      name: 'Community Forum',
      description: 'Connect with others who understand what you\'re going through.',
      icon: UserGroupIcon,
      color: 'text-seafoam-500'
    },
    {
      name: 'Mood Tracking',
      description: 'Visualize your emotional patterns with our mood tracking dashboard.',
      icon: ChartBarIcon,
      color: 'text-pastel-pink-500'
    },
    {
      name: 'Mindfulness Tools',
      description: 'Practice meditation and breathing exercises to reduce stress.',
      icon: HeartIcon,
      color: 'text-soft-blue-500'
    }
  ];

  const stats = [
    { label: 'Users Helped', value: '10,000+' },
    { label: 'Mental Health Tools', value: '15+' },
    { label: 'Resources', value: '200+' },
    { label: 'Community Members', value: '5,000+' }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-lavender-600 dark:text-lavender-400 tracking-wide uppercase transition-colors duration-300">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
              Everything you need for your mental wellness
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto transition-colors duration-300">
              Our comprehensive toolkit is designed to support you at every step of your mental health journey.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 dark:bg-gray-700 rounded-lg px-6 pb-8 transition-colors duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className={`inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 shadow-md rounded-md ${feature.color} transition-colors duration-300`}>
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-lavender-100 dark:bg-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
              Trusted by thousands
            </h2>
            <p className="mt-3 text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Our community is growing every day as more people prioritize their mental health.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-lavender-600 dark:text-lavender-400 transition-colors duration-300">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
            <span className="block">Ready to get started?</span>
            <span className="block text-lavender-600 dark:text-lavender-400 transition-colors duration-300">Begin your journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-lavender-600 dark:text-lavender-400 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Home;