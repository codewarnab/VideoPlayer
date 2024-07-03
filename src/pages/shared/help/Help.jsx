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
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      placeholder: 'Enter your first name',
      label: 'First Name'
    },
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter your last name',
      label: 'Last Name'
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email address',
      label: 'Email Address'
    },
    {
      id: 'message',
      name: 'message',
      type: 'textarea',
      placeholder: 'What can we help you with?',
      label: 'Message'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    <div className="flex items-center max-w-svw justify-center min-h-[40rem] overflow-hidden bg-gray-100">
      <div className="w-[90%] p-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Need Some Help?</h2>
            <p className="text-gray-600 mb-8 text-start">We're here to assist you. Please fill out the form below, and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start ">
                {formFields.slice(0, 2).map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
              {formFields.slice(2).map(field => (
                <div key={field.id}className='text-start'>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1 ">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 w-[100%]  flex justify-center items-center ">
            <Lottie animationData={HelpAnimation}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
