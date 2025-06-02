import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import SimpleFooter from "../components/Layout/SimpleFooter";
import Loader from "../components/Layout/Loader";

import ProfileSideBar from "../components/Profile/ProfileSideBar";
import styles from "../styles/styles";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="">
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10 mt-[4rem]`}>
        <div className="w-[50px] 800px:w-[335px] sticky">
          <ProfileSideBar />
        </div>
        <div className="w-full   mx-4">
          <Outlet />
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}

export default ProfilePage;
