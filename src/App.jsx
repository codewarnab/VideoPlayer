import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/shared/home/Home";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import ProtectedDashboard from "./components/ProtectedDashboard";

import Dashboard from "./pages/user/AllCourses/AllCourses";
//import CreateDashboard from "./admindashboard/CreateDashboard";

import { useEffect } from "react";
import CourseDetails from "./components/CourseDetails";
import AdminDashboard from "./admindashboard/AdminDashboard";
//import ShowAllUsers from "./admindashboard/ShowAllUsers";
//import CreatePlaylist from "./admindashboard/CreatePlaylist";
import ProtectedAdmin from "./components/ProtectedAdmin";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
//import AdminCategory from "./admindashboard/AdminCategory";
import Help from "./help/Help";
import DropDashboard from "./dropdown/DropDashboard";
import Forgetpassword from "./pages/Forget-password";
import ResetPassword from "./pages/ResetPassword";
import MyCourse from "./pcsPages/MyCourse";
import ProtectedUser from "./components/ProtectedUser";
import UserDashboard from "./userDashboard/UserDashboard";
import SignUpComponent from "./pcsPages/SignUpComponent";
import SignInComponent from "./pcsPages/SignInComponent";
import RegisterPCS from "./pcsPages/RegisterPCS";
import LoginPCS from "./pcsPages/LoginPCS";
import ForgetpasswordPCS from "./pcsPages/ForgetPasswordPCS";
import ResetPasswordPCS from "./pcsPages/ResetPasswordPCS";
import EnrollmentForm from "./form/EnrollmentForm";
import ProtectedEnroll from "./components/ProtectedEnroll";
import EmployeeInformation from "./pcsPages/EmployeeInformation";
import UserPCSDetails from "./pcsPages/UserPCSDetails";
import Review from "./Comment/Review";
import EnrollNow from "./TopScript/EnrollNow";

// axios.defaults.baseURL = "http://3.212.222.137";
import Instructor from "./Instructor/Instructor";
import Payment from "./TopScript/Payment";
import Construct from "./pages/Construct";
import CartPage from "./Cart/CartPage";
import CartGeneralPage from "./Cart/CartGeneral";
import CourseDescription from "./admindashboard/CourseDescription";
// axios.defaults.baseURL = "https://lms-backend-bcn2.onrender.com";
axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "http://107.22.154.213";

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displaydown, setDropdown] = useState([]);
  const [userId, setUserId] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const [cartGeneralLength, setCartGeneralLength] = useState(0);
  const [rie, setRie] = useState(0);
  const [item, setItem] = useState("");


  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCartDetails = async () => {
    try {
      const res = await axios.get(`/cart/get-cart/${user._id}`);
      setCartLength(res?.data?.cart?.length)
    } catch (err) {
      console.error(`Failed to fetch cart details: ${err}`);
    }
  };
  const fetchgeneralCartDetails = async () => {
    try {
      const res = await axios.get(`/cartgeneral/get-cart/${user._id}`);
      setCartGeneralLength(res?.data?.cart?.length)
    } catch (err) {
      console.error(`Failed to fetch cart details: ${err}`);
    }
  };

  useEffect(() => {

    if (user && !user.employeeId) {
      fetchgeneralCartDetails()
    }
    fetchCartDetails();

  }, []);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get("/maincourse/allCourse");
      setPlaylist(res?.data?.playlist);
    } catch (err) {
      console.error(`Failed to fetch dashboards: ${err}`);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Layout
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDropdown={setDropdown}
          cartLength={cartLength}
          cartGeneralLength={cartGeneralLength}>
          <Routes>
            <Route path="/construct" element={<Construct />} />
            <Route path="/enrollnow" element={<EnrollNow />} />
            <Route path="/description" element={<CourseDescription item={item} setSearchTerm={setSearchTerm} />} />

            <Route path="/cart" element={<CartPage setCartLength={setCartLength} />} />
            <Route path="/cartgeneral" element={<CartGeneralPage setCartGeneralLength={setCartGeneralLength} />} />

            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<Dashboard searchTerm={searchTerm} setSearchTerm={setSearchTerm} rie={rie} setItem={setItem} />}
            />

            <Route
              path="/my-course"
              element={<MyCourse searchTerm={searchTerm} />}
            />
            <Route
              path="/drop-dashboard"
              element={<DropDashboard
                displaydown={displaydown}
                cartLength={cartLength}
                setCartLength={setCartLength}
                cartGeneralLength={cartGeneralLength}
                setCartGeneralLength={setCartGeneralLength}
                setItem={setItem}

              />}
            />



            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedUser />}>
              <Route path="/user" element={<UserDashboard />} />
            </Route>

            <Route element={<ProtectedEnroll />}>
              <Route path="/enroll" element={<EnrollmentForm />} />
            </Route>



            <Route element={<ProtectedDashboard />}>
              {playlist?.map((a) => {
                return (
                  <Route
                    path={a.path}
                    element={<CourseDetails listobject={a} setRie={setRie} />}
                  />
                );
              })}

              <Route path="/payment" element={<Payment />} />
              <Route path="/teach" element={<Instructor />} />

            </Route>

            <Route path="/authSignup" element={<SignUpComponent />} />
            <Route path="/authSignin" element={<SignInComponent />} />
            <Route path="/register-pcs" element={<RegisterPCS setUserId={setUserId} />} />
            {userId && <Route path="/employee" element={<EmployeeInformation userId={userId} />} />}
            {/* <Route path="/employee" element={<EmployeeInformation userId={userId} />} /> */}

            <Route path="/login-pcs" element={<LoginPCS />} />
            {/* <Route path="/user/:_id" element={<UserPCSDetails />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgetpassword />} />
            <Route
              path="/forgot-password-pcs"
              element={<ForgetpasswordPCS />}
            />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/reset-password-pcs/:id/:token"
              element={<ResetPasswordPCS />}
            />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Review />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
