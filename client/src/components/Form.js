// File: client/src/components/Form.js
import React, { useState } from 'react';

const Form = ({ fields, onSubmit, submitText, title, description }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
      {title && (
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
          {description}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={field.rows || 3}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lavender-500 focus:border-lavender-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-200"
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lavender-500 focus:border-lavender-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-200"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lavender-600 hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-500 transition-colors duration-200"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;