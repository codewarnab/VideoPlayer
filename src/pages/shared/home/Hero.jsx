import React from "react";
import image from "../../../images/alok_sir.jpg";
import CustomLink from "../../../components/shared/buttons/linkButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const HeroSection = () => {
    const style = {
        content: '""',
        position: 'absolute',
        width: '80%',
        borderTop: 'solid 3px blue',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-10px',
        borderRadius: '60%',
        height: '8px',
    };

    return (
        <div className="bg-white w-full lg:h-svh sm:h-5/6  font-poppins border-black  flex flex-col lg:flex-row px-4 py-8 lg:px-5">
            {/* left section */}
            <div className="flex flex-col lg:w-1/2 p-4 lg:p-5 relative mb-8  lg:mb-0">
                <div className="lg:absolute lg:top-[10rem] left-0 lg:left-8 flex flex-col gap-6 lg:gap-9 text-start">
                    <h1 className="text-black font-extrabold text-3xl lg:text-4xl break-words whitespace-pre-wrap max-w-full lg:max-w-[90%] relative">
                        WELCOME TO PCS GLOBAL <span className="text-xs  text-blue-500 font-semibold"> 360</span>
                        <div className="hidden lg:flex ">
                        <span style={style} />
                        </div>
                    </h1>
                    <h2 className="whitespace-pre-wrap max-w-full lg:max-w-[80%] text-gray-600 leading-snug font-poppins text-sm lg:text-base">
                        <b>"</b>The House I have built where every unplaced <b>fresher</b>, who are suffering multiple problems with their career, can get a peaceful shelter to rebuild a massive career<b>"</b>
                    </h2>
                    <div className="w-full lg:w-[70%]">
                        <CustomLink to="https://www.youtube.com/@PCSGlobalPrivateLimited" external>
                            Visit Our YouTube Channel
                        </CustomLink>
                    </div>
                </div>
            </div>

            {/* right section */}
            <div className="flex justify-center items-center lg:w-1/2 ">
                <div className="flex justify-center flex-col items-center w-full lg:mb-20  ">
                    <LazyLoadImage
                        src={image}
                        alt="Alok Halder"
                        className="rounded-2xl object-cover w-full h-auto max-h-[25rem] lg:w-[90%] lg:h-[25rem]"
                        effect="blur"
                    />
                    <div className="w-full flex flex-wrap justify-center lg:justify-evenly pt-4 text-black text-sm lg:text-base">
                        <span className="px-2 py-1">Educator</span>
                        <span className="px-2 py-1">Mentor</span>
                        <span className="px-2 py-1">Software Engineer</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;