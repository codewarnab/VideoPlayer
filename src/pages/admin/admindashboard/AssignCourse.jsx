import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from 'react-select';

const AssignCourse = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await axios.get("/authpcs/users-pcs");
      const userOptions = response.data.users.map(user => ({
        value: user._id,
        label: `${user.firstName} ${user.lastName}`
      }));
      setUsers(userOptions);
    } catch (error) {
      toast.error("Error fetching users: " + error.message);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const response = await axios.get("/maincourse/getALlCourseCards");
      setCourses(response.data.dashboards);
    } catch (error) {
      toast.error("Error fetching courses: " + error.message);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const handleCheckboxChange = (courseId) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAssignCourse = async () => {
    if (!selectedUser || selectedCourses.length === 0) {
      toast.error("Please select a user and at least one course.");
      return;
    }

    try {
      const promises = selectedCourses.map(courseId =>
        axios.post("/maincourse/assignments", {
          userId: selectedUser.value,
          courseId,
        })
      );

      const results = await Promise.all(promises);

      results.forEach(res => {
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      minHeight: '30px',
      height: '30px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '30px',
      padding: '0 12px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '30px',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected ? '#e0e0e0' : 'white',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="text-black text-start p-9 pl-10 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Assign Course to User</h2>
      <div className="mb-4 lg:w-[40%]">
        <Select
          options={users}
          value={selectedUser}
          onChange={setSelectedUser}
          placeholder="Select User"
          isLoading={isLoadingUsers}
          styles={customStyles}
          isClearable
        />
      </div>

      <label className="block text-xl text-black mb-2">Select Courses:</label>
      <div className="mb-4 overflow-y-auto  "style={{ maxHeight: "10rem" }}>
        {isLoadingCourses ? (
          <div className="flex justify-center items-center h-20 ">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={course._id}
                checked={selectedCourses.includes(course._id)}
                onChange={() => handleCheckboxChange(course._id)}
                className="mr-2"
              />
              <label htmlFor={course._id}>{course.courseTitle}</label>
            </div>
          ))
        )}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        onClick={handleAssignCourse}
      >
        Assign Course
      </button>
    </div>
  );
};

export default AssignCourse;