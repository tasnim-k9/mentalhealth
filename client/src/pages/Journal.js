import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load entries from backend on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/journals`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEntries(data.data || []); // Changed from data.journals to data.data
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      setEntries([]); // Set empty array instead of sample data
    } finally {
      setLoading(false);
    }
  };

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    title: '',
    content: '',
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');

  const moodOptions = [
    { value: 'happy', label: '😊 Happy', color: 'bg-green-100 text-green-800' },
    { value: 'sad', label: '😔 Sad', color: 'bg-blue-100 text-blue-800' },
    { value: 'anxious', label: '😰 Anxious', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'angry', label: '😠 Angry', color: 'bg-red-100 text-red-800' },
    { value: 'tired', label: '😴 Tired', color: 'bg-gray-100 text-gray-800' },
    { value: 'neutral', label: '😐 Neutral', color: 'bg-purple-100 text-purple-800' },
    { value: 'excited', label: '🤩 Excited', color: 'bg-pink-100 text-pink-800' }
  ];

  // Generate mood chart data from user's actual entries
  const moodData = entries.map(entry => ({
    date: new Date(entry.createdAt || entry.date).toLocaleDateString(),
    mood: {
      happy: 5,
      excited: 4,
      neutral: 3,
      tired: 2,
      sad: 2,
      anxious: 2,
      angry: 1
    }[entry.mood] || 3 // Default to neutral if mood not found
  })).reverse(); // Show oldest to newest

  const handleAddTag = () => {
    if (currentTag.trim() && !newEntry.tags.includes(currentTag.trim())) {
      setNewEntry({
        ...newEntry,
        tags: [...newEntry.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newEntry.title,
          content: newEntry.content,
          mood: newEntry.mood,
          tags: newEntry.tags,
          date: newEntry.date
        })
      });

      if (response.ok) {
        const data = await response.json();
        setEntries([data.data, ...entries]); // Changed from data.journal to data.data
        setNewEntry({
          date: new Date().toISOString().split('T')[0],
          mood: 'neutral',
          title: '',
          content: '',
          tags: []
        });
        // Reload entries to refresh the chart
        loadEntries();
      } else {
        alert('Failed to save entry. Please try again.');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Mental Health Journal
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Track your moods, thoughts, and progress over time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Entry Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              New Journal Entry
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Date
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  How are you feeling?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setNewEntry({ ...newEntry, mood: mood.value })}
                      className={`p-2 rounded-md text-center transition-colors duration-200 ${
                        newEntry.mood === mood.value
                          ? 'ring-2 ring-lavender-500 ' + mood.color
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className="text-xl">{mood.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Title
                </label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="Brief title for your entry"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Journal Entry
                </label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="Write about your day, your feelings, or anything on your mind..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-lavender-600 hover:bg-lavender-700 text-white px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newEntry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-lavender-100 dark:bg-lavender-900/30 text-lavender-800 dark:text-lavender-200 transition-colors duration-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-lavender-600 hover:bg-lavender-700 disabled:bg-lavender-400 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 disabled:scale-100"
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Entry'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Journal Entries and Mood Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mood Chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Mood Tracker
            </h2>
            {moodData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#7c3aed' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No mood data yet. Start journaling to see your mood chart!</p>
              </div>
            )}
          </div>

          {/* Journal Entries List */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Recent Entries
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lavender-600"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Loading your entries...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📔</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No entries yet</h3>
                    <p className="text-gray-600 dark:text-gray-300">Start by creating your first journal entry!</p>
                  </div>
                ) : (
                  entries.map((entry, index) => (
                    entry && ( // ← NULL CHECK ADDED HERE
                      <div 
                        key={entry._id || entry.id} 
                        className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards'
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3 animate-pulse">
                              {entry && moodOptions.find(m => m.value === entry.mood)?.label.split(' ')[0]}
                            </span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                              {entry.title}
                            </h3>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            {new Date(entry.date || entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300 leading-relaxed">
                          {entry.content}
                        </p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag, tagIndex) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-lavender-100 dark:bg-lavender-900/30 text-lavender-800 dark:text-lavender-200 transition-all duration-300 hover:scale-105"
                                style={{
                                  animationDelay: `${(index * 100) + (tagIndex * 50)}ms`,
                                  animation: 'fadeIn 0.3s ease-out forwards'
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) // ← NULL CHECK CLOSED HERE
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;