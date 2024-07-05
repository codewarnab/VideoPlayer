import React from 'react';
import { Upload, X } from 'lucide-react';

const PageOne = ({ handleImageUpload, handleDrop, removeImage, formData, handleChange }) => {
    // Define your input fields configuration
    const inputFields = [
        { id: 'title', label: 'Course Title', placeholder: 'Enter title of the course', type: 'text' },
        { id: 'playlistLink', label: 'Playlist Link', placeholder: 'Enter link of your YouTube playlist', type: 'text' },
        { id: 'description', label: 'Description', placeholder: 'Enter a small description of your course', type: 'textarea' },
        // Add more fields as needed
    ];

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-8 w-full lg:w-[48%]">
                <h2 className="lg:text-2xl text-lg font-semibold text-gray-700 mb-6">
                    1. Upload Course Thumbnail
                </h2>
                <div className="mb-8 mt-3">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {formData.imageUrl ? (
                            <div className="relative">
                                <img src={formData.imageUrl} alt="Uploaded thumbnail" className="w-full h-48 object-cover rounded-lg" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48">
                                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                                <p className="text-gray-500">Click or drag image here to upload</p>
                            </div>
                        )}
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            </div>

            <div className='bg-white rounded-lg text-start shadow-md p-8 w-full lg:w-[48%]'>
                {/* Render dynamic form fields */}
                <div className="flex flex-col gap-1">
                    {inputFields.map(field => (
                        <div key={field.id} className='items-start mb-6'>
                            <label htmlFor={field.id} className="block text-lg font-medium text-black">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    id={field.id}
                                    name={field.id}
                                    placeholder={field.placeholder}
                                    rows="3"
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                                ></textarea>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.id}
                                    name={field.id}
                                    placeholder={field.placeholder}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PageOne;
