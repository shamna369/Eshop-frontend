import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import Loader from "../Layout/Loader";
import { useGetAllOrder } from "../../hooks/adminHooks/useGetAllOrders";
import { NavLink, useNavigate } from "react-router-dom";
import DeliveryUpdate from "./DeliveryUpdate";
const itemsPerPage = 5;
function AdminAllOrders() {
  const navigate = useNavigate();
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useGetAllOrder();
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
    <div className="p-12 bg-white w-[98%] mx-auto overflow-auto  text-sm font-semibold ">
      <h1 className="block text-[25px] text-center font-[600] text-blue-800 pb-2 mb-2">
        All Orders
      </h1>

      {isPending || !data || isError ? (
        <Loader />
      ) : (
        <div>
          <p className="text-blue-500">Total Orders : {total_order}</p>
          <table className="w-full border-collapse border  ">
            <thead>
              <tr className="bg-gray-200 text-blue-800">
                <th className="border-y border-gray-300 p-2 text-left"></th>
                <th className="border-y border-gray-300 p-2 text-left">
                  Order Id
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Ordered At
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Payment Status
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Total Price
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
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
                      className=" even:bg-gray-50 hover:bg-blue-100 text-black font-[400] text-[12px]"
                    >
                      <td className="border-y border-gray-300  p-2">
                        {index + 1}
                      </td>
                      <td className=" border-y border-gray-300 p-2">
                        {row.id}
                      </td>
                      <td className="border-y border-gray-300  p-2">
                        {new Date(row.createdAt).toLocaleDateString()}{" "}
                        {new Date(row.createdAt).toLocaleTimeString()}
                      </td>
                      <td className=" border-y border-gray-300 p-2">
                        {row.paymentInfo.status}
                      </td>
                      <td className=" border-y border-gray-300 p-2">
                        {row.totalPrice.toFixed(2)}
                      </td>
                      <td className=" border-y border-gray-300 p-2">
                        <div className="flex justify-around items-center">
                          <p> {row.deliveredAt.status}</p>
                          <DeliveryUpdate id={row.id} />
                        </div>
                      </td>
                      <td
                        key={row.id}
                        className="border border-gray-300 text-blue-800  p-2  "
                      >
                        <AiOutlineEye
                          key={row.id}
                          onClick={() => navigate(`order-details/${row.id}`)}
                          size={22}
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

export default AdminAllOrders;
