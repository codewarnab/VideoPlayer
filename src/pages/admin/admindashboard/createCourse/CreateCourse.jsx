import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../../../../utils/user/imageUploader'
import toast from 'react-hot-toast';
import PageOne from './PageOne';
import SecondPage from './SecondPage';

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
    contactNumber: "",
    numProjectsIncluded: "",
    expectedtimeFinishNumber: "",
    expectedtimeFinishUnit: "",
    isEmployeeUser: false
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
    numProjectsIncluded: ""
  });

  const [descriptionWordCount, setDescriptionWordCount] = useState(0);
  const [page, setPage] = useState(2);

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

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className='w-full min-h-[37rem]  bg-white h-full overflow-y-auto'>
      {page === 1 ? (
        <PageOne
          formData={formData}
          handleImageUpload={handleImageUpload}
          handleDrop={handleDrop}
          handleChange={handleChange}
          removeImage={removeImage}
        />
      ) :
        <SecondPage />
      }

      <div className='flex w-full  justify-evenly items-center '>


        {
          page === 2 && (
            <button
              type={`${page === 1 ? 'button' : 'submit'}`}
              className="lg:w-[37%] w-[30%] text-xl font-bold bg-blue-700 text-white py-2 mt-4 lg:mb-0 mb-3 rounded-md hover:bg-blue-800 transition duration-300"
              onClick={() => setPage(prevState => prevState - 1)}
            >
              Back
            </button>
          )
        }
        <button
          type="button"
          className="lg:w-[37%] w-[30%] text-xl font-bold bg-blue-700 text-white py-2 mt-4 lg:mb-0 mb-3 rounded-md hover:bg-blue-800 transition duration-300"
          onClick={() => {
            if (page === 1) {
              setPage(prevState => prevState + 1)
            }
          }}
        >
          {`${page === 1 ? 'Next' : 'Submit'}`}
        </button>

      </div>
    </div>
  )
}

export default CreateCourse;
