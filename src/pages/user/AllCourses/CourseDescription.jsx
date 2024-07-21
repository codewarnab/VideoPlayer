import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../../../components/shared/BreadCrumb';
import { LazyLoadImage } from "react-lazy-load-image-component";

const CourseDescription = () => {
  const { descriptionId } = useParams();
  const location = useLocation();
  const [description, setDescription] = useState({});
  const courseData = location.state?.item;

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        if (!descriptionId) {
          console.error("descriptionId is required");
          return;
        }
        const response = await axios.get(`/description/getDescriptions?descriptionId=${descriptionId}`);
        console.log(response.data);
        setDescription(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDescriptions();
  }, [descriptionId]);

  return (
    <div className='p-5'>
      <div className='bg-gray-50 rounded-md min-h-screen'>
        <div className='p-3'>
          <Breadcrumbs courseData={courseData} />
        </div>
        <div className='flex px-6'>
          <div className='w-1/2 flex-shrink-0'>
            <LazyLoadImage
              className="rounded-md w-[30rem] h-auto object-cover"
              src={courseData?.courseThumbNail}
              alt="cover image"
              effect="blur"
            />
          </div>
          <div className='w-1/2 pl-6'>
            <div className='flex items-center gap-2 mb-3'>
              <i className="pi pi-user text-xl text-black border-2 text-[0.7rem]  rounded-full p-1"></i>
              <span className="text-lg text-black font-bold">{description.instructor}</span>
            </div>
              <h2 className='text-xl font-bold mb-2 text-black text-start'>{courseData?.courseTitle}</h2>
            <p>hello world</p>
          </div>
        </div>
      </div>

      {courseData && (
        <div className='p-5'>
          <p className='mb-1'>Rating: {courseData.finalRating}</p>
          <p className='mb-1'>Views: {courseData.views}</p>
          <div className="flex flex-col gap-2 mb-4">
            <p>Category: {courseData.category}</p>
            <p>Sub Category: {courseData.subCategory}</p>
            <p>Sub Sub Category: {courseData.subSubCategory}</p>
          </div>
          <p className='mb-4'>Expected Time to Finish: {courseData.expectedTimeToFinishNumber} {courseData.expectedTimeToFinishUnit}</p>
          {/* Add more fields as needed */}
          <Link to={`${description.ytPlayListId}`}>
            <button className='p-3 bg-black text-white rounded w-32'>Play</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseDescription;
