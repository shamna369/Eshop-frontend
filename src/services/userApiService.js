import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
export const postUserUpdatedData = async (userData) => {
  console.log(userData);
  try {
    const resData = await axios.patch(
      `${server}/user/update-user-info`,
      userData
    );
    return resData.data;
  } catch (err) {
    //  console.log(err.response.data);
    toast(err.response.data.message);
  }
};
