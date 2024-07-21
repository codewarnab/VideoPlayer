import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Send } from 'lucide-react';
import HelpAnimation from './helpAnimation.json';
import Lottie from "lottie-react";

const Help = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const formFields = [
    { id: 'firstName', name: 'firstName', type: 'text', placeholder: 'Enter your first name', label: 'First Name' },
    { id: 'lastName', name: 'lastName', type: 'text', placeholder: 'Enter your last name', label: 'Last Name' },
    { id: 'email', name: 'email', type: 'email', placeholder: 'Enter your email address', label: 'Email Address' },
    { id: 'message', name: 'message', type: 'textarea', placeholder: 'What can we help you with?', label: 'Message' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/help/help-desk', formData);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-100 p-4 sm:p-6 lg:p-5">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-600">Need Some Help?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">We're here to assist you. Please fill out the form below, and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {formFields.slice(0, 2).map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1 text-start">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
              {formFields.slice(2).map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1 text-start">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex justify-center items-center bg-blue-50">
            <Lottie animationData={HelpAnimation} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;