import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import Loader from "../Layout/Loader";
import { useGetAllOrder } from "../../hooks/adminHooks/useGetAllOrders";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/productHooks/useProducts";
import { TOTAL_LIMIT } from "../../constants";
import { useDeleteProduct } from "../../hooks/productHooks/useDeleteProduct";
const itemsPerPage = 5;
function AdminAllProducts() {
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    data,
    error,
    setPage,
    page,
    isFetching,
    isPlaceholderData,
  } = useProducts();

  // for deleting a product
  const { deleteProductMutate } = useDeleteProduct();
  const totalPageNo = Math.ceil(data?.totalDocumentsCount / TOTAL_LIMIT);

  //pagination function
  function handleUpPagination(page) {
    setPage((cur) => cur + 1);
  }
  function handleDownPagination(page) {
    setPage((cur) => cur - 1);
  }

  return (
    <div className="p-12 bg-white w-[98%] mx-auto overflow-auto  text-sm font-semibold font-serif ">
      <h1 className="block text-[25px] text-center font-[600] text-blue-800 pb-2 mb-2">
        All Products
      </h1>

      {isPending || !data || error ? (
        <Loader />
      ) : (
        <div>
          <p className="text-blue-500">
            Total Products : {data?.totalDocumentsCount || ""}
          </p>
          <table className="w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-200 text-blue-800">
                <th className="border border-gray-300 p-2 text-left"></th>
                <th className="border border-gray-300 p-2 text-left">Id</th>
                <th className="border border-gray-300  p-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300  p-2 text-left">Name</th>
                <th className="border border-gray-300  p-2 text-left">
                  Original Price
                </th>
                <th className="border border-gray-300  p-2 text-left">
                  Discount Percentage %
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((row, index) => {
                return (
                  <tr
                    key={row._id}
                    className=" even:bg-gray-50 font-[400] hover:bg-blue-100 text-gray-600 text-[12px]"
                  >
                    <td className="border-y border-gray-300  p-2">
                      {index + 1}
                    </td>
                    <td className="border-y border-gray-300  p-2">{row._id}</td>
                    <td className="border-y border-gray-300  p-2">
                      {row.category}
                    </td>
                    <td className="border-y border-gray-300  p-2">
                      {row.name}
                    </td>
                    <td className="border-y border-gray-300  p-2">
                      {row.originalPrice}
                    </td>
                    <td className="border-y border-gray-300  p-2">
                      {row.discountPrice}
                    </td>
                    <td className="border border-gray-300 text-blue-900  p-2 ">
                      <div className=" flex items-center justify-between gap-1">
                        <AiOutlineEye
                          onClick={() => navigate(`product-view/${row._id}`)}
                          size={20}
                          className="cursor-pointer "
                          title="Quick view"
                        />
                        <MdEdit
                          onClick={() => navigate(`edit-product/${row._id}`)}
                          size={20}
                          className="cursor-pointer "
                          title="Edit"
                        />
                        {/* <MdOutlineDelete
                          onClick={() => deleteProductMutate(row._id)}
                          size={20}
                          className="cursor-pointer "
                          title="Delete"
                        /> */}
                        <MdOutlineDelete
                          size={20}
                          className="cursor-pointer "
                          title="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* pagination */}
          {data?.products.length && (
            <div className="flex items-center justify-center m-2 ">
              <button
                disabled={page === 1 || isPlaceholderData}
                className=" px-2 py-1 w-8 h-8 text[1.5rem] cursor-pointer bg-blue-400 font-semibold rounded-sm disabled:bg-slate-400"
                onClick={() => handleDownPagination(page)}
              >
                <GrFormPrevious size={20} />
              </button>
              <p className="w-8 h-8 px-2 py-1 text[1.5rem] bg-blue-400 font-semibold m-1 rounded-sm ">
                {page}
              </p>
              <button
                disabled={page === totalPageNo || isPlaceholderData}
                className="px-2 py-1 w-8 h-8 text[1.5rem] cursor-pointer bg-blue-400 font-semibold rounded-sm  disabled:bg-slate-400 disabled:cursor-not-allowed"
                onClick={() => handleUpPagination(page)}
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

export default AdminAllProducts;
