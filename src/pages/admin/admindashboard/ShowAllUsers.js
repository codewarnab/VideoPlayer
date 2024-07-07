import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowAllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/auth/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error(`Failed to fetch dashboards: ${err}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className=" ml-24 -translate-y-6"
      style={{ marginLeft: "80px", marginTop: "1.5rem" }}>
      <div className="indicator" style={{ marginRight: "800px" }}>
        <span className="indicator-item badge badge-secondary">
          {users.length}
        </span>
        <button className="btn">Login Users</button>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>
      <div>
        <div
          className="overflow-x-auto overflow-scroll"
          style={{ height: "22rem", width: "52rem" }}>
          <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email_Id</th>
                <th></th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-gray-500 text-neutral-content rounded-full w-10">
                          <span className="text-xl">
                            {user.name.slice(0, 1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.email}
                    <br />
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowAllUsers;
