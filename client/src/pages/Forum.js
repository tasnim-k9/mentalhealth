import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Add this import

const Forum = () => {
  const { currentUser } = useAuth(); // This should work now
  const [posts] = useState([
    {
      id: 1,
      title: 'Welcome to our Community Forum',
      content: 'This is a safe space to share experiences and support each other. Please be kind and respectful to all members.',
      author: 'Admin',
      replies: 3,
      views: 150,
      date: '2023-10-20',
      category: 'General'
    },
    {
      id: 2,
      title: 'Tips for managing anxiety',
      content: 'What techniques have worked for you when dealing with anxiety? I find breathing exercises helpful.',
      author: 'CommunityMember',
      replies: 12,
      views: 245,
      date: '2023-10-19',
      category: 'Anxiety'
    },
    {
      id: 3,
      title: 'Dealing with seasonal depression',
      content: 'As the days get shorter, I always struggle with my mood. Any advice for seasonal affective disorder?',
      author: 'AnonymousUser',
      replies: 8,
      views: 189,
      date: '2023-10-18',
      category: 'Depression'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Community Forum
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Share experiences, ask questions, and support each other
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Discussions</h2>
            <button className="px-4 py-2 bg-lavender-600 hover:bg-lavender-700 text-white rounded-md text-sm font-medium transition-colors duration-200">
              New Post
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mr-3">
                      {post.title}
                    </h3>
                    <span className="bg-lavender-100 dark:bg-lavender-900/30 text-lavender-800 dark:text-lavender-200 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.replies} replies</span>
                    <span className="mx-2">•</span>
                    <span>{post.views} views</span>
                  </div>
                </div>
                <button className="ml-4 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Forum Guidelines
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 text-sm list-disc list-inside space-y-1">
          <li>Be respectful and kind to other members</li>
          <li>Keep discussions focused on mental health support</li>
          <li>Respect everyone's privacy and anonymity</li>
          <li>Report any inappropriate content to moderators</li>
          <li>Remember this is a supportive community, not professional therapy</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Full forum functionality with posting and replies will be available soon. 
          This is a demo version showing how the forum will look.
        </p>
      </div>
    </div>
  );
};

export default Forum;