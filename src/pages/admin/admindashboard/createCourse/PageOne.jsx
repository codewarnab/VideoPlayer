import React from 'react';
import { Upload, X } from 'lucide-react';

const PageOne = ({ formData, handleImageUpload, handleDrop, handleChange, removeImage }) => {
    const inputFields = [
        { id: 'title', label: '2. Enter the Course Title', type: 'input', placeholder: 'Enter the Course Title' },
        { id: 'description', label: '3. Enter the Course Description', type: 'textarea', placeholder: 'Enter course description (max 50 words) ' },
        { id: 'prerequisites', label: '4. Enter Course Prerequisites', type: 'textarea', placeholder: "Enter any prerequisites for this course. (add ' \\n ' for line break)" },
        { id: 'playlistLink', label: '5. Enter the Playlist Link', type: 'input', placeholder: 'Enter YT Playlist Link' },
    ];

    const renderInput = (field) => {
        const commonProps = {
            id: field.id,
            name: field.id,
            placeholder: field.placeholder,
            value: formData[field.id],
            onChange: handleChange,
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
                <div className="mb-5 lg:w-[68%] bg-white">
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

            <div className="text-black p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {inputFields.map((field) => (
                        <div key={field.id} className={`flex flex-col items-start gap-1 lg:w-[90%] ${field.id === 'playlistLink' ? 'lg:pt-7' : ''}`}>
                            <label htmlFor={field.id} className="block text-lg font-medium pl-3">
                                {field.label}
                                {field.id === 'description' && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({getWordCount(formData[field.id])} words)
                                    </span>
                                )}
                            </label>
                            {renderInput(field)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageOne;
