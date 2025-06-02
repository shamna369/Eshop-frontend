import { useEffect, useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import NavItems from "./NavItems";
import SideBarRight from "./SideBarRight";
import Cart from "../Cart/Cart";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cart = useSelector((state) => state.cart.cartItems);
  function handleClick() {
    setIsOpen((cur) => !cur);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the button
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#3321c8] h-[70px]">
      {/* large screen navbar */}
      <div className=" hidden w-11/12 mx-auto 800px:flex items-center justify-between py-3">
        <div
          className="relative flex items-center justify-around gap-3 cursor-pointer bg-white  p-1 h-[45px]  rounded-t-lg"
          onClick={handleClick}
          ref={dropdownRef}
        >
          <span className="text-[1.5rem]">
            <HiBars3 />
          </span>
          <label className="cursor-pointer block font-semibold">
            All Categories
          </label>
          <span className="block">
            <HiMiniChevronDown />
          </span>
          {isOpen && (
            <div className=" absolute top-full left-0  w-full cursor-default z-20">
              {" "}
              <Dropdown />
            </div>
          )}
        </div>
        <NavItems setIsCartOpen={setIsCartOpen} />
      </div>
      {/* mobile header */}
      <div className=" w-11/12 mx-auto  flex items-center text-white justify-between py-5 800px:hidden">
        <HiBars3
          className="text-[1.5rem] cursor-pointer"
          onClick={() => {
            setIsSideBar(true);
          }}
        />

        <div
          className="relative cursor-pointer "
          onClick={() => setIsCartOpen(true)}
        >
          <IoCartOutline className="text-[1.5rem] font-semibold" />
          <span className="absolute block h-4 w-4 rounded-full text-black text-[.7rem] text-center bg-red-300 right-0 bottom-4">
            {cart.length}
          </span>
        </div>
      </div>
      {isSideBar && (
        <SideBarRight setIsSideBar={setIsSideBar} isSideBar={isSideBar} />
      )}
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
    </div>
  );
}

export default NavBar;
