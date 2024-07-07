import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import TotalCount from "../../../components/TotalCount";
import toast from "react-hot-toast";
import axios from "axios";
import Description from "./Description";
import CoursePlaylist from "./CoursePlaylist";

const CourseDescription = ({ item, setSearchTerm }) => {
    const [savedItem, setSavedItem] = useState(item);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [description, setDescription] = useState('');

    const handleDescription = async () => {
        if (!savedItem || !savedItem.path) {
            // Handle the case where savedItem or savedItem.path is undefined
            return;
        }
        try {
            const res = await axios.get(`/description/get-description/${savedItem?.path.slice(1)}`);
            if (res.data.success) {
                setDescription(res.data.description);
            } else {
                console.error("Request was not successful:", res.data.message);
                toast.error("Request was not successful");
            }
        } catch (error) {
            console.error("Error fetching description:", error);
            toast.error("Error fetching description");
        }
    };

    useEffect(() => {
        handleDescription();
    }, [savedItem?.path]);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [expanded, setExpanded] = useState(false);

    const handleDivClick = () => {
        setExpanded(!expanded);
        setShowRemoveButton(false);
        setTimeout(() => {
            setShowRemoveButton(true);
        }, 1000);
    };

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await axios.get(`/maincourse/${user?._id}/assigned-courses`);
                const myCourses = response?.data?.course;
                const subscribed = myCourses?.some(course => course._id === savedItem._id);
                setIsSubscribed(subscribed);
            } catch (error) {
                console.error("Error fetching my courses:", error);
            }
        };

        if (user?.employeeId) {
            fetchMyCourses();
        }
    }, [user, savedItem]);

    const handleSubscribe = () => {
        if (!isSubscribed) {
            addToMyCourse(savedItem._id);
            setIsSubscribed(true);
        } else {
            setIsDisabled(true); // Disable button on unsubscribe
        }
    };

    const addToMyCourse = async (courseId) => {
        try {
            const res = await axios.post("/maincourse/assignments", {
                userId: user._id,
                courseId,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/my-course")
            } else if (res && !res.data.success) {
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        // Retrieve item from localStorage if available
        const storedItem = localStorage.getItem('courseItem');
        if (storedItem) {
            setSavedItem(JSON.parse(storedItem));
        }
    }, []);

    useEffect(() => {
        // Save item to localStorage whenever it changes
        if (item) {
            localStorage.setItem('courseItem', JSON.stringify(item));
            setSavedItem(item);
        }
    }, [item]);

    const handleSearch = (value) => {
        setSearchTerm(value)
        navigate('/dashboard');
    };

    const renderStars = (count) => {
        const roundedCount = Math.ceil(count); // Round up to the nearest integer
        const stars = [];

        if (roundedCount === 0) {
            // If count is 0, show 5 empty stars
            for (let i = 0; i < 5; i++) {
                stars.push(<span key={i}>&#9734;</span>);
            }
        } else {
            // Show stars according to the rounded count
            for (let i = 0; i < 5; i++) {
                if (i < roundedCount) {
                    stars.push(<span key={i} className="text-yellow-400 ">&#9733;</span>);
                } else {
                    stars.push(<span key={i}>&#9734;</span>);
                }
            }
        }

        return stars;
    };

    if (!savedItem) return null; // Or display a loading message

    return (
        <Fragment>
            <div className='bg-sky-950 text-white '>
                <div className="flex mx-auto max-w-7xl justify-between py-8 relative">
                    <div key={savedItem._id} className="">
                        <div>
                            <div className="w-96 flex flex-col items-center bg-blue-500 border border-gray-200 rounded-t-3xl rounded-b-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="py-5 w-96 bg-white  mt-40 h-96  rounded-3xl">
                                    <h5 className="mt-16 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {savedItem?.courseName?.slice(0, 28)} <br />
                                        {savedItem?.courseName?.slice(28)}
                                        
                                    </h5>
                                    <div className="flex justify-evenly text-black">
                                        {/* <h4 className="text-2xl ">{renderStars(savedItem?.finalRating)}</h4> */}


                                        <div className="flex items-center py-5">
                                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{savedItem?.finalRating.toString().slice(0, 3)}</p>
                                            <div className="h-5 ml-2 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
                                            <h4 className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{<TotalCount listId={savedItem?.listId} />}</h4>
                                        </div>
                                    </div>
                                    <div className="pb-5">
                                        <div>
                                            <button
                                                className={`btn btn-wide group relative inline-block overflow-hidden rounded-xl border-4 border-double  px-8 py-3 font-medium text-red-600 ${isSubscribed ? "border-gray-400" : "border-red-500"}`}

                                            // disabled={isDisabled}
                                            >
                                                {isSubscribed ?
                                                    (
                                                        <span className="absolute left-0 top-0 mb-0 flex h-full w-full bg-green-600 " />
                                                    ) :
                                                    (
                                                        <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-red-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full" />
                                                    )}
                                                {user?.employeeId ? (
                                                    <span className={`relative ${isSubscribed ? "text-white" : "group-hover:text-white"}`} onClick={handleSubscribe}>
                                                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                                                    </span>
                                                ) : (
                                                    savedItem?.role[0]?.rolename === "Employee" ? (
                                                        <Link to='/dashboard'>
                                                            <span className="relative group-hover:text-white">Buy This Course</span>
                                                        </Link>
                                                    ) : (
                                                        <Link to={savedItem?.path}>
                                                            <span className="relative group-hover:text-white">Free to watch</span>
                                                        </Link>
                                                    )
                                                )}
                                            </button>

                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center justify-center h-14 px-4 rounded-r-3xl bg-sky-950 transition-all duration-1000 ${expanded ? 'w-11/12' : 'w-10'}`}
                                    >
                                        <svg
                                            onClick={handleDivClick}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                                            />
                                        </svg>
                                        {expanded && showRemoveButton && (
                                            <>
                                                <span
                                                    id="cpnCode"
                                                    className="border-dashed border py-2 px-4 ml-3 text-white rounded-l"
                                                >
                                                    STEALDEAL20
                                                </span>
                                                <span
                                                    id="cpnBtn"
                                                    className="border border-white py-2 px-4 bg-white text-purple-600 rounded-r-xl cursor-pointer"
                                                >
                                                    Copy Code
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <CoursePlaylist listId={savedItem?.listId} />
                                </div>
                                <img
                                    className="rounded-3xl w-80 h-44 mt-10 absolute shadow-gray-400 shadow-xl hover:shadow-gray-600 transition duration-700 ease-in-out hover:scale-110"
                                    src={savedItem?.image}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pl-20 ">
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li className="hover:text-blue-400"><Link style={{ textDecoration: "none" }} to='/dashboard'>HOME</Link></li>
                                <li className="hover:text-blue-400"><Link style={{ textDecoration: "none" }} to='/dashboard' onClick={() => setSearchTerm(savedItem?.courseTitle)}> {savedItem?.courseTitle}</Link></li>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.6" stroke="currentColor" class="w-4 h-4 ml-1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </ul>
                            <h1 className="text-4xl flex justify-start mb-3 mt-8">{savedItem?.courseName.toUpperCase()}</h1>
                        </div>

                        <div>
                            <Description
                                heading={description?.heading}
                                paragraph={description?.paragraph}
                                leftDescription={description?.leftDescription}
                                rightDescription={description?.rightDescription}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CourseDescription;
