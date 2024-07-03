import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../../images/pcs logo.png";
import Hamburger from 'hamburger-react';
import ProfileDropDown from "./ProfileDropDown";
import SearchInput from "./SearchInput";
import AuthLinks from "./AuthLinks";
import CartDisplay from "./CartDisplay";
import DropDownLg from "./DropDowns/DropDownLg";
import axios from 'axios'
import DropDownSm from "./DropDowns/DropDownSm";


const Navbar = ({ searchTerm, setSearchTerm, cartLength, cartGeneralLength }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("");
    const [navItems, setNavItems] = useState([]);
    const [place, setPlace] = useState('Search For Anything');
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [categories, setCategories] = useState(null);
    const [categoryloading, setcategoryLoading] = useState(true);
    const [isCategoryOpen, setCategoryOpen] = useState(false);

    let location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!(token && user)) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, []);

    useEffect(() => {
        const fetchcategoryData = async () => {
            try {
                const res = await axios.get('/category/getCategory'); 
                if (res.data.success) {
                    setCategories(res.data.categories);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setcategoryLoading(false);
            }
        };

        fetchcategoryData();
    }, []);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setIsActive(location.pathname);
    }, [location.pathname]);

    const handlelogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfully");
        navigate("/authSignin");
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.value || '';
        navigate('/dashboard');
        setPlace(inputValue.trim() === '' ? "Search For Anything" : inputValue.trim());
    };

    const toggleAvatar = () => setIsOpen(!isOpen);

    const handleAdmin = () => {
        navigate("/admin");
        setIsOpen(!isOpen);
    };

    const handleUser = () => {
        navigate("/user");
        setIsOpen(!isOpen);
    };

    const toggleSearchInputVisibility = () => {
        setIsSearchExpanded(!isSearchExpanded);
        if (!isSearchExpanded) {
            setSearchTerm('');
            setPlace('Search For Anything');
        }
    };

    useEffect(() => {
        const getUserFromLocalStorage = () => {
            return localStorage.getItem("user");
        };

        const storedUser = getUserFromLocalStorage();
        const user = storedUser ? JSON.parse(storedUser) : null;

        let updatedNavItems = [
            { id: 1, text: 'Home', link: '/' },
            { id: 1, text: 'All courses', link: '/dashboard' },
            { id: 2, text: 'Be an Instructor', link: '/teach' },
            { id: 3, text: 'Help', link: '/help' },
        ];

        if (user?.role === "Employee") {
            updatedNavItems = [
                { id: 1, text: 'My Courses', link: '/my-course' },
            ];
        }

        setNavItems(updatedNavItems);
    }, [location]);

    const handleClickOutside = (event) => {
        if (!event.target.closest('.nav-search-container')) {
            setIsSearchExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    return (
        <nav className="bg-slate-50 px-3 ">
            <div className="mx-auto max-w-7xl ">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center sm:hidden">
                        <button className="p-1 text-gray-800 hover:text-black focus:outline-none z-[99]" onClick={toggleMobileNav}>
                            <Hamburger size={20} toggled={isMobileNavOpen} toggle={toggleMobileNav} />
                        </button>
                    </div>

                    {/* logo and searchInput Component */}
                    <div className="flex items-center justify-center gap-3">
                        <Link to='/' className="flex-shrink-0 items-center hidden lg:flex">
                            <img className="h-23 w-24" src={images} alt="PcsGlobal360" />
                        </Link>
                        <div className="flex gap-10">
                            <DropDownLg loading={categoryloading} categories={categories} />
                            <SearchInput
                                isSearchExpanded={isSearchExpanded}
                                toggleSearchInputVisibility={toggleSearchInputVisibility}
                                handleSearch={handleSearch}
                                place={place}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </div>
                    </div>

                    {/* Mobile nav list */}
                    {
                        isMobileNavOpen &&
                        <div className={`bg-white h-auto w-[15rem] lg:hidden  flex  items-start flex-col   rounded-lg absolute top-0 left-0 p-5 py-10  z-50 shadow-md transition-transform transform ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.link}
                                    className="block py-2 text-black hover:text-gray-800 transition duration-300"
                                >
                                    <span
                                        className={`relative block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-0 after:scale-x-0 hover:scale-x-100 transition duration-300 origin-center ${isActive === item.link ? 'font-bold underline' : ''}`}
                                    >
                                        {item.text}
                                    </span>
                                </Link>
                            ))}
                            <h1 className="text-black underline decoration-dashed underline-offset-4 " onClick={() => {
                                setIsMobileNavOpen(prevState => !prevState);
                                setCategoryOpen(prevState => !prevState);
                            }
                            }>categories</h1>
                        </div>

                    }

                    <DropDownSm categories={categories} isCategoryOpen ={isCategoryOpen} loading={categoryloading} setCategoryOpen={setCategoryOpen}  setIsMobileNavOpen={setIsMobileNavOpen} />



                    {/* Regular nav list */}
                    <div className="flex ">

                        <div className=" items-center sm:flex gap-4 mr-3 text-black transition-all duration-300 ease-in-out hidden">
                            {navItems.map((item) => (
                                <Link key={item.id} to={item.link}>
                                    <span className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100  hover:border-none pt-1 after:transition after:duration-300 after:origin-center ${isActive === item.link ? 'font-semibold border-b-2  border-black ' : ''}`}>
                                        {item.text}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* AuthLinks or Profile/Cart icons based on user login */}
                        <div className="flex items-center justify-end space-x-3 mr-2 sm:space-x-4">
                            {!localStorage.getItem("token") ? (
                                <AuthLinks isActive={isActive} isSearchExpanded={isSearchExpanded} location={isActive} />
                            ) : (
                                <>
                                    <div className={`flex gap-2 ${isSearchExpanded && 'hidden sm:flex'}`}>
                                        <CartDisplay
                                            cartLength={cartLength}
                                            cartGeneralLength={cartGeneralLength}
                                            user={user}
                                        />
                                        <ProfileDropDown
                                            user={user}
                                            isOpen={isOpen}
                                            toggleAvatar={toggleAvatar}
                                            handlelogout={handlelogout}
                                            handleAdmin={handleAdmin}
                                            handleUser={handleUser}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
