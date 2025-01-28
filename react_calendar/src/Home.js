import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ReactComponent as Blob } from "./icons/blobs.svg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const wordsRef = useRef([]);
  const btnRef = useRef();
  const bgRef = useRef();

  useEffect(() => {
    gsap.set([...wordsRef.current, btnRef.current, bgRef.current], {
      opacity: 0,
    });
    if (bgRef.current && wordsRef.current) {
      gsap.fromTo(
        bgRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1, // Fade in
          duration: 0.8, // Duration for each word
          ease: "power2.out",
        }
      );
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
          delay: 1.5,
        }
      );
      gsap.fromTo(
        btnRef.current,
        {
          opacity: 0,
          scaleX: 0.7,
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: 2,
          delay: 3.3, // Start after the words animation
          ease: "elastic.out",
        }
      );
    }
  }, []);

  return (
    <>
      <div className="home-image w-full min-h-[600px] h-[calc(99.5vh-3rem)] flex flex-col justify-center p-5 md:p-[5rem] lg:p-[10rem] gap-4 sm:flex-row items-center relative z-1 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute w-full h-full left-0 top-0 overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src="./images/hotel/hotel-home-5.webp"
            alt="home-hotel-image"
          />
        </div>
        <div className="absolute left-0 top-0 w-full h-full bg-sky-600 opacity-20 sm:opacity-20 lg:opacity-20 z-0"></div>
        <div className="flex flex-col w-full ps-5 text-7xl font-bold text-white md:w-1/2  z-10">
          {["Mountain", "Lake", "Resort"].map((word, index) => (
            <span
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              className="font-meaCulpa font-extralight text-7xl xs:text-8xl sm:text-[7rem] sm:font-medium my-2 sm:my-4 opacity-0 lg:text-[10rem]"
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
            <Blob className="absolute w-[22rem] h-auto md:w-[28rem] left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%]" />
            <span className="z-10 relative">Book</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
