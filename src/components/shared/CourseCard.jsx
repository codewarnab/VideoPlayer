import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Play, Star } from 'lucide-react';
import { LazyLoadImage } from "react-lazy-load-image-component";

const formatViewCount = (views) => {
    if (views >= 1000000) {
        return Math.floor(views / 1000000) + 'M+';
    } else if (views >= 1000) {
        return Math.floor(views / 1000) + 'k+';
    }
    return views;
};

const CourseCard = ({ item }) => {
    const location = useLocation();
    const isCategoryPage = location.pathname.includes('/category/');


    return (
        <div key={item._id} className="relative">
            <Link to={`${item.description}`} state={{ item }}>
                <div className="lg:w-[18rem] lg:h-[16.4rem] h-[270px] mr-3 bg-white border border-gray-200 rounded-lg shadow hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl flex flex-col">
                    <LazyLoadImage
                        className="rounded-t-lg w-full h-[140px] object-cover"
                        src={item?.courseThumbNail}
                        alt="cover image"
                        effect="blur"
                    />
                    <div className="flex flex-col flex-grow justify-between p-2">
                        <div className="w-full text-start">
                            <div className="flex w-full justify-between mb-2">
                                <div className="flex gap-1 items-center">
                                    <Star strokeWidth={0} opacity={0.5} fill="#2563EB" size={20} />
                                    <p className="text-sm text-black">
                                        {item?.finalRating !== undefined && item.finalRating !== null ? Number(item.finalRating).toFixed(1) : '5'}
                                    </p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <Play size={16} color="black" fill="black" />
                                    <p className="text-sm text-black">{formatViewCount(item?.views)}</p>
                                </div>
                            </div>
                            <p className="mb-1 text-base font-bold tracking-tight text-gray-700 text-left line-clamp-2">
                                {item?.courseTitle ?? "other"}
                            </p>
                        </div>
                        <div className="w-full">
                            <h6 className="text-xs py-1 px-2 rounded-md text-black bg-slate-200 w-fit">
                                {isCategoryPage ? item.subSubCategory : item.subCategory}
                            </h6>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;