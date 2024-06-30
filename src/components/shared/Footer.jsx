import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-8 px-4 rounded-t-3xl  bottom-0 left-0 w-full ">

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* logo and text  */}
          <div className="mb-6 md:mb-0 flex flex-col justify-center items-center">
            <div>
              <Link to="/" className="flex items-center">
                <img src={require("../../images/pcs logo.png")} alt="Pcsglobal360" className="h-20 mr-2 w-20 ml-3" />
                <span className="text-xl font-bold">PcsGlobal360</span>
              </Link>
              <p className="mt-2 max-w-xs">
                Speed up the skill acquisition process by finding unlimited courses that matches your niche.
              </p>
            </div>
          </div>
          {/* other links  */}
          <div>
            <div className="grid grid-cols-3 gap-8 text-start">
              <div>
                <h3 className="text-lg font-bold mb-2">Company</h3>
                <ul className="space-y-2 text-sm ">
                  <li><Link to="/construct">About PCS Global Pvt Ltd</Link></li>
                  <li><Link to="/construct">We're Hiring</Link></li>
                  <li><Link to="/construct">Blog</Link></li>
                  <li><Link to="/construct">Support</Link></li>
                  <li><Link to="/construct">Press</Link></li>
                  <li><Link to="/construct">Affiliates</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Resources</h3>
                <ul className="space-y-2 text-sm ">
                  <li><Link to="/construct">PCS Global Business</Link></li>
                  <li><Link to="/construct">Teach on PCS Global</Link></li>
                  <li><Link to="/construct">Get the app</Link></li>
                  <li><Link to="/construct">About us</Link></li>
                  <li><Link to="/construct">Contact us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Programs</h3>
                <ul className="space-y-2 text-sm ">
                  <li><Link to="/construct">PCS Global Business</Link></li>
                  <li><Link to="/construct">Teach on PCS Global</Link></li>
                  <li><Link to="/construct">Get the app</Link></li>
                  <li><Link to="/construct">Marketing</Link></li>
                  <li><Link to="/construct">And more</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* below footter section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; PCS GLOBAL PVT LTD, Inc.</p>
          <Link to="/construct" className="text-sm mt-2 md:mt-0">Terms & Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;