import React from 'react';
import Lottie from "lottie-react";
import userInterFaceAnimation from './employee.json';

const SignUpFrontSection = ({ setUserType, setShowFront }) => {

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-6 min-h-[28rem] lg:h-44 mb-11 w-svw">
            <div className=' w-full lg:w-1/2 '>
                <h1 className="lg:text-3xl text-3xl font-extrabold relative md:text-3xl text-black text-center">
                    Sign Up and Start Learning <br className="md:hidden" /><span className="text-sm font-semibold text-blue-500">As</span>
                </h1>

                <div className="flex flex-col md:flex-row p-4 md:p-16 justify-evenly lg:pr-24">
                    <div className="flex flex-col items-center">
                        <img src={require("../../../../images/pcs logo.png")} alt="Pcsglobal360" className="h-40 mx-3 mt-5 w-40" />
                        <button
                            className="mt-3 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                            onClick={() => {
                                setUserType('Administrator');
                                setShowFront(false);
                            }}
                        >
                            PCS Employee
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-8 p-4 pt-5 md:mt-0 md:ml-6">
                        <img src={require("../../../../images/User.png")} alt="Pcsglobal360" className="h-40 mx-3 w-40" />
                        <button
                            className="mt-3 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                            onClick={() => {
                                setUserType('User');
                                setShowFront(false);
                            }}
                        >
                            General User
                        </button>
                    </div>
                </div>
            </div>
            <div className=' w-1/2 pb-11 hidden lg:flex '>
                <Lottie animationData={userInterFaceAnimation} />
            </div>
        </div>
    );
};

export default SignUpFrontSection;
