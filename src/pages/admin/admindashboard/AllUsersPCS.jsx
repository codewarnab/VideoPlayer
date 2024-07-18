import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCardSkeleton = () => (
  <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg animate-pulse">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 mb-2"></div>
      <div className="w-24 h-3 bg-gray-300 mb-1"></div>
      <div className="w-16 h-3 bg-gray-300"></div>
    </div>
  </div>
);

const AllUsersPCS = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('Verified');
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/authpcs/users-pcs");
      setUsers(res.data.users);
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error(`Failed to fetch users: ${err}`);
      setLoading(false); // Handle error by setting loading to false
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter(user => activeTab === 'Verified' ? user.isVerified : !user.isVerified)
    .slice(indexOfFirstUser, indexOfLastUser);

  const handleCardClick = (user) => {
    setSelectedUser(selectedUser && selectedUser._id === user._id ? null : user);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    return nameArray.map(word => word[0].toUpperCase()).join('').slice(0, 2);
  };

  const paginate = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(newPage, Math.ceil(users.length / usersPerPage)));
    });
    setSelectedUser(null);
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = indexOfLastUser >= users.length || currentUsers.length < usersPerPage;

  // Calculate total, verified, and not verified counts
  const totalUsers = users.length;
  const verifiedUsersCount = users.filter(user => user.isVerified).length;
  const notVerifiedUsersCount = totalUsers - verifiedUsersCount;

  const buttonBaseClass = "px-4 py-2 sm:px-6 sm:py-3 rounded text-base font-medium transition-colors duration-200";
  const activeButtonClass = "bg-blue-500 text-white hover:bg-blue-600";
  const disabledButtonClass = "bg-gray-300 text-gray-500 cursor-not-allowed";

  const MinimalistTabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
      <div className="flex justify-center mb-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-gray-600 relative ${activeTab === tab ? 'text-blue-600' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 min-w-full lg:min-h-[33rem] rounded-md flex flex-col justify-between">
      {/* Dashboard Section moved above tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Users Dashboard</h1>
        <div className="flex items-center bg-white shadow px-4 py-2 rounded-lg">
          <span className="text-gray-700 mr-2">Total Users:</span>
          <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {totalUsers}
          </span>
        </div>
        <div className="flex items-center bg-white shadow px-4 py-2 rounded-lg">
          <span className="text-gray-700 mr-2">Verified Users:</span>
          <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {verifiedUsersCount}
          </span>
        </div>
        <div className="flex items-center bg-white shadow px-4 py-2 rounded-lg">
          <span className="text-gray-700 mr-2">Not Verified Users:</span>
          <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {notVerifiedUsersCount}
          </span>
        </div>
      </div>

      <MinimalistTabs
        tabs={['Verified', 'Not Verified']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {loading ? (
            // Render skeleton loading components while loading
            Array.from({ length: usersPerPage }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))
          ) : (
            // Render actual user cards when not loading
            currentUsers.map((user) => (
              <div
                key={user._id}
                className={`bg-white shadow-md p-3 sm:p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 ${user.userType === 'admin' ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleCardClick(user)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${user.userType === 'admin' ? 'bg-yellow-500' : 'bg-blue-500'} flex items-center justify-center text-white text-lg sm:text-xl font-bold mb-2`}>
                    {getInitials(user?.firstName + " " + user?.lastName)}
                  </div>
                  <h2 className="text-gray-800 text-xs sm:text-sm font-semibold text-center">{user.firstName + " " + user.lastName}</h2>
                  <p className="text-gray-500 text-xs">{user.userType}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => paginate('prev')}
          className={`${buttonBaseClass} ${isPrevDisabled ? disabledButtonClass : activeButtonClass}`}
          disabled={isPrevDisabled}
        >
          Previous
        </button>
        <button
          onClick={() => paginate('next')}
          className={`${buttonBaseClass} ${isNextDisabled ? disabledButtonClass : activeButtonClass}`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white flex justify-center items-center flex-col text-black rounded-lg p-4 sm:p-6 max-w-md w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedUser.firstName} {selectedUser.lastName}</h2>
            <div className="text-start">
              <p className="mb-2">
                <span className="text-gray-700 font-semibold">Email: </span>
                {selectedUser.email}
              </p>
              <p className="mb-2">
                <span className="text-gray-700 font-semibold">Phone: </span>
                {selectedUser.phoneNo}
              </p>
              <p className="mb-2">
                <span className="text-gray-700 font-semibold">Employee ID: </span>
                {selectedUser.employeeId}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPCS;
