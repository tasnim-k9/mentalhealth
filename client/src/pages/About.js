
import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Psychologist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Specialized in cognitive behavioral therapy with over 15 years of experience.'
    },
    {
      name: 'Michael Chen',
      role: 'Licensed Therapist',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Focuses on mindfulness-based stress reduction and family therapy.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Mental Health Counselor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Passionate about helping young adults navigate life transitions and anxiety.'
    }
  ];

  const values = [
    {
      name: 'Compassion',
      description: 'We approach every interaction with empathy and understanding, creating a safe space for healing.'
    },
    {
      name: 'Accessibility',
      description: 'We believe mental health support should be available to everyone, regardless of their circumstances.'
    },
    {
      name: 'Innovation',
      description: 'We continuously evolve our tools and approaches based on the latest research and user feedback.'
    },
    {
      name: 'Community',
      description: 'We foster connection and support among our users, reducing the isolation that often accompanies mental health challenges.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl transition-colors duration-300">
          About <span className="text-lavender-600 dark:text-lavender-400 transition-colors duration-300">MindfulSpace</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          We're on a mission to make mental health support accessible, affordable, and effective for everyone.
        </p>
      </div>

      {/* Story Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Our Story</h2>
            <p className="text-lg text-gray-500 dark:text-gray-300 mb-4 transition-colors duration-300">
              MindfulSpace was founded in 2020 by a team of mental health professionals and technology experts who saw the growing need for accessible mental health resources.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-300 mb-4 transition-colors duration-300">
              We recognized that while many people struggle with mental health challenges, traditional support systems often have barriers like cost, availability, and stigma that prevent people from getting help.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-300 transition-colors duration-300">
              Our platform combines evidence-based therapeutic approaches with modern technology to create tools that support mental wellness at scale.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12 transition-colors duration-300">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={value.name} className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-lavender-100 dark:bg-lavender-900 text-lavender-600 dark:text-lavender-400 mx-auto mb-4 transition-colors duration-300">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">{value.name}</h3>
              <p className="text-base text-gray-500 dark:text-gray-300 transition-colors duration-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12 transition-colors duration-300">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((person) => (
            <div key={person.name} className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
                src={person.image}
                alt={person.name}
              />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">{person.name}</h3>
              <p className="text-lavender-600 dark:text-lavender-400 mb-3 transition-colors duration-300">{person.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 transition-colors duration-300">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;