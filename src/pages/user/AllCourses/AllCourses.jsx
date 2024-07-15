import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'primeicons/primeicons.css';
import './styles.css'; // Import the local CSS file

import CourseCard from "./CourseCard";

const Dashboard = ({ searchTerm, setItem }) => {
  const [coursesByCategory, setCoursesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          searchTerm
            ? `/maincourse/getALlCourseCards?search=${searchTerm}`
            : "/maincourse/getALlCourseCards"
        );
        const courses = res.data.dashboards;

        // Group courses by category
        const groupedCourses = courses.reduce((acc, course) => {
          if (!acc[course.category]) {
            acc[course.category] = [];
          }
          acc[course.category].push(course);
          return acc;
        }, {});

        setCoursesByCategory(groupedCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const CarouselArrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'next' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2`}
    >
      <i className={`pi ${direction === 'next' ? 'pi-chevron-right' : 'pi-chevron-left'}`} />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.4,
    slidesToScroll: 1,
    nextArrow: <CarouselArrow direction="next" />,
    prevArrow: <CarouselArrow direction="prev" />,
    rows: 1,
    slidesPerRow: 1,
    vertical: false,
    verticalSwiping: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center mb-4 h-auto min-h-screen w-full justify-start bg-[#F5F5F5] px-5">
      {loading ? (
        <h1 className="text-5xl text-black font-extrabold">Loading....</h1>
      ) : (
        Object.entries(coursesByCategory).map(([category, courses]) => (
          <div key={category} className="w-full flex flex-col justify-center " >
            <h2 className="text-2xl  text-black font-extrabold ">{category}</h2>
            <Slider {...settings}>
              {courses.map((item) => (
                <Suspense key={item._id} fallback={<div className="h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>}>
                  <CourseCard item={item} setItem={setItem} />
                </Suspense>
              ))}
            </Slider>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;