// File: client/src/pages/Resources.js
import React from 'react';

const Resources = () => {
  const resourceCategories = [
    {
      title: 'Crisis Resources',
      resources: [
        {
          name: 'National Suicide Prevention Lifeline',
          description: '24/7 free and confidential support for people in distress',
          phone: '1-800-273-8255',
          link: 'https://suicidepreventionlifeline.org'
        },
        {
          name: 'Crisis Text Line',
          description: 'Text with a trained crisis counselor',
          phone: 'Text HOME to 741741',
          link: 'https://www.crisistextline.org'
        },
        {
          name: 'SAMHSA Treatment Referral Hotline',
          description: 'General information on mental health and treatment options',
          phone: '1-877-726-4727',
          link: 'https://www.samhsa.gov/find-help/national-helpline'
        }
      ]
    },
    {
      title: 'Self-Help Resources',
      resources: [
        {
          name: 'Mental Health America',
          description: 'Resources and screening tools for mental health conditions',
          link: 'https://www.mhanational.org'
        },
        {
          name: 'Anxiety and Depression Association of America',
          description: 'Information and resources for anxiety and depression',
          link: 'https://adaa.org'
        },
        {
          name: 'National Alliance on Mental Illness',
          description: 'Education, support, and advocacy for mental health',
          link: 'https://www.nami.org'
        }
      ]
    },
    {
      title: 'Wellness & Learning',
      resources: [
        {
          name: 'Headspace Library',
          description: 'Meditations and mindfulness content',
          link: 'https://www.headspace.com/mindfulness'
        },
        {
          name: 'UC Berkeley Greater Good',
          description: 'Science-based insights for a meaningful life',
          link: 'https://greatergood.berkeley.edu/'
        },
        {
          name: 'Mindfulness Exercises',
          description: 'Free guided practices and worksheets',
          link: 'https://mindfulnessexercises.com/'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Mental Health Resources
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Helpful resources and support services for mental wellness
        </p>
      </div>

      {resourceCategories.map((category) => (
        <div key={category.title} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            {category.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.resources.map((resource) => (
              <div key={resource.name} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {resource.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                  {resource.description}
                </p>
                {resource.phone && (
                  <p className="text-lavender-600 dark:text-lavender-400 font-medium mb-2 transition-colors duration-300">
                    {resource.phone}
                  </p>
                )}
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300 font-medium transition-colors duration-200"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Emergency Help
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
          If you're in crisis or experiencing thoughts of suicide, please reach out immediately to these resources:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              National Suicide Prevention Lifeline
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              1-800-273-8255
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Crisis Text Line
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              Text HOME to 741741
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;