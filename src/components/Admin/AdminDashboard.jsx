import AdminCategoryChart from "./AdminCategoryChart";
import AdminDashbordBlocks from "./AdminDashbordBlocks";
import AdminSalesOverview from "./AdminSalesOverview";

function AdminDashboard() {
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        {" "}
        <h1 className="text-blue-800 text-xl font-bold mb-6 mt-6">Dashboard</h1>
      </div>
      <AdminDashbordBlocks />
      <div className="grid grid-cols-1 gap-1 xg:grid-cols-2  px-4">
        <AdminSalesOverview />
        <AdminCategoryChart />
      </div>
    </div>
  );
}

export default AdminDashboard;
