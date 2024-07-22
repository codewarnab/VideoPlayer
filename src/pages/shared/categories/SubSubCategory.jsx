import axios from "axios";
import React, { Suspense, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CourseCard from "../../../components/shared/CourseCard";

const SkeletonCard = () => (
    <div className="h-[300px] bg-gray-200 rounded-lg animate-pulse">
        <div className="h-3/5 bg-gray-300 rounded-t-lg"></div>
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
    </div>
);

const SubSubCategory = () => {
    const { subsubcategoryName } = useParams();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subSubCategoryCourses, setsubSubCategoryCourses] = useState([]);

    useEffect(() => {
        const fetchCourseBySubSubCategory = async () => {
            try {
                setLoading(true);
                setsubSubCategoryCourses([]);
                if (!subsubcategoryName) return;

                const res = await axios.get('/course/getCourseBySubSubCategory', {
                    params: { subsubcategoryName }
                });

                if (res.data.success) {
                    setsubSubCategoryCourses(res.data.courses);
                } else {
                    setError(res.data.message || 'An error occurred while fetching courses.');
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('No courses found for the specified subcategory.');
                } else {
                    setError('An error occurred while fetching courses.');
                }
                console.error(`Failed to fetch subcategory courses: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseBySubSubCategory();
    }, [location.pathname, subsubcategoryName]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 w-[93%] md:w-full lg:w-full gap-6 md:grid-cols-3 lg:grid-cols-4 my-4 min-h-svh">
                {[...Array(8)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <>
                <h1 className="lg:text-3xl text-2xl text-black font-bold text-center pt-4">{subsubcategoryName}</h1>
                <div className="text-red-500 flex-col my-4 min-h-[30rem] flex text-xl justify-center items-center">
                    <p>{error}</p>
                </div>
            </>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 w-[93%] md:w-full lg:w-full gap-6 md:grid-cols-3 lg:grid-cols-4 my-4 min-h-svh p-10">
                {subSubCategoryCourses.length > 0 &&
                    subSubCategoryCourses.map((item) => (
                        <Suspense key={item._id} fallback={<SkeletonCard />}>
                            <CourseCard item={item} />
                        </Suspense>
                    ))}
            </div>
        </div>
    );
};

export default SubSubCategory;