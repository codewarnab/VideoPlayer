import React, { useState, useEffect, lazy, Suspense } from 'react';
import { uploadImageToCloudinary } from '../../../../utils/user/imageUploader';
import toast from 'react-hot-toast';
import axios from 'axios';
import PageOne from './PageOne';

const PageTwo = lazy(() => import('./PageTwo'));
const SuccessPage = lazy(() => import('./SuccessPage'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[42rem] bg-gray-100">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);
const CreateCourse = () => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    playlistLink: "",
    title: "",
    description: "",
    requirements: "",
    prerequisites: "",
    category: null,
    subCategory: null,
    subSubCategory: null,
    difficultyLevel: "",
    language: "",
    instructorName: "",
    contactNumber: "",
    numProjectsIncluded: "",
    expectedtimeFinishNumber: "",
    expectedtimeFinishUnit: "",
    isEmployeeUser: false,
    role: ""
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
    instructorName: "",
    language: "",
    tags: "",
    expectedtimeFinishNumber: "",
    expectedtimeFinishUnit: "",
    numProjectsIncluded: ""
  });

  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const validateSecondPage = () => {
    const pageData = formData;
    const pageErrors = {};

    if (!pageData.requirements) {
      pageErrors.requirements = "Requirements are required";
    }
    if (!pageData.subCategory || !pageData.subSubCategory || !pageData.category) {
      pageErrors.category = "All category fields must be filled";
    }
    if (!pageData.prerequisites) {
      pageErrors.prerequisites = "Even if no prerequisites are needed, explain that you will teach everything from scratch";
    }
    if (!pageData.numProjectsIncluded) {
      pageErrors.numProjectsIncluded = "Please enter number of projects included, enter '0' if none";
    }
    if (!pageData.instructorName) {
      pageErrors.instructorName = "Please enter instructor name";
    }
    if (!pageData.difficultyLevel) {
      pageErrors.difficultyLevel = "Please select difficulty level";
    }
    if (!pageData.language) {
      pageErrors.language = "Please select course language";
    }
    if (!pageData.role) {
      pageErrors.role = "Please select who can view the course";
    }
    if (!pageData.expectedtimeFinishNumber) {
      pageErrors.expectedtimeFinishNumber = "Please enter a number";
    } else if (!pageData.expectedtimeFinishUnit) {
      pageErrors.expectedtimeFinishUnit = "Please select unit";
    }

    return pageErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pageErrors = validateSecondPage();
    if (Object.keys(pageErrors).length === 0) {
      try {
        const response = await axios.post("/course/createCourse", {
          instructor: formData.instructorName,
          courseThumbNail: formData.imageUrl,
          playlistLink: formData.playlistLink,
          courseTitle: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          prerequisites: formData.prerequisites,
          category: formData.category.label,
          subCategory: formData.subCategory.label,
          subSubCategory: formData.subSubCategory.label,
          difficultyLevel: formData.difficultyLevel,
          language: formData.language,
          numProjectsIncluded: formData.numProjectsIncluded,
          expectedTimeToFinishNumber: formData.expectedtimeFinishNumber,
          expectedTimeToFinishUnit: formData.expectedtimeFinishUnit,
          role: formData.role,
        });

        if (response.status === 201) {
          toast.success("Form submitted successfully!");
          setIsSuccess(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Form submission failed. Please try again.");
      }
    } else {
      setErrors(pageErrors);
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'expectedtimeFinishNumber' && (value <= 0)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "Value must be greater than zero"
      }));
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));

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

  if (isSuccess) {
    return (
      <Suspense fallback={<LoadingFallback/>}>
        <SuccessPage />
      </Suspense>
    );
  }

  return (
    <div className='w-full min-h-[42rem] bg-white h-full overflow-y-auto'>
      {page === 1 ? (
        <PageOne
          formData={formData}
          handleImageUpload={handleImageUpload}
          handleDrop={handleDrop}
          handleChange={handleChange}
          removeImage={removeImage}
          setPage={setPage}
        />
      ) : (
        <Suspense fallback={<LoadingFallback/>}>
          <PageTwo
            formData={formData}
            handleChange={handleChange}
            isLoading={isLoading}
            categories={categories}
            handleSelectChange={handleSelectChange}
            errors={errors}
          />
        </Suspense>
      )}

      {page === 2 && (
        <div className='flex w-full justify-evenly items-center'>
          <button
            type="button"
            className="lg:w-[37%] w-[30%] text-xl font-bold bg-blue-700 text-white py-2 mt-4 lg:mb-0 mb-3 rounded-md hover:bg-blue-800 transition duration-300"
            onClick={() => setPage(prevState => prevState - 1)}
          >
            Back
          </button>
          <button
            type="button"
            className="lg:w-[37%] w-[30%] text-xl font-bold bg-blue-700 text-white py-2 mt-4 lg:mb-0 mb-3 rounded-md hover:bg-blue-800 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
