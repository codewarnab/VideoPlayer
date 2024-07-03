//import axios from 'axios';
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

import { Link } from "react-router-dom";

const MyCourse = ({ searchTerm }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          `/maincourse/${user?._id}/assigned-courses`
        );
        setMyCourses(response.data.course);
        //console.log(myCourses);
      } catch (error) {
        console.error("Error fetching my courses:", error);
      }
    };
    fetchMyCourses();
  }, [user?._id]);

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {myCourses?.length > 0 &&
            myCourses?.map((item) => {
              return (
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                  <Link to={item?.path}>
                    <img
                      className="rounded-t-lg"
                      src={item?.image}
                      alt=""
                      style={{ width: "300px", height: "140px" }}
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item?.courseName.slice(0, 28)} <br />
                        {item?.courseName.slice(28)}
                      </h5>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default MyCourse;
