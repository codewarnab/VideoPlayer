import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/shared/home/HomeMain';
import Layout from './pages/Layout';
import axios from 'axios';
import Dashboard from './pages/user/AllCourses/AllCourses';
import AdminDashboard from './pages/admin/admindashboard/AdminDashboard';
import PageNotFound from './pages/shared/PageNotFound';
import { Toaster } from 'react-hot-toast';
import Help from './pages/shared/help/Help';
import Forgetpassword from './pages/shared/auth/Forget-password';
import ResetPassword from './pages/shared/auth/ResetPassword';
import MyCourse from './pcsPages/MyCourse';
import UserDashboard from './pages/user/userDashboard/UserDashboard';
import SignUp from './pages/shared/auth/signup/SiignUp';
import SignIn from './pages/shared/auth/signin/SignIn';
import LoginPCS from './pcsPages/LoginPCS';
import ForgetpasswordPCS from './pcsPages/ForgetPasswordPCS';
import ResetPasswordPCS from './pcsPages/ResetPasswordPCS';
import EnrollmentForm from './form/EnrollmentForm';
import Review from './Comment/Review';
import EnrollNow from './TopScript/EnrollNow';
import CourseForm from './pages/user/enlist-course/CourseForm';
import Instructor from './pages/shared/Instructor';
import Payment from './TopScript/Payment';
import Construct from './pages/shared/Construct';
import CartPage from '../src/components/shared/Cart/CartPage';
import CartGeneralPage from '../src/components/shared/Cart/CartGeneral';
import Unauthorized from './pages/shared/Unauthorized';
import CourseDescription from './pages/user/AllCourses/CourseDescription';
import { CategoryProvider } from './utils/contexts/categoryContext';
import { UserProvider } from './utils/contexts/userContext';
import VideoPlayer from './pages/user/AllCourses/VideoPlayer';
import Category from './pages/shared/categories/Category';

// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = "https://pcs-global360-server.vercel.app/";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cartLength, setCartLength] = useState(0);
    const [cartGeneralLength, setCartGeneralLength] = useState(0);
    const [rie, setRie] = useState(0);

    return (
        <div className="App">
            <BrowserRouter>
                <Toaster />
                <UserProvider>
                    <CategoryProvider>
                        <Layout
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            cartLength={cartLength}
                            cartGeneralLength={cartGeneralLength}
                        >
                            <Routes>
                                <Route path="/construct" element={<Construct />} />
                                <Route path="/enrollnow" element={<EnrollNow />} />
                                <Route path="/dashboard/:descriptionId" element={<CourseDescription />} />
                                <Route path="/category/:categoryName/:descriptionId" element={<CourseDescription />} />
                                <Route path="/dashboard/:descriptionId/:ytPlayListId" element={<VideoPlayer />} />
                                <Route path="/cart" element={<CartPage setCartLength={setCartLength} />} />
                                <Route path="/cartgeneral" element={<CartGeneralPage setCartGeneralLength={setCartGeneralLength} />} />

                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard searchTerm={searchTerm} setSearchTerm={setSearchTerm} rie={rie} />}
                                />
                                <Route
                                    path="/my-course"
                                    element={<MyCourse searchTerm={searchTerm} />}
                                />
                                <Route path="/category/:categoryName" element={<Category />} />                                                           
                                <Route path="/subcategory/:subcategoryName" element={<Category />} />                                                           
                                <Route path="/subsubcategory/:subsubcategoryName" element={<Category />} />                                                           
                                <Route path="/enlist-course" element={<CourseForm />} />
                                <Route path="/admin" element={<AdminDashboard />} />

                                <Route path="/user" element={<UserDashboard />} />

                                <Route path="/enroll" element={<EnrollmentForm />} />

                                <Route path="/unauthorized" element={<Unauthorized />} />
                                <Route path="/payment" element={<Payment />} />
                                <Route path="/teach" element={<Instructor />} />

                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/signin" element={<SignIn />} />

                                <Route path="/login-pcs" element={<LoginPCS />} />
                                <Route path="/register" element={<SignUp />} />
                                <Route path="/login" element={<SignIn />} />
                                <Route path="/forgot-password" element={<Forgetpassword />} />
                                <Route path="/forgot-password-pcs" element={<ForgetpasswordPCS />} />
                                <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                                <Route path="/reset-password-pcs/:id/:token" element={<ResetPasswordPCS />} />
                                <Route path="/help" element={<Help />} />
                                <Route path="/feedback" element={<Review />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </Layout>
                    </CategoryProvider>
                </UserProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
