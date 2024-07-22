import React from "react";
import { motion } from "framer-motion";

import { default as I2 } from "../../images/Illustration2.svg";
import { default as I1 } from "../../images/Illustration1.svg";
import { default as I3 } from "../../images/Illustration3.svg";
import { default as I4 } from "../../images/Illustration4.svg";

const Construct = () => {
    const SLOW = 44;
    const AVG = 33;
    const FAST = 22;

    return (
        <div className="flex justify-center w-full mx-auto relative min-h-[34rem] bg-white">
            <h1 className="text-black font-bold lg:text-3xl text-2xl mt-6"> This Page is Currently Under Construction </h1>
            <motion.div
                className="absolute left-50 top-[30%]"
                animate={{ y: SLOW }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
                <img src={I4} alt="Illustration 4" />
            </motion.div>

            <motion.div
                className="absolute left-50 top-[34%]"
                animate={{ y: SLOW }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
                <img src={I3} alt="Illustration 3" />
            </motion.div>

            <motion.div
                className="absolute left-50 top-[16%]"
                animate={{ y: AVG }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
                <img src={I2} alt="Illustration 2" />
            </motion.div>

            <motion.div
                className="absolute left-50 top-[25%]"
                animate={{ y: FAST }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
                <img src={I1} alt="Illustration 1" />
            </motion.div>
        </div>
    );
};

export default Construct;
