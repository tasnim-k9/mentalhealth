// File: client/src/components/Card.js
import React from 'react';

const Card = ({ title, description, icon, actionText, actionLink, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300 ${className}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate transition-colors duration-300">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                {description}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {actionText && actionLink && (
        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3 transition-colors duration-300">
          <div className="text-sm">
            <a
              href={actionLink}
              className="font-medium text-lavender-600 dark:text-lavender-400 hover:text-lavender-500 dark:hover:text-lavender-300 transition-colors duration-200"
            >
              {actionText}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;