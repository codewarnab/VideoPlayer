import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../../../components/shared/BreadCrumb';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Monitor, Code, FileText, BookOpen, Smartphone, Award, Clock, Play } from 'lucide-react';

// Skeleton component
const Skeleton = ({ width = '100%', height = '20px', className = '' }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);

const CourseDescription = () => {
  const { descriptionId } = useParams();
  const location = useLocation();
  const [description, setDescription] = useState({});
  const courseData = location.state?.item;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        if (!descriptionId) {
          console.error("descriptionId is required");
          return;
        }
        setLoading(true);
        const response = await axios.get(`/description/getDescriptions?descriptionId=${descriptionId}`);
        console.log(response.data);
        setDescription(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDescriptions();
  }, [descriptionId]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          {/* Top section skeleton */}
          <div className="bg-gray-100 rounded-md pb-8">
            <div className="p-3">
              <Skeleton width="50%" height="24px" />
            </div>
            <div className="flex flex-col px-4 pt-1 lg:px-6">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 flex-shrink-0 mb-6 lg:mb-0">
                  <Skeleton width="100%" height="300px" className="rounded-md" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-evenly">
                  <Skeleton width="70%" height="24px" className="mb-2" />
                  <Skeleton width="50%" height="20px" className="mb-4" />
                  <Skeleton width="120px" height="48px" className="rounded-lg mb-4" />
                  <div className="flex gap-2">
                    <Skeleton width="80px" height="24px" className="rounded-md" />
                    <Skeleton width="80px" height="24px" className="rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course description skeleton */}
          <div className="bg-gray-100 rounded-md p-5 flex flex-col gap-2">
            <Skeleton width="200px" height="28px" className="mb-2" />
            <Skeleton width="100%" height="80px" />
          </div>

          {/* Course includes and Requirements skeleton */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2 bg-gray-100 rounded-md p-4 sm:p-5 flex flex-col gap-3">
              <Skeleton width="180px" height="28px" className="mb-2" />
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton width="24px" height="24px" className="rounded-full" />
                  <Skeleton width="80%" height="20px" />
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100 rounded-md p-4 sm:p-5 flex flex-col gap-3">
              <Skeleton width="150px" height="28px" className="mb-2" />
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton width="8px" height="8px" className="rounded-full" />
                  <Skeleton width="90%" height="20px" />
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites skeleton */}
          <div className="w-full bg-gray-100 rounded-md p-5 sm:p-5 flex flex-col gap-3 mt-4">
            <Skeleton width="250px" height="28px" className="mb-2" />
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton width="8px" height="8px" className="rounded-full" />
                <Skeleton width="90%" height="20px" />
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        {/* top section */}
        <div className='bg-gray-100 rounded-md pb-8'>
          <div className='p-3'>
            <Breadcrumbs courseData={courseData} />
          </div>
          <div className='flex flex-col px-4 pt-1 lg:px-6'>
            {/* Title for small screens */}
            <div className='lg:hidden mb-4'>
              <div className='flex items-center gap-2 mb-3'>
                <i className="pi pi-user text-xl text-black border-2 text-[0.6rem] rounded-full p-1"></i>
                <span className="text-md text-black font-bold">{description.instructor}</span>
              </div>
              <h2 className='text-xl font-bold text-black text-start'>{courseData?.courseTitle}</h2>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='w-full lg:w-1/2 flex-shrink-0 mb-6 lg:mb-0'>
                <LazyLoadImage
                  className="rounded-md w-full lg:w-[30rem] h-auto object-cover"
                  src={courseData?.courseThumbNail}
                  alt="cover image"
                  effect="blur"
                />
              </div>
              <div className='w-full lg:w-1/2 lg:pl-6 flex flex-col justify-evenly'>
                {/* Title for medium and large screens */}
                <div className='hidden lg:block'>
                  <div className='flex items-center gap-2 mb-3'>
                    <i className="pi pi-user text-xl text-black border-2 text-[0.65rem] rounded-full p-1"></i>
                    <span className="text-lg text-black font-bold">{description.instructor}</span>
                  </div>
                  <h2 className='text-xl font-bold mb-4 text-black text-start'>{courseData?.courseTitle}</h2>
                </div>
                <div className='w-full lg:w-fit flex justify-center mt-4 lg:mt-0'>
                  <Link to={`${description.ytPlayListId}`} className="inline-block">
                    <button className='flex items-center justify-center gap-2 py-3 px-6 bg-blue-500 text-white rounded-lg text-lg font-semibold transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-300'>
                      <Play size={24} />
                      Play Course
                    </button>
                  </Link>
                </div>
                <div className='w-full flex gap-3 justify-start items-center mt-4 flex-wrap'>
                  <h6 className="text-xs lg:py-2 lg:px-3 py-1 px-2 rounded-md text-black font-semibold bg-slate-200 w-fit">{courseData.subCategory}</h6>
                  <h6 className="text-xs lg:py-2 lg:px-3 py-1 px-2 rounded-md text-black font-semibold bg-slate-200 w-fit">{courseData.subSubCategory}</h6>
                  <div className='flex items-center '>
                    <Clock size={20} className='mr-2 text-blue-500' />
                    <span className="text-sm text-black">
                      Duration: <span className="font-bold text-blue-600">{courseData.expectedTimeToFinishNumber} {courseData.expectedTimeToFinishUnit}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* course description  */}
        <div className='bg-gray-100 rounded-md p-5 flex flex-col gap-2'>
          <h1 className='text-start text-2xl text-black font-bold'>Course Description</h1>
          <p className='text-start text-black lg:text-lg md:text-md text-sm'>{description.description}</p>
        </div>

        <div className='w-full flex flex-col lg:flex-row'>
          {/* This course Includes  */}
          <div className='w-full bg-gray-100 rounded-md lg:w-1/2 p-4 sm:p-5 flex flex-col gap-3'>
            <h1 className='text-start text-xl sm:text-2xl text-black font-bold'>This Course Includes</h1>
            <div className='text-sm sm:text-base lg:text-lg text-black space-y-2 sm:space-y-3'>
              <div className='flex items-center'>
                <Monitor size={20} className='mr-2 flex-shrink-0' />
                <span><span className='font-bold text-blue-600'>{description.totalVideoContentLength}</span> of on-demand video</span>
              </div>
              {description.numProjectsIncluded !== 0 && (
                <div className='flex items-center'>
                  <Code size={20} className='mr-2 flex-shrink-0' />
                  <span><span className='font-bold text-blue-600'>{description.numProjectsIncluded}</span> hands-on coding Projects</span>
                </div>
              )}
              <div className='flex items-center'>
                <Smartphone size={20} className='mr-2 flex-shrink-0' />
                <span>Accessible on All platforms</span>
              </div>
              <div className='flex items-center'>
                <Play size={20} className='mr-2 flex-shrink-0' />
                <span><span className='font-bold text-blue-600'>{description.videoCount}+</span> videos</span>
              </div>
            </div>
          </div>

          {/* Requirements section */}
          <div className='w-full bg-gray-100 rounded-md lg:w-1/2 p-4 sm:p-5 flex flex-col gap-3 mt-4 lg:mt-0'>
            <h1 className='text-start text-xl sm:text-2xl text-black font-bold'>Requirements</h1>
            <ul className='space-y-2 sm:space-y-3 text-start text-sm sm:text-base lg:text-lg text-black'>
              {description.requirements && description.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='w-full bg-gray-100 rounded-md p-5 sm:p-5 flex flex-col gap-3 mt-4'>
          <h1 className='text-start text-xl sm:text-2xl text-black font-bold'>Prerequisites for the Course</h1>
          <ul className='space-y-2 sm:space-y-3 text-start text-sm sm:text-base lg:text-lg text-black'>
            {description.prerequisites && description.prerequisites.map((prerequisites, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                <span>{prerequisites}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className='p-5 flex flex-col gap-5'>
      {renderContent()}
    </div>
  );
};

export default CourseDescription;