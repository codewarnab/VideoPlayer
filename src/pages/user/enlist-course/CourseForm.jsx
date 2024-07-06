import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../utils/user/imageUploader';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        imageUrl: "",//
        playlistLink: "",
        title: "",
        description: "",
        requirements: "",
        prerequisites: "",
        category: null,//
        subCategory: null,//
        subSubCategory: null,//
        difficultyLevel: "",//
        language: "",//
        tags: [],//
        expectedtimeFinishNumber: "" //
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        imageUrl: "",
        playlistLink: "",
        title: "",
        description: "",
        requirements: "",
        prerequisites: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        difficultyLevel: "",
        language: "",
        tags: "",
        expectedtimeFinish: ""
    });

    const [currentPage, setCurrentPage] = useState(2);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/category/getCategory');
                if (response.data.success) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error("Failed to fetch categories. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

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
        setErrors("");
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'expectedtimeFinishNumber' && (value <= 0 )) {
            setErrors(prev => ({ ...prev, [name]: "Value must be greater than zero" }));
            return;
        }
    };

    const handleSelectChange = (name, selectedOption) => {
        setErrors("");
        if (name === 'category') {
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption,
                subCategory: null,
                subSubCategory: null
            }));
        } else if (name === 'subCategory') {
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption,
                subSubCategory: null
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption
            }));
        }
    };


    const handleNextPage = () => {
        if (validatePage(currentPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

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
                    pageErrors.title = "Course Title is required";
                }
                if (!pageData.description) {
                    pageErrors.description = "Course Description is required";
                }
                if (!pageData.playlistLink) {
                    pageErrors.playlistLink = "Playlist Link is required";
                } else if (!playlistLinkPattern.test(formData.playlistLink)) {
                    pageErrors.playlistLink = "Invalid playlist link";
                }
                break;
            case 2:
                if (!pageData.requirements) {
                    pageErrors.requirements = "Requirements are required";
                }
                if (!pageData.subCategory || !pageData.subSubCategory || !pageData.category){
                    pageErrors.category = "All category field must be filled ";
                }
                if (!pageData.prerequisites){
                    pageErrors.prerequisites = "Even if no prereuisites needed explain that you will teach everything from scratch "
                }
                if(!pageData.difficultyLevel){
                    pageErrors.difficultyLevel = "please select difficulty level "
                }
                if (!pageData.language){
                    pageErrors.language = "please select course language "
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
        return Object.values(pageErrors).every((error) => error === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePage(currentPage)) {
            console.log(formData);
            // Handle form submission logic here
            toast.success("Form submitted successfully!");
        } else {
            toast.error("Please fill in all required fields correctly.");
        }
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
                    handleSelectChange={handleSelectChange}
                    categories={categories}
                    isLoading={isLoading}
                />
            );
            break;
        default:
            break;
    }

    return (
        <div className="lg:min-h-[33rem] w-full bg-gray-100 p-8 flex flex-col justify-between">
            <form onSubmit={handleSubmit}>
                {currentPageComponent}

                <div className='flex w-full justify-evenly mt-6'>
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
            </form>
        </div>
    );
};

export default CourseForm;