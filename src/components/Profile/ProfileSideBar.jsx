import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { NavLink } from "react-router-dom";
function ProfileSideBar() {
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <NavLink
        to="userdetails"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm"
      >
        <RxPerson size={20} />
        <span className={`pl-3 800px:block hidden`}>Profile</span>
      </NavLink>
      <NavLink
        to="orders"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm"
      >
        <HiOutlineShoppingBag size={20} />
        <span className={`pl-3 800px:block hidden`}>Orders</span>
      </NavLink>

      <NavLink
        to="changepassword"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm"
      >
        <RiLockPasswordLine size={20} />
        <span className={`pl-3 800px:block hidden`}>Change Password</span>
      </NavLink>

      <NavLink
        to="address"
        className="flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm"
      >
        <TbAddressBook size={20} />
        <span className={`pl-3  800px:block hidden`}>Add Address</span>
      </NavLink>

      <NavLink
        to="/logout"
        className="single_item flex items-center cursor-pointer w-full mb-6 shadow-sm py-1 rounded-sm"
      >
        <AiOutlineLogin size={20} />
        <span className={`pl-3  800px:block hidden`}>Log out</span>
      </NavLink>
    </div>
  );
}

export default ProfileSideBar;
