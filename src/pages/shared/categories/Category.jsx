import React, { Suspense, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'primeicons/primeicons.css';
import CourseCard from '../../../components/shared/CourseCard';
import './styles.css';

const Category = () => {
    const { categoryName } = useParams();
    const location = useLocation();
    const [coursesBySubCategory, setCoursesBySubCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseByCategory = async () => {
            setLoading(true);
            try {
                setCoursesBySubCategory({});
                if (!categoryName) return;

                const res = await axios.get('/course/getCourseByCategory', {
                    params: { categoryName }
                });

                console.log('API Response:', res.data);

                const courses = Array.isArray(res.data) ? res.data : [];
                console.log('Courses:', courses);

                const groupedCourses = courses.reduce((acc, course) => {
                    if (!acc[course.subCategory]) {
                        acc[course.subCategory] = [];
                    }
                    acc[course.subCategory].push(course);
                    return acc;
                }, {});

                setCoursesBySubCategory(groupedCourses);
            } catch (err) {
                console.error(`Failed to fetch category courses: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseByCategory();

    }, [categoryName, location.pathname]);

    const CarouselArrow = ({ direction, onClick, slideCount, currentSlide, coursesCount }) => {
        const isNext = direction === 'next';
        const isPrev = direction === 'prev';
        const isHidden = (isPrev && currentSlide === 0) || (isNext && currentSlide >= slideCount - 1) || coursesCount < 4;

        if (isHidden) return null;

        return (
            <button
                onClick={onClick}
                className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md ${isNext ? 'right-0' : 'left-0'}`}
            >
                <i className={`pi ${isNext ? 'pi-chevron-right' : 'pi-chevron-left'} text-black`} />
            </button>
        );
    };

    const SliderSettings = (coursesCount) => ({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(3.5, coursesCount),
        slidesToScroll: 1,
        nextArrow: <CarouselArrow direction="next" coursesCount={coursesCount} />,
        prevArrow: <CarouselArrow direction="prev" coursesCount={coursesCount} />,
        rows: 1,
        slidesPerRow: 1,
        vertical: false,
        verticalSwiping: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(2, coursesCount),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });

    const noCourses = Object.keys(coursesBySubCategory).length === 0;

    const LoadingSkeleton = () => (
        <div className="w-full flex flex-col justify-center pt-1 mb-8 overflow-hidden">
            <div className="w-48 h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex w-fit space-x-14 overflow-hidden">
                {[1, 2, 3, 4].map((card) => (
                    <div key={card} className="w-80 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center mb-4 h-auto min-h-screen w-full justify-start bg-[#F5F5F5] px-5">
            <h1 className="lg:text-3xl text-2xl tracking-wider font-bold pt-3 mb-3 text-black">{categoryName}</h1>
            {loading ? (
                <>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </>
            ) : noCourses ? (
                <div className="w-full text-center py-10">
                    <p className="text-xl font-semibold text-gray-600">No courses exist in this category.</p>
                </div>
            ) : (
                Object.entries(coursesBySubCategory).map(([subCategory, courses]) => (
                    <div key={subCategory} className="w-full flex flex-col justify-center pt-1">
                        <h2 className="text-2xl w-full pl-10 text-start text-black font-extrabold leading-tight">{subCategory}</h2>
                        <div className={`lg:slider-container ${courses.length < 4 ? 'lg:few-cards' : ''}`}>
                            <Slider {...SliderSettings(courses.length)}>
                                {courses.map((item) => (
                                    <Suspense key={item._id} fallback={<div className="h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>}>
                                        <CourseCard item={item} />
                                    </Suspense>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Category;