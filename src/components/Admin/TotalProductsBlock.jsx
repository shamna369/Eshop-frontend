import { CgProductHunt } from "react-icons/cg";
import { useGetAllProductCount } from "../../hooks/productHooks/useGetAllProductCount";
function TotalProductsBlock() {
  const { data, isLoading } = useGetAllProductCount();
  return (
    <div className="px-2 shadow-md py-4 w-[170px] font-bold  bg-blue-50 flex justify-center items-center flex-col">
      <p className="flex items-center justify-center gap-2">
        {" "}
        <span className="text-yellow-500">
          {" "}
          <CgProductHunt size={30} />
        </span>{" "}
        Total Products
      </p>

      {data && !isLoading && <p>{data}</p>}
    </div>
  );
}

export default TotalProductsBlock;
