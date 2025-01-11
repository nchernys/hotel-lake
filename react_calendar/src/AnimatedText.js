import React, { useEffect, useRef } from "react";
import anime from "animejs";

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll("span");

    anime.timeline({ loop: false }).add({
      targets: letters,
      opacity: [0, 1],
      translateY: ["1em", 0],
      easing: "easeOutExpo",
      duration: 750,
      delay: (el, i) => 50 * i,
    });
  }, []);

  return (
    <div className="text-4xl font-bold">
      <span ref={textRef}>
        {text.split("").map((char, index) => (
          <span key={index} className="inline-block opacity-0">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

export default AnimatedText;
