import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TotalCount from "../../../components/TotalCount";
import MultiFilter from "./MultiFilter";

const Dashboard = ({ searchTerm, setSearchTerm, setItem }) => {
  const [AllCourses, setAllCourses] = useState([]);
  const [tempCourses, settempCourses] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch data on component mount or when searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          searchTerm
            ? `/maincourse/get-dashboard?search=${searchTerm}`
            : "/maincourse/get-dashboard"
        );
        if (!searchTerm) setAllCourses(res.data.dashboards);
        settempCourses(res.data.dashboards); // Initially set tempCourses with all courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  // Extract categories from AllCourses for filtering 
  const uniqueCategories = [...new Set(AllCourses.map(course => course.category))];
  const categories = uniqueCategories.filter(Boolean); // Filter out any falsy values

  return (
    <>
      <div className="flex flex-col items-center mb-7 h-auto justify-center bg-[#F5F5F5] p-7">
        <div className="flex items-start w-full">
          {AllCourses.length > 0 && (
            <MultiFilter
              AllCourses={AllCourses}
              settempCourses={settempCourses}
              setSearchTerm={setSearchTerm}
              categories={categories}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 my-4">
          {tempCourses?.length > 0 &&
            tempCourses?.map((item) => (
              <div key={item._id} className="relative">
                <Link to="/description" onClick={() => setItem(item)}>
                  <div className="lg:w-[300px] lg:h-[250px] h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                    <img
                      className="rounded-t-lg"
                      src={item?.image}
                      alt=""
                      style={{ width: "300px", height: "140px" }}
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-base lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {item?.courseName.slice(0, 28)} <br />
                        {item?.courseName.slice(28)}
                      </h5>
                      <div className="lg:flex justify-evenly items-center">
                        <h4>{<TotalCount listId={item?.listId} />}</h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
