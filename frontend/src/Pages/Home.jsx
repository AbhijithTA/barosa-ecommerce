import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Homebg1 from "../assets/img1.jpg";
import Homebg2 from "../assets/img2.jpg";
import Homebg3 from "../assets/img3.jpg";

const textAnimation = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

const backgrounds = [
  { image: Homebg1, heading: "EXCLUSIVE STYLE FOR YOU" },
  { image: Homebg2, heading: "CUSTOM MADE ELEGANCE" },
  { image: Homebg3, heading: "EMBRACE LUXURY" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="h-screen w-screen bg-no-repeat bg-cover flex items-center relative justify-center"
        style={{ backgroundImage: `url(${backgrounds[currentIndex].image})` }}
        initial={{ backgroundSize: "120%" }}
        animate={{ backgroundSize: "100%" }}
        transition={{ duration: 2 }}
      >
        <div className="z-10 flex flex-col w-1/2 ml-10 text-center border-2 border-black">
          <motion.h1
            key={currentIndex}
            className="text-4xl md:text-6xl font-orbitron text-white text-center"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
            variants={textAnimation}
          >
            {backgrounds[currentIndex].heading}
          </motion.h1>
          <motion.p
            className="text-white mt-4 text-center"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 1 }}
            variants={textAnimation}
          >
            WELCOME TO THE WORLD OF LUXURY BLAH BLAH BLAH
          </motion.p>
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {backgrounds.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-black"
                  : "bg-gray-400 opacity-60"
              }`}
            ></span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
