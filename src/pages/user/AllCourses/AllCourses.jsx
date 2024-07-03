import axios from "axios";
import React, {  Suspense, useState, useEffect, lazy } from "react";
import {  useNavigate } from "react-router-dom";
// import TotalCount from "../../../components/TotalCount";
import MultiFilter from "./MultiFilter";
const CourseCard = lazy(() => import('./CourseCard'))

const Dashboard = ({ searchTerm, setSearchTerm, setItem }) => {
  const [AllCourses, setAllCourses] = useState([]);
  const [tempCourses, settempCourses] = useState([]);
  const [loading, setLoading] = useState(true)
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
        if (!searchTerm) {
          setAllCourses(res.data.dashboards);

        }
        settempCourses(res.data.dashboards);
        setLoading(false);
        console.log(res.data.dashboards)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
    };
    fetchData();
  }, [searchTerm]);

  // Extract categories from AllCourses for filtering 
  const uniqueCategories = [...new Set(AllCourses.map(course => course.category))];
  const categories = uniqueCategories.filter(Boolean); // Filter out any falsy values

  return (
    <>
      <div className="flex flex-col items-center mb-7 h-auto min-h-svh min-w-svw justify-start bg-[#F5F5F5] p-4">
        {!loading ? (
          <>
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
            <div className="grid grid-cols-1 w-[93%] md:w-full lg:w-full gap-6 md:grid-cols-3 lg:grid-cols-4 my-4">
              {tempCourses?.length > 0 &&
                tempCourses?.map((item) => (
                  <Suspense key={item._id} fallback={<div className="h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>}>
                    <CourseCard item={item} setItem={setItem} />
                  </Suspense>
                ))}
            </div>
          </>
        ) : (
          <h1 className="text-5xl text-black font-extrabold">Loading....</h1>
        )
        }


      </div>
    </>
  );
};

export default Dashboard;
