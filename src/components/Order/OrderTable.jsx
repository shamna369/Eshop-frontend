import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { useGetUserOrder } from "../../hooks/orderHooks/useGetUserOrder";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";
const itemsPerPage = 5;
function OrderTable() {
  const navigate = useNavigate();

  const { isLoading, isError, data, error, isFetching, isPlaceholderData } =
    useGetUserOrder();
  const total_order = data?.orders?.length || 0;
  const [page, setPage] = useState(1);
  const [orderData, setOrderData] = useState([]);
  function handleNext() {
    if (total_order > page * itemsPerPage) {
      setPage((cur) => cur + 1);
    }
  }
  function handlePrevious() {
    if (page > 1) {
      setPage((cur) => cur - 1);
    }
  }

  return (
    <div className="p-12 bg-white w-[98%] mx-auto overflow-auto shadow-md text-sm font-semibold">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2 mb-2">
        Orders
      </h1>
      {isError && !data ? (
        <h2>No Orders Yet</h2>
      ) : isLoading || !data ? (
        <Loader />
      ) : (
        <div>
          <table className="w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-200 text-blue-800">
                <th className="border border-gray-300 p-2 text-left"></th>
                <th className="border border-gray-300 p-2 text-left">Id</th>
                <th className="border border-gray-300  p-2 text-left">
                  Ordered At
                </th>
                <th className="border border-gray-300  p-2 text-left">
                  Payment Status
                </th>
                <th className="border border-gray-300  p-2 text-left">
                  Total Price
                </th>
                <th className="border border-gray-300  p-2 text-left">
                  Delivery Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.orders
                ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((row, index) => {
                  return (
                    <tr
                      key={row.id}
                      className=" even:bg-gray-100 text-[12px] hover:bg-blue-100 text-gray-600 font-[400]"
                    >
                      <td className="border border-gray-300  p-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300  p-2">{row.id}</td>
                      <td className="border border-gray-300 text-[10px] p-1 ">
                        {new Date(row.createdAt).toLocaleDateString()}{" "}
                        {new Date(row.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="border border-gray-300  p-2">
                        {row.paymentInfo.status}
                      </td>
                      <td className="border border-gray-300  p-2">
                        {row.totalPrice.toFixed(2)}
                      </td>
                      <td className="border border-gray-300  p-2">
                        {row.deliveredAt.status}
                      </td>
                      <td
                        key={row.id}
                        className="border border-gray-300 text-blue-600  p-2"
                      >
                        <AiOutlineEye
                          key={row.id}
                          onClick={() => navigate(`${row.id}`)}
                          size={20}
                          className="cursor-pointer "
                          title="Quick view"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {data?.orders?.length && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => handlePrevious()}
                className="p-1 font-bold bg-slate-100 "
              >
                <GrFormPrevious size={20} />
              </button>
              <p className="p-1 shadow-sm border font-bold mx-1">{page}</p>
              <button
                onClick={() => handleNext()}
                className="p-1 font-bold bg-slate-100"
              >
                <MdNavigateNext size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default OrderTable;
