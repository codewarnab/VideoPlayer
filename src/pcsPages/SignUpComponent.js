import React from "react";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
  return (
    <div className="relative mt-7 mb-7">
      <div
        className="flex justify-end bg-blue-300 drop-shadow-2xl rounded-2xl gap-24 h-[450px] lg:w-[85%] lg:ml-[6.3rem] left-0 right-0 relative"
      >
        <div className="hidden md:block">
          <h1> image is not avaialbel</h1>
        </div>

        <div className="md:px-20 md:gap-8 bg-slate-100 flex justify-center rounded-2xl">
          <h1 className="text-2xl font-bold absolute py-4">SIGN UP AS</h1>
          <Link to="/register-pcs" className="col-6 flex items-center hover:text-lg">
            <div
              className="hover:bg-blue-100 py-3 my-1 clickable-item px-2 mx-1 hover:bg-opacity-60 hover:border-blue-500 rounded-lg justify-between"
              style={{
                transition: "border 0.3s, background-color 0.3s , text 2s"
              }}
            >
              <div className="col-md-6 col-12">
                <div className="w-full h-full">
                  <img
                    className="height-intoggle intoggle-sign-img1 h-52 w-auto object-contain"
                    src={require('../images/pcs logo.png')}
                    alt="PCS Logo"
                  />
                </div>
              </div>
              <div className="col-md-6 p-0 col-12">
                <p className="text-center text-gray-700 mb-1">I am</p>
                <h5 className="text-center font-bold">PCS Employee</h5>
              </div>
            </div>
          </Link>

          <Link to="/register" className="col-6 flex items-center hover:text-lg">
            <div
              className="hover:bg-blue-100 py-3 my-1 clickable-item px-2 mx-1 hover:bg-opacity-60 hover:border-blue-500 rounded-lg justify-between"
              style={{
                transition: "border 0.3s, background-color 0.3s , text 2s"
              }}
            >
              <div className="col-md-6 col-12">
                <div className="w-full h-full">
                  <img
                    className="height-intoggle intoggle-sign-img1 h-52 w-auto object-contain"
                    src={require('../images/User.png')}
                    alt="User"
                  />
                </div>
              </div>
              <div className="col-md-6 p-0 col-12">
                <p className="text-center text-gray-700 mb-1">I am</p>
                <h5 className="text-center font-bold">General User</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
