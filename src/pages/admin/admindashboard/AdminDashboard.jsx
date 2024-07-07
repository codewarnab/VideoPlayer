import React, { useState, lazy, Suspense } from "react";
import AdminDetails from "./AdminDetails";

const CreateDashboard = lazy(() => import("./CreateDashboard"));
const CreatePlaylist = lazy(() => import("./CreatePlaylist"));
const ShowAllUsers = lazy(() => import("./ShowAllUsers"));
const AllUsersPCS = lazy(() => import("../../../pcsPages/AllUsersPCS"));
const CreateMyCourse = lazy(() => import("./CreateMyCourse"));
const AssignCourse = lazy(() => import("./AssignCourse"));
const CreateCategory = lazy(() => import("./CreateCategory"));
const CreateSubCategory = lazy(() => import("./CreateSubCategory"));
const CreateSubSubCategory = lazy(() => import("./CreateSubSubCategory"));
const AddFestival = lazy(() => import("../../../TopScript/AddFestival"));
const CreateCourse = lazy(() => import("./CreateCourse"));

const AdminDashboard = () => {
  const [select, setSelect] = useState("admin");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { key: "admin", label: "Admin Details" },
    { key: "assign", label: "Assign Course" },
    { key: "dashboard", label: "Create Dashboard" },
    { key: "course", label: "Create Course" },
    { key: "playlist", label: "Create Playlist" },
    { key: "users", label: "All Users" },
    { key: "users-pcs", label: "All PCS Global's Users" },
    { key: "categories", label: "Create Category" },
    { key: "subcategories", label: "Create subCategory" },
    { key: "subsubcategories", label: "Create SubSubCategory" },
    { key: "festival", label: "Add Festival" },
  ];

  const getButtonClass = (buttonName) => {
    return `block cursor-pointer py-2 px-4 text-white rounded-md mb-3 ${select === buttonName ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
      }`;
  };

  const renderComponent = () => {
    switch (select) {
      case "admin":
        return <AdminDetails />;
      case "assign":
        return <Suspense fallback={<div>Loading...</div>}><AssignCourse /></Suspense>;
      case "dashboard":
        return <Suspense fallback={<div>Loading...</div>}><CreateDashboard /></Suspense>;
      case "course":
        return <Suspense fallback={<div>Loading...</div>}><CreateCourse /></Suspense>;
      case "mycourse":
        return <Suspense fallback={<div>Loading...</div>}><CreateMyCourse /></Suspense>;
      case "playlist":
        return <Suspense fallback={<div>Loading...</div>}><CreatePlaylist /></Suspense>;
      case "users":
        return <Suspense fallback={<div>Loading...</div>}><ShowAllUsers /></Suspense>;
      case "users-pcs":
        return <Suspense fallback={<div>Loading...</div>}><AllUsersPCS /></Suspense>;
      case "categories":
        return <Suspense fallback={<div>Loading...</div>}><CreateCategory /></Suspense>;
      case "subcategories":
        return <Suspense fallback={<div>Loading...</div>}><CreateSubCategory /></Suspense>;
      case "subsubcategories":
        return <Suspense fallback={<div>Loading...</div>}><CreateSubSubCategory /></Suspense>;
      case "festival":
        return <Suspense fallback={<div>Loading...</div>}><AddFestival /></Suspense>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-4">
      <div className="w-full md:w-1/4 mb-4 md:mb-0 p-3">
        <div className="bg-gray-100 rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg text-center font-semibold text-gray-800">Admin Panel</h4>
            <button
              className="md:hidden bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden md:block
              ${menuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'}`}
          >
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={getButtonClass(item.key)}
                onClick={() => {
                  setSelect(item.key);
                  setMenuOpen(false);
                }}
              >
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:min-h-[40rem] flex justify-center items-center md:w-3/4 md:pl-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;