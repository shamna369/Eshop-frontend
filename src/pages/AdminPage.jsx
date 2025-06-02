import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSideBar from "../components/Admin/AdminSideBar";
import SimpleFooter from "../components/Layout/SimpleFooter";

function AdminPage() {
  return (
    <div>
      <AdminHeader />

      <div className=" flex items-start justify-between w-full mt-4 ">
        <div className="w-[80px] md:w-[240px] my-4">
          <AdminSideBar />
        </div>
        <div className="w-[96%] min-h-[90vh] my-4 mx-4 p-4 bg-white md:mx-8">
          <Outlet />
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
}

export default AdminPage;
