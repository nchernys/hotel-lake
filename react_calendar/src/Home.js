import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const wordsRef = useRef([]);
  const btnRef = useRef();

  useEffect(() => {
    // Animate each word one by one
    gsap.fromTo(
      wordsRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1, // Fade in
        y: 0, // Move to original position
        stagger: 0.5, // Delay between words
        duration: 1, // Duration for each word
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      btnRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1.5, // Start after the words animation
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <>
      <div className="home-image w-full flex flex-col justify-center p-5 md:p-[5rem] lg:p-[10rem] lg:flex-row items-center relative z-1">
        <div className="absolute left-0 top-0 w-full h-full bg-sky-600 opacity-40 sm:opacity-20 lg:opacity-10 z-0"></div>
        <div className="flex flex-col w-full ps-5 text-7xl font-bold text-white md:w-1/2 md:items-center z-10">
          {["Mountain", "Lake", "Resort"].map((word, index) => (
            <span
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              className="font-meaCulpa font-extralight text-7xl xs:text-8xl sm:text-[10rem] sm:font-medium my-2 sm:my-4"
            >
              {word}
            </span>
          ))}
        </div>
        <div
          ref={btnRef}
          className="w-full md:w-1/2 p-7 mt-8 ms-4 sm:mt-14 text-5xl overflow-visible"
        >
          <Link
            className="text-4xl font-serif font-semibold text-white md:flex md:justify-center relative overflow-visible xs:text-5xl sm:text-5xl"
            to="/choose-room"
          >
            <img
              className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-44 w-44 h-auto -z-1 block xs:w-60 xs:min-w-60 md:w-72 md:min-w-72"
              src="./icons/wave-bg-3.svg"
              alt="wave-background"
            />
            <span className="z-10 relative">Book</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
