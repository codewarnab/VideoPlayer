import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../utils/user/imageUploader';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import isValidPhoneNumber from '../../../utils/shared/isValidPhoneNumber';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        email: "random@gmail.com",
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
        contactNumber: "",
        numProjectsIncluded:"",
        expectedtimeFinishNumber: "",//,
        expectedtimeFinishUnit: "",
        isEmployeeUser:false
    });

    const [errors, setErrors] = useState({
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
        expectedtimeFinishNumber: "",
        expectedtimeFinishUnit: "",
        numProjectsIncluded:""

    });
    const [currentPage, setCurrentPage] = useState(1);
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
        if (name === 'expectedtimeFinishNumber' && (value <= 0)) {
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


    const validateSecondPage = () => {
        const pageData = formData;
        const pageErrors = {};
        if (!pageData.requirements) {
            pageErrors.requirements = "Requirements are required";
        }
        if (!pageData.subCategory || !pageData.subSubCategory || !pageData.category) {
            pageErrors.category = "All category field must be filled ";
        }
        if (!pageData.prerequisites) {
            pageErrors.prerequisites = "Even if no prereuisites needed explain that you will teach everything from scratch "
        }
        if (!pageData.difficultyLevel) {
            pageErrors.difficultyLevel = "please select difficulty level "
        }
        if (!pageData.language) {
            pageErrors.language = "please select course language "
        }
        if (!isValidPhoneNumber(pageData.contactNumber)) {
            pageErrors.contactNumber = "Enter a Valid phone number "
        }
        if (!pageData.expectedtimeFinishNumber) {
            pageErrors.expectedtimeFinishNumber = "enter a number "
        }
        else if (!pageData.expectedtimeFinishUnit) {
            pageErrors.expectedtimeFinishNumber = "please select unit  "
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
        return Object.values(pageErrors).every((error) => error === "");
    };


    const handleSubmit = async(e) => {
        e.preventDefault();


        if (validateSecondPage(currentPage)) {
            try{
                console.log(formData);
                toast.success("Form submitted successfully!");
                const response = await axios.post("/course/enlist-request",{
                    name:"Arnab",
                    email:formData.email,
                    imageUrl:formData.imageUrl,
                    playlistLink:formData.playlistLink,
                    title:formData.title,
                    description:formData.description,
                    requirements:formData.requirements,
                    prerequisites:formData.prerequisites,
                    category:formData.category,
                    subCategory:formData.subCategory,
                    subSubCategory:formData.subSubCategory,
                    difficultyLevel:formData.difficultyLevel,
                    language:formData.language,
                    contactNumber:formData.contactNumber,
                    numProjectsIncluded:formData.numProjectsIncluded,
                    expectedtimeFinishNumber:formData.expectedtimeFinishNumber,
                    expectedtimeFinishUnit:formData.expectedtimeFinishUnit["value"],
                    isEmployeeUser: formData.email.endsWith('@pcsgpl')
                    
                }) 

                console.log(response)
            } catch (error) {
                console.error(error)
            }
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
                    setErrors={setErrors}
                    handleImageUpload={handleImageUpload}
                    handleDrop={handleDrop}
                    removeImage={removeImage}
                    formData={formData}
                    handleChange={handleChange}
                    setCurrentPage={setCurrentPage}
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
                    setCurrentPage={setCurrentPage}
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
            </form>
        </div>
    );
};

export default CourseForm;