import React from "react";
import { Link } from "react-router-dom";
import { Eye, Star } from 'lucide-react';
import { LazyLoadImage } from "react-lazy-load-image-component";
const CourseCard = ({ item, setItem }) => {
    return (
        <div key={item._id} className="relative ">
            <Link to="/description" onClick={() => setItem(item)} >
                <div className="lg:w-[18.5rem] lg:h-[17rem] h-[300px] bg-white border border-gray-200 rounded-lg shadow hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl flex flex-col">
                    <LazyLoadImage
                        className="rounded-t-lg w-full h-[140px] object-cover"
                        src={item?.image}
                        alt="cover image "
                        effect="blur"
                    />
                    <div className="flex flex-col flex-grow justify-between p-3">
                        <div className="w-full text-start">
                            <div className="flex w-full justify-between mb-2">
                                <div className="flex gap-1 items-center">
                                    <Star strokeWidth={0} opacity={0.5} fill="#2563EB" size={20} />
                                    <p className="text-sm text-black">{item?.finalRating ? Number(item.finalRating).toFixed(1) : '5'}</p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <Eye size={20} color="black" />
                                    <p className="text-sm text-black">{item?.views}</p>
                                </div>
                            </div>
                            <p className="mb-1 text-base lg:text-md font-bold tracking-tight text-gray-700 text-left line-clamp-2">
                                {item?.courseName ?? "other"}
                            </p>
                        </div>
                        <div className="w-full">
                            <h6 className="text-sm py-1 px-2 rounded-lg text-black bg-slate-200 w-fit">{item.category}</h6>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;