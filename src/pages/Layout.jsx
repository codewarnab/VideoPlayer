import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/navbar/Navbar";
import TopBanner from "../TopScript/TopBanner";

const Layout = ({ children, searchTerm, setSearchTerm, setDropdown, cartLength, cartGeneralLength }) => {
  return (
    <>
      <header
        className="mx-auto">
        <TopBanner/>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDropdown={setDropdown}
          cartLength={cartLength}
          cartGeneralLength={cartGeneralLength}
        />
      </header>
      <main>{children}</main>
      <Footer /> 
    </>
  );
};

export default Layout;
