// File: client/src/pages/Profile.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock data for user profile
  const [userData, setUserData] = useState({
    username: currentUser?.username || 'user123',
    email: currentUser?.email || 'user@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    bio: 'Mental health advocate and mindfulness practitioner',
    phone: '(555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  });


  // Mock data for journal entries
  const journalEntries = [
    {
      id: 1,
      date: '2023-11-10',
      mood: 'happy',
      title: 'Great day today',
      content: 'Had a productive day at work and enjoyed a nice walk in the park.'
    },
    {
      id: 2,
      date: '2023-11-09',
      mood: 'neutral',
      title: 'Regular day',
      content: 'Nothing special happened today. Just a regular work day.'
    },
    {
      id: 3,
      date: '2023-11-08',
      mood: 'sad',
      title: 'Feeling down',
      content: 'Struggled with motivation today. Need to practice more self-care.'
    }
  ];

  const moodIcons = {
    happy: '😊',
    sad: '😔',
    anxious: '😰',
    angry: '😠',
    tired: '😴',
    neutral: '😐',
    excited: '🤩'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-300">
        {/* Profile Header */}
        <div className="px-6 py-8 bg-gradient-to-r from-lavender-500 to-seafoam-500">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full border-4 border-white"
              src={userData.avatar}
              alt={userData.username}
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-lavender-100">@{userData.username}</p>
              <p className="text-white mt-2">{userData.bio}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <nav className="flex -mb-px">
            {['profile', 'journal', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`ml-8 first:ml-0 py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-lavender-500 text-lavender-600 dark:text-lavender-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } transition-colors duration-200 capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      Username
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white transition-colors duration-300">
                      {userData.username}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white transition-colors duration-300">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      Phone
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white transition-colors duration-300">
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  Recent Activity
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Journal Entries
                    </span>
                    <span className="text-lg font-semibold text-lavender-600 dark:text-lavender-400 transition-colors duration-300">
                      {journalEntries.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Days Active
                    </span>
                    <span className="text-lg font-semibold text-lavender-600 dark:text-lavender-400 transition-colors duration-300">
                      23
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Current Streak
                    </span>
                    <span className="text-lg font-semibold text-lavender-600 dark:text-lavender-400 transition-colors duration-300">
                      7 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {activeTab === 'journal' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  Journal Entries
                </h2>
                <button className="bg-lavender-600 hover:bg-lavender-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  New Entry
                </button>
              </div>
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{moodIcons[entry.mood]}</span>
                        <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                          {entry.title}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      {entry.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Account Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                    Notification Preferences
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-lavender-600 focus:ring-lavender-500" defaultChecked />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-lavender-600 focus:ring-lavender-500" defaultChecked />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Journal reminders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-lavender-600 focus:ring-lavender-500" />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Community updates</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                    Privacy Settings
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-lavender-600 focus:ring-lavender-500" defaultChecked />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Anonymous forum posts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-lavender-600 focus:ring-lavender-500" />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Hide activity status</span>
                    </label>
                  </div>
                </div>

                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;