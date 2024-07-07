import React, { useState, useEffect } from "react";
//import ApiService from "../services/ApiService";
import axios from "axios";
import { toast } from "react-hot-toast";

const AssignCourse = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourses, setSelectedCourses] = useState("");

  useEffect(() => {
    // Fetch users and courses data when component mounts
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/authpcs/users-pcs");
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Error fetching users:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/maincourse/get-dashboard");
      setCourses(response.data.dashboards);
    } catch (error) {
      toast.error("Error fetching courses:", error);
    }
  };

  const handleCheckboxChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };



  const handleAssignCourse = async () => {
    if (!selectedUser || selectedCourses.length === 0) {
      toast.error("Please select a user and a course.");
      return;
    }

    // console.log(selectedCourses)
    // console.log(selectedUser);

    try {
      const promises = selectedCourses.map(async (courseId) => {
        const res = await axios.post("/maincourse/assignments", {
          userId: selectedUser,
          courseId,
        });
        return res;
      });

      const results = await Promise.all(promises);

      results.forEach((res) => {
        if (res && res.data.success) {
          toast.success(res.data.message);
        } else if (res && !res.data.success) {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg ml-6 h-[25rem] md:ml-56 md:w-[30rem]">
      <h2 className="text-2xl font-bold mb-4">Assign Course to User</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select User:</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName + " " + user.lastName}
            </option>
          ))}
        </select>
      </div>

      <label className="block text-gray-700">Select Courses:</label>
      <div className="mb-4 overflow-x-auto overflow-scroll" style={{ height: "10rem" }}>

        {courses.map((course) => (
          <div key={course._id} className="flex items-center mb-2 table table-xs table-pin-rows table-pin-cols"
          >
            <input
              type="checkbox"
              id={course._id}
              value={course._id}
              checked={selectedCourses.includes(course._id)}
              onChange={() => handleCheckboxChange(course._id)}
              className="mr-2"
            />
            <label htmlFor={course._id}>{course.courseName}</label>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        onClick={handleAssignCourse}>
        Assign Course
      </button>
    </div>
  );
};

export default AssignCourse;
