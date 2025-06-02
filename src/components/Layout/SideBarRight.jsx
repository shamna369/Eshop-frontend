/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";

function SideBarRight({ setIsSideBar, isSideBar }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 800px:hidden ">
      <div
        className={`absolute top-0 left-0 z-20  bg-white shadow-sm pb-4 w-[16rem] 800px:hidden 
        ${
          isSideBar ? "translate-x-0" : "-translate-x-full"
        } transform translate-y-0  transition-transform duration-300 ease-in-out`}
      >
        <div className="h-[9rem] py-3 bg-blue-200 w-full mb-1  text-blue-900">
          <span className=" absolute top-1 left-[12rem] cursor-pointer">
            <IoIosCloseCircle
              className="text-blue-800 text-[2rem]"
              onClick={() => {
                setIsSideBar(false);
              }}
            />
          </span>
          <ul className="flex items-center justify-center gap-1  flex-col font-semibold">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allProducts">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin </NavLink>
            </li>
          </ul>

          <div className="gap-1 font-semibold flex items-center justify-center capitalize">
            {isAuthenticated ? (
              <div>
                <NavLink to="/profile">profile</NavLink>
              </div>
            ) : (
              <>
                <NavLink to="/login">Login/</NavLink>
                <NavLink to="/register">Sign up</NavLink>
              </>
            )}
          </div>
        </div>
        <div className="px-2">
          {" "}
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default SideBarRight;
