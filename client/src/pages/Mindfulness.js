// File: client/src/pages/Mindfulness.js
import React, { useState, useEffect } from 'react';

const Mindfulness = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes
  const [meditationPlayer, setMeditationPlayer] = useState(null);

  useEffect(() => {
    let breathingInterval;
    if (breathingActive) {
      breathingInterval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') {
            return 'hold';
          } else if (prev === 'hold') {
            return 'exhale';
          } else {
            setBreathCount(prev => prev + 1);
            return 'inhale';
          }
        });
      }, 4000); // 4 seconds for each phase
    }

    return () => clearInterval(breathingInterval);
  }, [breathingActive]);

  useEffect(() => {
    let timerInterval;
    if (timerActive && timerSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }

    return () => clearInterval(timerInterval);
  }, [timerActive, timerSeconds]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathPhase('inhale');
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const meditations = [
    {
      id: 1,
      title: '5-Minute Breathing Meditation',
      duration: '5 min',
      description: 'A short guided meditation to center yourself and focus on your breath.',
      url: '#'
    },
    {
      id: 2,
      title: 'Body Scan Relaxation',
      duration: '10 min',
      description: 'Progressive relaxation technique to release tension throughout your body.',
      url: '#'
    },
    {
      id: 3,
      title: 'Loving-Kindness Practice',
      duration: '15 min',
      description: 'Cultivate compassion for yourself and others with this traditional practice.',
      url: '#'
    },
    {
      id: 4,
      title: 'Sleep Meditation',
      duration: '20 min',
      description: 'Gentle guidance to help you relax and prepare for restful sleep.',
      url: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300">
          Mindfulness Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Practices and exercises to help you stay present and reduce stress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Breathing Exercise */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Breathing Exercise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Follow the 4-4-4 breathing pattern: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds.
          </p>
          
          <div className="text-center mb-6">
            <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center text-2xl font-semibold transition-all duration-1000 ${
              breathPhase === 'inhale' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 scale-110' 
                : breathPhase === 'hold'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 scale-100'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 scale-90'
            }`}>
              {breathPhase === 'inhale' && 'Breathe In'}
              {breathPhase === 'hold' && 'Hold'}
              {breathPhase === 'exhale' && 'Breathe Out'}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Breath count: {breathCount}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {!breathingActive ? (
              <button
                onClick={startBreathing}
                className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
              >
                Start Breathing
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Meditation Timer */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Meditation Timer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Set a timer for your meditation practice. Start with 5 minutes and gradually increase.
          </p>

          <div className="text-center mb-6">
            <div className="text-5xl font-mono font-bold text-lavender-600 dark:text-lavender-400 mb-4 transition-colors duration-300">
              {formatTime(timerSeconds)}
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              <button
                onClick={() => setTimerSeconds(300)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md transition-colors duration-200"
              >
                5 min
              </button>
              <button
                onClick={() => setTimerSeconds(600)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md transition-colors duration-200"
              >
                10 min
              </button>
              <button
                onClick={() => setTimerSeconds(900)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md transition-colors duration-200"
              >
                15 min
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {!timerActive ? (
              <button
                onClick={startTimer}
                className="bg-lavender-600 hover:bg-lavender-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
              >
                Start Timer
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
              >
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Guided Meditations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Guided Meditations
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {meditations.map((meditation) => (
            <div key={meditation.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    {meditation.title}
                  </h3>
                  <span className="text-sm text-lavender-600 dark:text-lavender-400 transition-colors duration-300">
                    {meditation.duration}
                  </span>
                </div>
                <button className="bg-lavender-600 hover:bg-lavender-700 text-white p-2 rounded-full transition-colors duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                {meditation.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mindfulness Tips */}
      <div className="mt-16 bg-lavender-50 dark:bg-lavender-900/20 rounded-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Mindfulness Tips
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md transition-colors duration-300">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Start Small</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Begin with just 2-5 minutes daily and gradually increase.</p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md transition-colors duration-300">
              <span className="text-2xl">🌅</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Morning Practice</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Meditate in the morning to set a positive tone for your day.</p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md transition-colors duration-300">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Minimize Distractions</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Turn off notifications and find a quiet space.</p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md transition-colors duration-300">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Be Kind</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">Don't judge wandering thoughts—gently return to your focus.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mindfulness;