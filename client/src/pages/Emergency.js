// File: client/src/pages/Emergency.js
import React from 'react';

const Emergency = () => {
  const emergencyResources = [
    {
      name: 'Vandrevala Foundation Helpline',
      number: '1860 2662 345 / 1800 2333 330',
      description: '24/7 mental health support and crisis intervention',
      available: '24/7',
      link: 'https://www.vandrevalafoundation.com'
    },
    {
      name: 'iCall Psychosocial Helpline',
      number: '9152987821',
      description: 'Telephone and email-based counseling service',
      available: 'Mon-Sat, 8AM-10PM',
      link: 'https://icallhelpline.org'
    },
    {
      name: 'SNEHA Suicide Prevention Helpline',
      number: '044-24640050',
      description: '24/7 support for people in emotional distress',
      available: '24/7',
      link: 'https://snehamumbai.org'
    },
    {
      name: 'Aasra Suicide Prevention Helpline',
      number: '9820466726',
      description: '24/7 confidential emotional support',
      available: '24/7',
      link: 'http://www.aasra.info'
    },
    {
      name: 'National Tele Mental Health Program (Tele MANAS)',
      number: '14416 / 1-800-891-4416',
      description: 'Government mental health support service',
      available: '24/7',
      link: 'https://nimhans.ac.in'
    },
    {
      name: 'KIRAN Mental Health Rehabilitation',
      number: '1800-599-0019',
      description: '24/7 mental health support helpline',
      available: '24/7',
      link: 'https://kiranhelpline.in'
    },
    {
      name: 'Women Helpline (All India)',
      number: '1091 / 181',
      description: 'Emergency support for women in distress',
      available: '24/7',
      link: 'https://wcd.nic.in'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      description: 'Emergency help for children in need of care and protection',
      available: '24/7',
      link: 'https://1098.childlineindia.org.in'
    },
    {
      name: 'Police Emergency',
      number: '100',
      description: 'Emergency police assistance',
      available: '24/7',
      link: 'https://www.india.gov.in'
    }
  ];

  const copingStrategies = [
    {
      title: 'Grounding Techniques',
      description: 'Focus on your senses to stay present. Name 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.'
    },
    {
      title: 'Breathing Exercises',
      description: 'Try the 4-7-8 method: Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat several times.'
    },
    {
      title: 'Reach Out',
      description: 'Contact a trusted friend, family member, or mental health professional. You don\'t have to go through this alone.'
    },
    {
      title: 'Safe Environment',
      description: 'Move to a safe, comfortable space. Remove yourself from triggering situations if possible.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Emergency Support - India
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Immediate help and resources when you need it most
        </p>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-12 transition-colors duration-300">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200 transition-colors duration-300">
              If you're in immediate danger
            </h3>
            <div className="mt-2 text-red-700 dark:text-red-300 transition-colors duration-300">
              <p>Please call 112 (Emergency) or 100 (Police) or go to your nearest emergency room.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Emergency Helplines - India
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {emergencyResources.map((resource) => (
            <div key={resource.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {resource.name}
              </h3>
              <a
                href={`tel:${resource.number.replace(/[^0-9+]/g, '')}`}
                className="text-xl font-bold text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300 block mb-3 transition-colors duration-200"
              >
                {resource.number}
              </a>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  {resource.available}
                </span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300 transition-colors duration-200"
                >
                  Visit website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coping Strategies */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Immediate Coping Strategies
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {copingStrategies.map((strategy, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 transition-colors duration-300">
                {strategy.title}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 transition-colors duration-300">
                {strategy.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Plan */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Create a Safety Plan
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            A safety plan can help you navigate difficult moments. Consider preparing:
          </p>
          <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside space-y-2 mb-6 transition-colors duration-300">
            <li>Emergency contacts to reach out to</li>
            <li>Comforting activities you can do alone</li>
            <li>Places you can go to feel safe</li>
            <li>Professional resources you can contact</li>
            <li>Reasons to live or things to look forward to</li>
          </ul>
          <button className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-3 rounded-md transition-colors duration-200">
            Create Your Safety Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emergency;