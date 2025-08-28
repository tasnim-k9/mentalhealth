// File: client/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '../components/Icons';


const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-lavender-600 dark:text-lavender-400 mb-4">
              Mindful<span className="text-seafoam-600 dark:text-seafoam-400">Space</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Your safe space for mental wellness. We provide resources, support, and tools to help you on your mental health journey.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span>1-800-MIND-FUL</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                <span>support@mindfulspace.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Services</Link></li>
              <li><Link to="/resources" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Resources</Link></li>
              <li><Link to="/emergency" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Emergency Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Blog</Link></li>
              <li><Link to="/forum" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Community Forum</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MindfulSpace. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">Made with</span>
            <HeartIcon className="w-4 h-4 text-pastel-pink-500" />
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">for better mental health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;