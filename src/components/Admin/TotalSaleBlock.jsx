import { FcSalesPerformance } from "react-icons/fc";
import { useGetTotalSales } from "../../hooks/orderHooks/useGetTotalSales";
function TotalSaleBlock() {
  const { data, isLoading } = useGetTotalSales();
  return (
    <div className="px-2 shadow-md py-4 w-[170px] font-bold  bg-blue-50 flex justify-center items-center flex-col">
      <p className="flex items-center justify-center gap-2">
        {" "}
        <span>
          <FcSalesPerformance size={25} />
        </span>
        Total Sales
      </p>
      {data && !isLoading && <p>{data.toFixed(2)}</p>}
    </div>
  );
}

export default TotalSaleBlock;
