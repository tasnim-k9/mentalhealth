// File: client/src/pages/Blog.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockPosts = [
      {
        id: 1,
        title: 'Understanding Anxiety Disorders',
        excerpt: 'Learn about different types of anxiety disorders and how to recognize symptoms.',
        content: 'Full content would go here...',
        category: 'mental health',
        author: 'Dr. Sarah Johnson',
        date: '2023-10-15',
        image: 'https://resilientmindcounseling.com/wp-content/uploads/2024/02/Understanding-Anxiety-Disorders.jpg'
      },
      {
        id: 2,
        title: '5 Mindfulness Techniques for Daily Stress',
        excerpt: 'Simple practices you can incorporate into your daily routine to reduce stress.',
        content: 'Full content would go here...',
        category: 'mindfulness',
        author: 'Michael Chen',
        date: '2023-10-10',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 3,
        title: 'The Importance of Sleep for Mental Health',
        excerpt: 'How quality sleep impacts your mental wellbeing and tips for better sleep.',
        content: 'Full content would go here...',
        category: 'wellness',
        author: 'Emma Rodriguez',
        date: '2023-10-05',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 4,
        title: 'Breaking the Stigma Around Therapy',
        excerpt: 'Why seeking help is a sign of strength, not weakness.',
        content: 'Full content would go here...',
        category: 'therapy',
        author: 'Dr. Sarah Johnson',
        date: '2023-09-28',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ];

    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  const categories = ['all', 'mental health', 'mindfulness', 'wellness', 'therapy'];

  const filterPosts = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          MindfulSpace Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Insights, tips, and resources for your mental health journey
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterPosts(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-lavender-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-lavender-900/30'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Blog Posts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                <span className="bg-lavender-100 dark:bg-lavender-900/30 text-lavender-800 dark:text-lavender-200 text-xs px-2 py-1 rounded-full transition-colors duration-300">
                  {post.category}
                </span>
                <span className="mx-2">•</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  By {post.author}
                </span>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300 font-medium transition-colors duration-200"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
            No posts found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;