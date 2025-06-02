import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { server } from "../../server";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .patch(
        `${server}/user/me/updatePassword`,
        { newPassword, passwordConfirm },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("password successfully updated");
        console.log(res.data);
        setNewPassword("");
        setpasswordConfirm("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "please login again");
      });
  };
  return (
    <div className="w-full mx-auto bg-white shadow-md p-4 h-full">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] bg-blue-800 text-center text-white rounded-[3px] mt-8 cursor-pointer`}
              disabled={true}
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
