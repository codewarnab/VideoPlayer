import React, { Fragment } from "react";
// import Navbar from "../components/Navbar";
import Footer from "./Footer";

import Navbar3 from "../components/shared/navbar/Navbar";
import TopBanner from "../TopScript/TopBanner";

const Layout = ({ children, searchTerm, setSearchTerm, setDropdown, cartLength, cartGeneralLength }) => {
  return (
    <>
      <header
        className="mx-auto">
        <TopBanner/>
        <Navbar3
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
