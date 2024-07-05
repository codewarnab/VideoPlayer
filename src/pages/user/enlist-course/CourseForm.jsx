import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../../utils/user/imageUploader';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        imageUrl: "", // done 
        playlistLink: "", // done 
        title: "", // done 
        description: "", // done 
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
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        imageUrl: "",
        playlistLink: "",
        title: "",
        description: "",
        requirements: [],
        prerequisties: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        difficultyLevel: "",
        language: "",
        tags: [],
        expectedtimeFinish: ""
    })
    const [currentPage, setCurrentPage] = useState(2);

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
        setErrors("")
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleNextPage = () => {
        if (validatePage(currentPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }

    const validatePage = (page) => {
        const pageData = formData;
        const pageErrors = {};
        switch (page) {
            case 1:
                const playlistLinkPattern = /^https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[\w-]+(?:&[\w-]+(=[\w-]*)?)*$/;
                if (!pageData.imageUrl) {
                    pageErrors.imageUrl = "Image is required.";
                }
                if (!pageData.title) {
                    pageErrors.title = "Course Title is required ";
                }
                if (!pageData.description) {
                    pageErrors.description = "Course Description is required ";
                }
                if (!pageData.playlistLink) {
                    pageErrors.playlistLink = "playlist Link is required ";
                }
                else if (!playlistLinkPattern.test(formData.playlistLink)) {
                    pageErrors.playlistLink = "Invalid playlist link";
                }
                break;

            default:
                break;

        }
        setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
        return Object.values(pageErrors).every((error) => error === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    let currentPageComponent;
    switch (currentPage) {
        case 1:
            currentPageComponent = (
                   
                    <PageOne
                        errors={errors}
                        handleImageUpload={handleImageUpload}
                        handleDrop={handleDrop}
                        removeImage={removeImage}
                        formData={formData}
                        handleChange={handleChange}
                        handleNextPage={handleNextPage}
                    />
            );
            break;
        case 2:
            currentPageComponent = (
                <PageTwo
                    errors={errors}
                    formData={formData}
                    handleChange={handleChange}
                />
            );
            break;
        default:
            break;
    }

    return (
        <div className="lg:min-h-[40rem] w-full bg-gray-100 p-8 flex flex-col justify-between">
            {currentPageComponent}

            {currentPage > 1 && (
                <div className='flex w-full justify-evenly'>
                    <button
                        type="button"
                        className="lg:w-[20%] w-[40%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300"
                        onClick={() => setCurrentPage(prevState => prevState - 1)}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="lg:w-[20%] w-[40%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
};

export default CourseForm;
