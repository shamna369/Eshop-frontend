import TotalOrderBlock from "./TotalOrderBlock";
import TotalProductsBlock from "./TotalProductsBlock";
import TotalSaleBlock from "./TotalSaleBlock";

function AdminDashbordBlocks() {
  return (
    <div className="w-full grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-1 mx-auto">
      <TotalOrderBlock />
      <TotalSaleBlock />
      <TotalProductsBlock />
    </div>
  );
}

export default AdminDashbordBlocks;
