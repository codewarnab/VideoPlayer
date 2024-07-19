import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/navbar/Navbar";
import TopBanner from "../components/shared/TopBanner";
import { CategoryProvider } from "../utils/contexts/categoryContext";

const Layout = ({ children, searchTerm, setSearchTerm,  cartLength, cartGeneralLength }) => {
  return (
    <>
      <header
        className="mx-auto ">
        <TopBanner />
        <CategoryProvider>
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            cartLength={cartLength}
            cartGeneralLength={cartGeneralLength}
          />
        </CategoryProvider>

      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
