import React, { useState, useEffect } from "react";
import axios from "axios";
import UserPCSDetails from "../../../pcsPages/UserPCSDetails";

const AllUsersPCS = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setUsersPerPage(2);
      } else if (window.innerWidth < 1024) {
        setUsersPerPage(3);
      } else {
        setUsersPerPage(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleCardClick = (userId) => {
    setSelectedUserId((prevSelectedUserId) =>
      prevSelectedUserId === userId ? null : userId
    );
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    return nameArray.map(word => word[0].toUpperCase()).join('').slice(0, 2);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/authpcs/users-pcs");
      setUsers(res.data.users);
    } catch (err) {
      console.error(`Failed to fetch users: ${err}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const paginate = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(newPage, Math.ceil(users.length / usersPerPage)));
    });
    setSelectedUserId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">{users.length}</span>
          <button className="btn btn-primary">Login Users</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentUsers.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-xl cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCardClick(user._id)}
          >
            <div className="card-body items-center text-center p-4">
              <div className="avatar mb-3">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                  {getInitials(user?.firstName + " " + user?.lastName)}
                </div>
              </div>
              <h2 className="card-title text-sm">{user.firstName + " " + user.lastName}</h2>
              <p className="text-xs mt-1">{user.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => paginate('prev')}
          className="btn btn-outline"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate('next')}
          className="btn btn-outline"
          disabled={indexOfLastUser >= users.length}
        >
          Next
        </button>
      </div>

      {selectedUserId && (
        <div className="mt-8">
          <UserPCSDetails _id={selectedUserId} />
        </div>
      )}
    </div>
  );
};

export default AllUsersPCS;