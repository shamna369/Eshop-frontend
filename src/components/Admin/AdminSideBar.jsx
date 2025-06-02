import { FiShoppingBag } from "react-icons/fi";

import { RxDashboard } from "react-icons/rx";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";

import { AiOutlineSetting } from "react-icons/ai";

function AdminSideBar() {
  return (
    <div className="w-full min- h-[90vh] bg-white shadow-sm sticky top-0 left-0 z-10 pt-4 px-4 ml-4 font-sans text-black">
      {/* single item */}
      <NavLink
        to="dashboard"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm hover:bg-blue-100"
      >
        <RxDashboard size={25} />
        <span className={`pl-3 text-[15px] font-[400] 800px:block hidden`}>
          {" "}
          Dashboard
        </span>
      </NavLink>

      <NavLink
        to="all-orders"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm  hover:bg-blue-100"
      >
        <FiShoppingBag size={25} />
        <span className={`text-[15px] font-[400] pl-3 800px:block hidden`}>
          {" "}
          All Orders
        </span>
      </NavLink>

      <NavLink
        to="all-users"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm  hover:bg-blue-100"
      >
        <HiOutlineUserGroup size={25} />
        <span className={`text-[15px] font-[400] pl-3 800px:block hidden`}>
          {" "}
          All Users
        </span>
      </NavLink>
      <NavLink
        to="all-products"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm  hover:bg-blue-100"
      >
        <BsHandbag size={25} />
        <span className={`text-[15px] font-[400] pl-3 800px:block hidden`}>
          {" "}
          All Products
        </span>
      </NavLink>
      <NavLink
        to="create-product"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm  hover:bg-blue-100"
      >
        <MdOutlineCreateNewFolder size={25} />
        <span className={`text-[15px] font-[400] pl-3 800px:block hidden`}>
          {" "}
          Add New Product
        </span>
      </NavLink>

      <div className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm  hover:bg-blue-100">
        <AiOutlineSetting size={25} />
        <span className={`text-[15px] font-[400] pl-3 800px:block hidden`}>
          {" "}
          Settings
        </span>
      </div>
    </div>
  );
}

export default AdminSideBar;
