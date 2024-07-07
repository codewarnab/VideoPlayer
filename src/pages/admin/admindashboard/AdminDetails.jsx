import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AuraOnlineSearch from '../../../images/Allura - Online Searching.png'

const ImageLoader = ({ src, alt, className }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    className={className}
  />
);

const AdminDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col p-4 w-full max-w-2xl mx-auto shadow-xl rounded-md  bg-gray-100 mb-4">
      <Suspense fallback={<div className="w-full h-48 bg-gray-200 animate-pulse"></div>}>
        <ImageLoader
          src={AuraOnlineSearch}
          alt="AuraOnline Search Illustration"
          className="w-full min-w-full min-h-auto h-auto"
        />
      </Suspense>
      <div className="text-black mt-4">
        <p className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Welcome to Admin Dashboard
        </p>
        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-400 font-extrabold tracking-widest">
          {user?.name || `${user?.firstName} ${user?.lastName}`}
        </h2>
      </div>
    </div>
  );
};

export default AdminDetails;