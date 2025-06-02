import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "../Layout/Loader";

import { NavLink, useNavigate } from "react-router-dom";
import { useGetAllUsers } from "../../hooks/userHooks/useGetAllUsers";
const itemsPerPage = 5;
function AdminShowUsers() {
  const navigate = useNavigate();
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useGetAllUsers();
  console.log("data from admin user page");
  console.log(data);
  const total_user = data?.length || 0;
  const [page, setPage] = useState(1);

  function handleNext() {
    if (total_user > page * itemsPerPage) {
      setPage((cur) => cur + 1);
    }
  }
  function handlePrevious() {
    if (page > 1) {
      setPage((cur) => cur - 1);
    }
  }
  return (
    <div className="p-4 bg-white w-[98%] mx-auto overflow-auto  text-sm font-semibold ">
      <h1 className="block text-[25px] text-center font-[600] text-blue-800 pb-2 mb-2">
        All Users
      </h1>

      {isPending || !data || isError ? (
        <Loader />
      ) : (
        <div>
          <p className="text-blue-500">Total Users : {total_user}</p>
          <table className="w-full border-collapse border  ">
            <thead>
              <tr className="bg-gray-200 text-blue-800">
                <th className="border-y border-gray-300 p-2 text-left"></th>
                <th className="border-y border-gray-300 p-2 text-left">Id</th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Name
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Email
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Address
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Role
                </th>
                <th className="border-y border-gray-300  p-2 text-left">
                  Joined At
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((row, index) => {
                    const date = new Date(row.createdAt);
                    // Extract day, month, and year
                    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
                    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                    const year = String(date.getFullYear()); // Get last 2 digits of the year
                    // Format the date
                    const formattedDate = `${day}-${month}-${year}`;
                    return (
                      <tr
                        key={row.id}
                        className=" even:bg-gray-50 hover:bg-blue-100 text-gray-500 font-[400]"
                      >
                        <td className="border-y border-gray-300  p-4">
                          {index + 1}
                        </td>
                        <td className=" border-y border-gray-300 p-4">
                          {row.id}
                        </td>
                        <td className="border-y border-gray-300  p-4">
                          {row.name}
                        </td>
                        <td className=" border-y border-gray-300 p-4">
                          {row.email}
                        </td>

                        <td className=" border-y border-gray-300 p-4">
                          {row.addresses?.length !== 0
                            ? row.addresses[0].country
                            : "-"}
                        </td>
                        <td className=" border-y border-gray-300 p-4">
                          {row.role}
                        </td>
                        <td className=" border-y border-gray-300 p-4">
                          {formattedDate}
                        </td>
                        <td className="border-y border-gray-300 text-blue-800  p-4 ">
                          <div className=" flex items-center justify-between gap-1">
                            <AiOutlineEye
                              size={20}
                              className="cursor-pointer "
                              title="Quick view"
                            />
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
          {data?.length && (
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

export default AdminShowUsers;
