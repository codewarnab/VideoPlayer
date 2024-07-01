import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TotalCount from "../../../components/TotalCount";
import MultiFilter from "./MultiFilter";
import CourseCard from "./CourseCard";

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
        if (!searchTerm){
          setAllCourses(res.data.dashboards);
        }
        settempCourses(res.data.dashboards); 
        console.log(res.data.dashboards)
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
              <CourseCard key={item._id} item={item} setItem={setItem} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
