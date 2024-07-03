import React from "react";
import { Link } from "react-router-dom";
import TotalCount from "../../../components/TotalCount";

const CourseCard = ({ item, setItem }) => {
    return (
        <div key={item._id} className="relative">
            <Link to="/description" onClick={() => setItem(item)}>
                <div className="lg:w-[300px] lg:h-[250px] h-[300px] bg-white border border-gray-200 rounded-lg shadow  hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                    <img
                        className="rounded-t-lg"
                        src={item?.image}
                        alt=""
                        style={{ width: "300px", height: "140px" }}
                    />
                    <div className="p-5">
                        <h5 className="mb-2 text-base lg:text-lg font-bold tracking-tight text-gray-900 ">
                            {item?.courseName.slice(0, 28)} <br />
                            {item?.courseName.slice(28)}
                        </h5>
                        <div className="lg:flex justify-evenly items-center">
                            {/* <h4><TotalCount listId={item?.listId} /></h4> */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;
