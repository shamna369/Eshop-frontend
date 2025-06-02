import { FiShoppingBag } from "react-icons/fi";
import { useNumberOfOrders } from "../../hooks/orderHooks/useNumberOfOrders";
function TotalOrderBlock() {
  const { data, isLoading } = useNumberOfOrders();
  return (
    <div className="px-2 shadow-md py-4 w-[170px] font-bold  bg-blue-50 flex justify-center items-center flex-col">
      <p className="flex items-center justify-center gap-2">
        {" "}
        <span>
          <FiShoppingBag size={25} />
        </span>
        Total Order
      </p>
      {data?.total && !isLoading && <p>{JSON.stringify(data.total)}</p>}
    </div>
  );
}

export default TotalOrderBlock;
