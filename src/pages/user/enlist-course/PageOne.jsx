import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const PageOne = ({ errors, setErrors, handleImageUpload, handleDrop, removeImage, formData, handleChange, setCurrentPage }) => {
    const [descriptionWordCount, setDescriptionWordCount] = useState(0);

    useEffect(() => {
        setDescriptionWordCount(formData.description.split(/\s+/).filter(word => word.length > 0).length);
    }, [formData.description]);

    const handleNextPage = () => {
        if (isPageOneValid()) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const isPageOneValid = () => {
        const pageData = formData;
        const pageErrors = {};
        const playlistLinkPattern = /^https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[\w-]+(?:&[\w-]+(=[\w-]*)?)*$/;
        if (!pageData.imageUrl) {
            pageErrors.imageUrl = "Image is required.";
        }
        if (!pageData.title) {
            pageErrors.title = "Course Title is required";
        }
        if (!pageData.description) {
            pageErrors.description = "Course Description is required";
        } else if (descriptionWordCount < 30 || descriptionWordCount > 50) {
            pageErrors.description = "Description must be between 30 and 50 words";
        }
        if (!pageData.playlistLink) {
            pageErrors.playlistLink = "Playlist Link is required";
        } else if (!playlistLinkPattern.test(formData.playlistLink)) {
            pageErrors.playlistLink = "Invalid playlist link";
        }
        if (!pageData.numProjectsIncluded) {
            pageErrors.numProjectsIncluded = "Enter zero if no projects included.";
        } else if (pageData.numProjectsIncluded && pageData.numProjectsIncluded < 0) {
            pageErrors.numProjectsIncluded = "Number of projects must be greater than or equal to zero.";
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
        return Object.values(pageErrors).every((error) => error === "");
    };

    const inputFields = [
        { id: 'title', index: 2, label: '. Course Title', placeholder: 'Enter title of the course', type: 'text', error: errors.title },
        { id: 'playlistLink', index: 3, label: '. Playlist Link', placeholder: 'Enter link of your YouTube playlist', type: 'text', error: errors.playlistLink },
        { id: 'description', index: 4, label: '. Description', placeholder: 'Enter a  description of your course', type: 'textarea', error: errors.description },
        { id: 'numProjectsIncluded', index: 5, label: '. Number of Projects Included', placeholder: 'Enter number of projects included in the course', type: 'number', error: errors.numProjectsIncluded },
    ];

    return (
        <>
            <div className='w-full'>
                <h1 className="lg:text-4xl md:text-3xl text-xl font-bold text-gray-800 mb-8">
                    Enter Your Course/Playlist Details
                </h1>
                <div className='flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0'>
                    <div className="bg-white flex justify-center flex-col rounded-lg shadow-md p-8 w-full lg:w-[48%] relative">
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
                        <p className='text-red-400 absolute bottom-5 lg:left-[39%] left-[30%]'>{errors.imageUrl ? `${errors.imageUrl}` : ''}</p>
                    </div>

                    <div className='bg-white rounded-lg text-start shadow-md p-8 w-full lg:w-[48%]'>
                        <div className="flex flex-col gap-1">
                            {inputFields.map(field => (
                                <div key={field.id} className='items-start mb-6'>
                                    <div className='flex items-center gap-3'>
                                        <label htmlFor={field.id} className="block text-lg font-medium text-black">{field.index}{field.label}</label> { field.type === 'textarea' &&
                                            <p className="text-sm text-gray-600">word count: {descriptionWordCount}</p>
                                        }
                                    </div>
                                    {field.type === 'textarea' ? (
                                        <>
                                            <textarea
                                                id={field.id}
                                                name={field.id}
                                                placeholder={field.placeholder}
                                                rows="3"
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                className={`p-2 border ${field.error ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                            ></textarea>

                                        </>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            name={field.id}
                                            placeholder={field.placeholder}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            className={`p-2 border ${field.error ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                        />
                                    )}
                                    {field.error && <p className='absolute text-red-400 text-sm'>{field.error}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <button
                        type="button"
                        className="lg:w-[30%] w-[40%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default PageOne;
