import React, { useState } from "react";
import UserDetails from "./UserDetails";

const UserDashboard = () => {
  const [select, setSelect] = useState("user");
  return (
    <div className="container-fluid m-3 p-2 flex ">
      <div className="flex ">
        <div className="col-md-3 ">
          <div className="p-12 bg-gray-100 rounded-lg shadow-md w-96 ml-8 fixed ">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              User Panel
            </h4>
            <div
              className="block cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md mb-3 hover:bg-blue-600"
              onClick={(e) => setSelect("user")}>
              <h4>User Details</h4>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto">{select === "user" && <UserDetails />}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
