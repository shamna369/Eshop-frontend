import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import Loader from "../Layout/Loader";
import ErrorPage from "../../pages/ErrorPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user";

async function logoutFunction() {
  const res = await axios.post(
    `${server}/user/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
}
function Logout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    mutate: logoutUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: logoutFunction,
    onSuccess: () => {
      dispatch(logout());
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

  // Trigger logout on component mount
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <div className="w-[96%] h-[70vh] flex flex-col items-center my-4 justify-center bg-white shadow-md p-6 mx-auto">
      {isLoading && <Loader />}
      {isError && <ErrorPage />}
      {!isLoading && !isError && (
        <div className=" w-full p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Successfully logged out..!.
          </h1>
          <NavLink to="/">
            <p className="text-blue-700 mb-6">Back to home</p>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Logout;
