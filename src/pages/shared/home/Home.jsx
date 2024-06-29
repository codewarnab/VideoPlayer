import React from "react";
import image from "../../../images/alok_sir.jpg";
import Carousel from "./Carousel";
import Stats from "./Stats";
import FAQ from "./faq/FAQ";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div
          className="flex p-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 3, 124, 1) 0%, rgba(151, 218, 255, 1) 61%, rgba(255, 255, 255, 1) 95%)",
          }}
        >
          <div className="mr-8">
            <img
              src={image}
              alt="Alok Halder"
              className="rounded-2xl object-cover w-auto h-88"
            />
          </div>
          <div className="rounded-3xl bg-gray-100 p-4 w-1/2 mx-auto">
            <div className="px-5">
              <h2 className="text-[2.4vw] font-bold mb-2">
                WELCOME TO PCS GLOBAL PVT LTD
              </h2>
              <h3 className="text-[1vw] italic">
                "The House I have built where every unplaced fresher, who are
                suffering multiple problems with their career can get a peaceful
                shelter to rebuild a massive career"
              </h3>
              <h3 className="text-[1.5vw]">- Alok Halder (Founder)</h3>
              <div className="flex justify-center">
                <a
                  className="flex items-center justify-center hover:bg-blue-100 w-[70%] rounded-3xl"
                  href="https://www.youtube.com/@PCSGlobalPrivateLimited"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-20"
                    src={require("../../../images/vecteezy_youtube-logo-png-youtube-icon-transparent_18930572.png")}
                    alt="YouTube Channel"
                  />
                  <h3 className="text-gray-800 hover:text-blue-600">
                    Visit our YouTube channel
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 w-full flex justify-center bg-white h-auto">
          <Stats/>
        </div>
        <div className="py-20 w-full flex justify-center bg-white h-auto">
          <Carousel />
        </div>
        <div className="py-20 w-full flex justify-center bg-white h-auto">
          <FAQ/>
        </div>
      </div>
      {/* <Projects /> */}
    </div>
  );
};

export default Home;
