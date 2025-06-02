import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[80vh] mx-auto -z-10 w-full bg-center bg-no-repeat bg-cover ${styles.noramlFlex}  `}
      style={{
        backgroundImage: `url(banner7.jpg)`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] `}>
        <p className="pt-5 text-[16px]  font-[400] text-lime-800">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
      </div>
    </div>
  );
};

export default Hero;
