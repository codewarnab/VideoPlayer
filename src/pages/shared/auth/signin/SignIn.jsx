import React, { useState,lazy,Suspense,useContext} from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import LoginAnimation from './LoginAnimation.json'
import {UserContext} from "../../../../utils/contexts/userContext";
const Lottie = lazy(() => import("lottie-react"));


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {loginuser} = useContext(UserContext);


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Enter a Valid Email');
            return;
        }
        setError('');

        const isOfficialEmail = email.endsWith('@pcsgpl.com');

        try {
            const url = isOfficialEmail ? "/authpcs/login-pcs" : "/auth/login";
            const res = await axios.post(url, { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                loginuser(res.data.user, res.data.token);
                navigate("/dashboard");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full bg-gradient-to-b from-slate-50 to-[#C1C5F2] flex justify-center flex-col gap-4 items-center min-h-auto py-14">
            <div className="w-full lg:h-auto font-poppins flex flex-col lg:flex-row">
                {/* left section */}
                <div className="flex  justify-center items-center lg:w-1/2 w-full">
                    <div className=" bg-blue-50 bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md rounded-lg p-5 w-full max-w-md">
                        <div className="flex gap-1 items-center mb-4">
                            <h1 className="font-semibold text-3xl leading-tight text-black">Sign In</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <form className="space-y-4 opacity-80" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter Email*"
                                    value={email}
                                    autoComplete='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                                />
                                <input
                                    type="password"
                                    placeholder="Enter Password*"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300">
                                    Sign In
                                </button>
                            </form>
                            <p className="text-gray-500 text-xs font-bold mt-4">
                                Don't have an account?
                                <a
                                    href="/signup"
                                    className="text-blue-500 cursor-pointer hover:font-semibold transition-all ease-in-out tracking-wider text-sm underline inline-block mx-1"
                                >
                                    Sign up now!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                {/* right section */}
                <div className="hidden lg:flex justify-center items-center lg:w-1/2">
                    <div className=" rounded-lg  w-[85%] h-[100%] shadow-sm pr-2 overflow-hidden object-cover   bg-blue-50 bg-opacity-20 backdrop-filter backdrop-blur-lg">

                        <Suspense fallback={<div className='lg:min-h-[100%] lg:min-w-[85%]' ></div>}>
                            <Lottie animationData={LoginAnimation} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
