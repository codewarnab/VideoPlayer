import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../../../components/shared/BreadCrumb';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Monitor, Code, FileText, BookOpen, Smartphone, Award, Play } from 'lucide-react';



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
    <div className='p-5 flex flex-col gap-5'>
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
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-100 rounded-md p-5 flex flex-col gap-2'>
        <h1 className='text-start text-2xl text-black font-bold'>Course Description</h1>
        <p className='text-start text-black lg:text-lg md:text-md text-sm'>{description.description}</p>
      </div>
      <div className='bg-gray-100 rounded-md p-5 flex flex-col gap-3'>
        <h1 className='text-start text-2xl text-black font-bold'>This Course Includes </h1>
        <div className=' lg:text-lg md:text-md text-sm text-black'>
          <div className='flex items-center'>
            <Monitor size={24} className='mr-2' /> {/* Add margin to the right of the icon */}
            <span> <span className='"font-bold text-blue-600'>{description.totalVideoContentLength}</span>  of on demand video </span>
          </div>
          {description.numProjectsIncluded !== 0 ? (
            <div className='flex items-center'>
              <Code size={24} className='mr-2' /> {/* Add margin to the right of the icon */}
              <span> <span className='"font-bold text-blue-600'>{description.numProjectsIncluded}</span> hands on coding Projects  </span>
            </div>
          ) :
            null
          }
          <div className='flex items-center'>
            <Smartphone size={24} className='mr-2' />
            <span>Accesible on All platforms</span>
          </div>
          <div className='flex items-center'>
            <Play size={24} className='mr-2' />
            <span> <span className='"font-bold text-blue-600'>{description.videoCount}+</span> videos </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;








