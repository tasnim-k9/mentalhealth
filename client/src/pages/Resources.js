// File: client/src/pages/Resources.js
import React from 'react';

const Resources = () => {
  const resourceCategories = [
    {
      title: 'Crisis Resources',
      resources: [
        {
          name: 'Vandrevala Foundation Helpline',
          description: '24/7 mental health support and crisis intervention',
          phone: '1860 2662 345 / 1800 2333 330',
          link: 'https://www.vandrevalafoundation.com'
        },
        {
          name: 'iCall Psychosocial Helpline',
          description: 'Telephone and email-based counseling service',
          phone: '9152987821',
          link: 'https://icallhelpline.org'
        },
        {
          name: 'SNEHA Suicide Prevention Helpline',
          description: '24/7 support for people in emotional distress',
          phone: '044-24640050 (24/7)',
          link: 'https://snehamumbai.org'
        },
        {
          name: 'Aasra Suicide Prevention Helpline',
          description: '24/7 confidential emotional support',
          phone: '9820466726',
          link: 'http://www.aasra.info'
        }
      ]
    },
    {
      title: 'Government Helplines',
      resources: [
        {
          name: 'Ministry of Health Mental Health Helpline',
          description: 'Government mental health support service',
          phone: '1800-599-0019',
          link: 'https://www.mohfw.gov.in'
        },
        {
          name: 'NIMHANS Tele MANAS',
          description: 'National tele-mental health program',
          phone: '14416 / 1-800-891-4416',
          link: 'https://nimhans.ac.in'
        },
        {
          name: 'KIRAN Mental Health Rehabilitation',
          description: '24/7 mental health support helpline',
          phone: '1800-599-0019',
          link: 'https://kiranhelpline.in'
        }
      ]
    },
    {
      title: 'Therapy & Counseling',
      resources: [
        {
          name: 'Mind.fit',
          description: 'Online therapy with licensed Indian psychologists',
          link: 'https://mind.fit'
        },
        {
          name: 'YourDOST',
          description: 'Online counseling and emotional wellness platform',
          link: 'https://yourdost.com'
        },
        {
          name: 'InnerHour',
          description: 'Therapy and self-care mental health app',
          link: 'https://theinnerhour.com'
        },
        {
          name: 'Wysa',
          description: 'AI-powered mental health support app',
          link: 'https://www.wysa.io'
        }
      ]
    },
    {
      title: 'Mental Health Organizations',
      resources: [
        {
          name: 'The Live Love Laugh Foundation',
          description: 'Mental health awareness and education',
          link: 'https://www.thelivelovelaughfoundation.org'
        },
        {
          name: 'Indian Mental Health Foundation',
          description: 'Mental health advocacy and support',
          link: 'https://indianmentalhealthfoundation.org'
        },
        {
          name: 'Mpower Mental Health Initiative',
          description: 'Mental health awareness and treatment',
          link: 'https://mpowerminds.com'
        },
        {
          name: 'Sangath',
          description: 'Mental health research and treatment organization',
          link: 'https://sangath.in'
        }
      ]
    },
    {
      title: 'Specialized Support',
      resources: [
        {
          name: 'Parivarthan Counseling Center',
          description: 'Professional counseling and therapy services',
          link: 'https://parivarthan.org'
        },
        {
          name: 'Heart It Out',
          description: 'Mental wellness services across India',
          link: 'https://heartitout.in'
        },
        {
          name: '1to1help',
          description: 'Employee mental health and wellness programs',
          link: 'https://www.1to1help.net'
        },
        {
          name: 'Manas Foundation',
          description: 'Mental health services and advocacy',
          link: 'https://manas.org.in'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Mental Health Resources - India
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Helpful resources and support services for mental wellness in India
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
          Emergency Help - India
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
          If you're in crisis or experiencing thoughts of suicide, please reach out immediately to these resources:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Vandrevala Foundation Helpline
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              1860 2662 345 / 1800 2333 330
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              iCall Psychosocial Helpline
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              9152987821
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              National Tele Mental Health Program
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              14416 / 1-800-891-4416
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Aasra Suicide Prevention
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xl transition-colors duration-300">
              9820466726
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;