import axios from "axios";
import { useEffect } from "react";
import { server } from "../server";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadUserFail,
  LoadUserSuccess,
  LoadUserRequest,
  fetchUser,
} from "../redux/reducers/userSlice";
function Home() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch the async action to fetch user data when the component mounts
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="h-[30rem] w-full flex items-center justify-center text-4xl">
      <h1> {loading ? "....loading" : `welcome..${user?.data.name || ""}`}</h1>
    </div>
  );
}

export default Home;
