import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../../utils/user/imageUploader';
import PageOne from './PageOne';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        imageUrl: "",
        playlistLink: "",
        title: "",
        description: "",
        requirements: [],
        prerequisites: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        difficultyLevel: "",
        language: "",
        tags: [],
        expectedtimeFinish: ""
    });

    
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFile = async (file) => {
        if (file && file.type.substr(0, 5) === "image") {
            try {
                const imageUrl = await uploadImageToCloudinary(file);
                setFormData(prev => ({ ...prev, imageUrl }));
                toast.success('Image uploaded successfully');
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image. Please try again.");
            }
        } else {
            toast.error("Please select an image file.");
        }
    };

    const removeImage = () => {

        setFormData(prev => ({ ...prev, imageUrl: "" }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleNextPage =(e) =>{
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="lg:min-h-[40rem] w-full bg-gray-100 p-8">
            <h1 className="lg:text-4xl md:text-3xl text-xl font-bold text-gray-800 mb-8">
                Enter Your Course/Playlist Details
            </h1>

            <div className='flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0'>
                {/* Course Details Form Section */}
                <PageOne
                    
                    handleImageUpload={handleImageUpload}
                    handleDrop={handleDrop}
                    removeImage={removeImage}
                    formData={formData}
                    handleChange={handleChange}
                />
            </div>

            <button type="submit" className="lg:w-[30%] w-[60%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300">
                Next
            </button>
        </div>
    );
};

export default CourseForm;
