import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Forum = () => {
  const { currentUser } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General',
    anonymous: false
  });
  const [replyContent, setReplyContent] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [error, setError] = useState('');

  // Load forum posts or single post
  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    } else {
      fetchPosts();
    }
  }, [postId]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/forum/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Failed to load posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Cannot connect to server. Please check if backend is running on port 3001.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forum/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCurrentPost(data.data);
        // Track view
        await trackView(id);
      } else {
        setError('Failed to load post');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Cannot load post. Make sure backend server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (id) => {
    try {
      const response = await fetch(`/api/forum/posts/${id}/view`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('View tracked. Total views:', data.views);
      } else {
        console.error('Failed to track view');
      }
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to create a post');
        return;
      }

      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          anonymous: newPost.anonymous
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setPosts([data.data, ...posts]);
        setNewPost({ title: '', content: '', category: 'General', anonymous: false });
        setShowNewPostForm(false);
        setError('');
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    try {
      // Check if user is logged in
      if (!currentUser) {
        setError('Please log in to reply to posts');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        return;
      }

      const response = await fetch(`/api/forum/posts/${postId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: replyContent,
          anonymous: replyAnonymous
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setCurrentPost(data.data);
        setReplyContent('');
        setReplyAnonymous(false);
        setError('');
        console.log('Reply posted successfully');
      } else {
        setError(data.message || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      setError('Network error. Please check if backend server is running on port 3001.');
    }
  };

  const categories = ['General', 'Anxiety', 'Depression', 'Stress', 'Relationships', 'Self-Care'];

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Display error message if exists
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => setError('')}
            className="absolute top-0 right-0 py-1 px-2"
          >
            ×
          </button>
        </div>
        <button
          onClick={() => navigate('/forum')}
          className="mt-4 bg-lavender-600 hover:bg-lavender-700 text-white px-4 py-2 rounded"
        >
          Back to Forum
        </button>
      </div>
    );
  }

  // If viewing a single post
  if (postId && currentPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/forum')}
          className="mb-6 text-lavender-600 hover:text-lavender-700 flex items-center"
        >
          ← Back to Forum
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-3">
            <span className="bg-lavender-100 dark:bg-lavender-900 text-lavender-800 dark:text-lavender-200 px-3 py-1 rounded-full text-sm">
              {currentPost.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(currentPost.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-4">{currentPost.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">{currentPost.content}</p>

          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-sm text-gray-500">
              By {currentPost.anonymous ? 'Anonymous' : (currentPost.author?.username || 'Unknown')}
            </span>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>{currentPost.replyCount || currentPost.replies?.length || 0} replies</span>
              <span>{currentPost.views || 0} views</span>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Replies</h2>
          
          {currentPost.replies && currentPost.replies.length > 0 ? (
            <div className="space-y-4">
              {currentPost.replies.map((reply, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{reply.content}</p>
                  <div className="text-sm text-gray-500">
                    By {reply.anonymous ? 'Anonymous' : (reply.author?.username || 'Unknown')} •{' '}
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No replies yet. Be the first to respond!</p>
          )}
        </div>

        {/* Reply Form */}
        {currentUser ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
            <form onSubmit={handleAddReply}>
              <div className="mb-4">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                  required
                  placeholder="Write your reply..."
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={replyAnonymous}
                    onChange={(e) => setReplyAnonymous(e.target.checked)}
                    className="mr-2"
                  />
                  Post anonymously
                </label>
              </div>

              <button
                type="submit"
                className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-2 rounded-lg"
              >
                Post Reply
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <p>Please log in to reply to this post.</p>
          </div>
        )}
      </div>
    );
  }

  // Main forum page with all posts
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Community Forum</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Share experiences, ask questions, and support each other
        </p>
      </div>

      {/* New Post Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {showNewPostForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <form onSubmit={handleCreatePost}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
                placeholder="Post title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={5}
                className="w-full p-3 border rounded-lg"
                required
                placeholder="Share your thoughts..."
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPost.anonymous}
                  onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked })}
                  className="mr-2"
                />
                Post anonymously
              </label>
            </div>

            <button
              type="submit"
              className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-2 rounded-lg"
            >
              Create Post
            </button>
          </form>
        </div>
      )}

      {/* Forum Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
          
          {posts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No discussions yet</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Be the first to start a discussion! Click "New Post" to share your thoughts.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div 
                  key={post._id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/forum/${post._id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-lavender-100 dark:bg-lavender-900 text-lavender-800 dark:text-lavender-200 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.anonymous ? 'Anonymous' : (post.author?.username || 'Unknown')}
                    </span>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>{post.replyCount || post.replies?.length || 0} replies</span>
                      <span>{post.views || 0} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Forum Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Be respectful and kind to other members</li>
              <li>• Keep discussions supportive and constructive</li>
              <li>• Respect privacy and confidentiality</li>
              <li>• No medical advice - share experiences, not prescriptions</li>
              <li>• Report any inappropriate content to moderators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;