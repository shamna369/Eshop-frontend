import { Link } from "react-router-dom";

import { useState } from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
function Header() {
  return (
    <div className=" max-h-[20vh] sm:max-h-[25vh] 800px:max-h-[30vh] mb-4 ">
      <div className="w-11/12 mx-auto border-2 p-2 rounded bg-white shadow-xl">
        <div className="flex items-center justify-between relative py-2 ">
          <Link to="/home">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />
          </Link>
          <SearchBar />
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default Header;
