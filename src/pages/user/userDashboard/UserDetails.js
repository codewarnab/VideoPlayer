import React from "react";

const UserDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ marginLeft: "400px" }}>
      <div
        className="card card-side bg-base-100 shadow-xl ml-24"
        style={{ height: "390px" }}>
        <figure>
          <img
            src="https://media.istockphoto.com/id/1256907593/photo/e-learning.webp?b=1&s=170667a&w=0&k=20&c=l-CJrE8X1t3Vt8x0zfTh_VWzUua-intyRaWJKSebDgU="
            style={{ height: "390px" }}
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.name || user?.firstName + " " + user?.lastName}
          </h2>
          <p>I am a Mern Developer!!</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">{user.role}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
