import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const PageOne = ({ formData, handleImageUpload, handleDrop, handleChange, removeImage, setPage }) => {
    const [errors, setErrors] = useState({});

    const inputFields = [
        { id: 'title', label: '2. Enter the Course Title', type: 'input', placeholder: 'Enter the Course Title', required: true, error: "Course Title is required" },
        { id: 'description', label: '3. Enter the Course Description', type: 'textarea', placeholder: 'Enter course description (max 50 words)', required: true, error: "Course Description is required", minWords: 40, maxWords: 50 },
        { id: 'prerequisites', label: '4. Enter Course Prerequisites', type: 'textarea', placeholder: "Enter any prerequisites for this course. (add ' \\n ' for line break)", required: false, error: "Course Prerequisites is required" },
        { id: 'playlistLink', label: '5. Enter the Playlist Link', type: 'input', placeholder: 'Enter YT Playlist Link', required: true, error: "Playlist Link is required" },
    ];

    const playlistLinkPattern = /^https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[\w-]+(?:&[\w-]+(=[\w-]*)?)*$/;

    const handleNextPage = () => {
        const newErrors = {};
        inputFields.forEach(field => {
            if (field.required && !formData[field.id]) {
                newErrors[field.id] = `${field.error}`;
            }
        });

        // Custom validation for prerequisites field
        if (!formData.prerequisites) {
            newErrors.prerequisites = "Course Prerequisites is required";
        }

        if (!formData.imageUrl) {
            newErrors.imageUrl = 'Upload Course Thumbnail is required';
        }

        // Validate playlist link format
        if (formData.playlistLink && !playlistLinkPattern.test(formData.playlistLink)) {
            newErrors.playlistLink = "Not a valid Playlist Link";
        }

        // Validate description word count
        const descriptionWords = getWordCount(formData.description);
        if (formData.description) {
            if (descriptionWords < inputFields[1].minWords || descriptionWords > inputFields[1].maxWords) {
                newErrors.description = `Description must be between ${inputFields[1].minWords} and ${inputFields[1].maxWords} words`;
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setPage(prev => prev + 1);
        }
    };

    const handleInputChange = (e) => {
        handleChange(e);
        setErrors(prevErrors => ({ ...prevErrors, [e.target.id]: '' }));
    };

    const handleImageUploadChange = (e) => {
        handleImageUpload(e);
        setErrors(prevErrors => ({ ...prevErrors, imageUrl: '' }));
    };

    const renderInput = (field) => {
        const commonProps = {
            id: field.id,
            name: field.id,
            placeholder: field.placeholder,
            value: formData[field.id],
            onChange: handleInputChange,
            className: `p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans w-full ${field.type === 'textarea' ? 'resize-y' : ''}`,
        };

        if (field.type === 'textarea') {
            return (
                <textarea
                    {...commonProps}
                    rows="3"
                    style={{ minHeight: '72px', maxHeight: `${3 * 24}px`, overflowY: 'auto' }}
                />
            );
        }

        return <input type="text" {...commonProps} />;
    };

    const getWordCount = (text) => {
        return text ? text.trim().split(/\s+/).length : 0;
    };

    return (
        <div>
            <div className='flex flex-col items-center'>
                <h2 className="lg:text-2xl text-lg font-semibold text-gray-700 mb-3">
                    1. Upload Course Thumbnail
                </h2>
                <div className="mb-5 lg:w-[68%] bg-white relative">
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
                        onChange={handleImageUploadChange}
                        className="hidden"
                    />
                    {errors.imageUrl && <p className="text-red-500 text-sm mt-2 absolute left-0 -bottom-6">{errors.imageUrl}</p>}
                </div>
            </div>

            <div className="text-black p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {inputFields.map((field) => (
                        <div key={field.id} className={`flex flex-col items-start gap-1 lg:w-[90%] ${field.id === 'playlistLink' ? 'lg:pt-7' : ''} relative pb-6`}>
                            <label htmlFor={field.id} className="block text-lg font-medium pl-3">
                                {field.label}
                                {field.id === 'description' && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({getWordCount(formData[field.id])} words)
                                    </span>
                                )}
                            </label>
                            {renderInput(field)}
                            {errors[field.id] && (
                                <p
                                    className={`text-red-500 text-sm absolute left-3 -bottom-1 ${field.id === 'title' ? 'lg:bottom-6' : ''}`}
                                >
                                    {errors[field.id]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="lg:w-[37%] w-[70%] text-xl font-bold bg-blue-700 text-white py-2 mt-4 lg:mb-0 mb-3 rounded-md hover:bg-blue-800 transition duration-300"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PageOne;
