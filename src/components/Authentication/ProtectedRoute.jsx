import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserData } from "../../hooks/userHooks/useGetUserData";
import { useUserLogin } from "../../hooks/userHooks/useUserLogin";
import LoginPage from "../../pages/LoginPage";
import Loader from "../Layout/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../redux/reducers/user";
function ProtectedRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  //console.log(`isauthenticated from protect is ${isAuthenticated}`);
  const { data, isLoading, isError } = useGetUserData();
  //console.log(data);
  useEffect(() => {
    if (data && !isError) {
      // Dispatch userDetails with user data as payload
      dispatch(userDetails());
    } else if (isError) {
      // Redirect to login if there's an error
      navigate("/login");
      toast.error("Please log in to access this page.");
    }
  }, [data, isError, navigate, dispatch]);

  if (isLoading)
    return (
      <div className="h-screen w-[80%] mx-auto flex justify-center items-center">
        <Loader />
      </div>
    );
  if (data && !isError) dispatch(userDetails());
  return <>{data && <Outlet />}</>;
}

export default ProtectedRoute;
