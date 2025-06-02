/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
function NavItems({ setIsCartOpen }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cart = useSelector((state) => state.cart.cartItems);
  return (
    <div className=" hidden 800px:flex 800px:items-center 800px:justify-between  md:w-[70%]">
      <div className="hidden 800px:block text-white">
        <ul className="flex items-center justify-center gap-3  font-semibold">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allProducts">Products</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>

      <div className="gap-3 font-semibold hidden 800px:flex  800px:items-center 800px:justify-center text-white capitalize">
        {isAuthenticated ? (
          <div>
            <Link to="/profile">profile</Link>
          </div>
        ) : (
          <>
            <Link to="/login">Login/</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
        <div>
          <NavLink to="/admin" className="flex items-center">
            <GrUserAdmin size={15} />
            <span>Admin</span>
          </NavLink>
        </div>
        {/* <div>
          <NavLink to="/profile">profile</NavLink>
        </div> 

        <>
          <NavLink to="/login">Login/</NavLink>
          <NavLink to="/register">Sign up</NavLink>
        </> */}

        <div
          className="relative cursor-pointer "
          onClick={() => setIsCartOpen(true)}
        >
          <IoCartOutline className="text-[1.5rem] " />
          <span className="absolute block h-4 w-4 rounded-full text-black text-[.7rem] text-center bg-red-300 right-0 bottom-4">
            {cart.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavItems;
