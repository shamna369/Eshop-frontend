import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff, HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { userDetails } from "../../redux/reducers/user";
function Register() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isShowPassword, setIsShowPassword] = useState("password");
  async function SubmitForm(data, e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", data.avatar[0]);
    formData.append("name", data.fullName);
    formData.append("email", data.email);
    formData.append("passwordConfirm", data.confirmpassword);
    formData.append("password", data.password);

    axios
      .post(`${server}/user/register`, formData, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(userDetails());
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response);
      });
    reset();
  }
  useEffect(() => {
    if (isAuthenticated === true) navigate("/home");
  }, [isAuthenticated, navigate]);
  return (
    <div className="w-full h-screen px-[1rem] py-[1rem] flex my-[4rem] items-center  flex-col sm:min-w-full sm:mx-auto">
      <div className="mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="bg-white py-5 rounded-md w-full shadow-md sm:max-w-md sm:mx-auto sm:px-10">
        <form onSubmit={handleSubmit(SubmitForm)}>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="fullName" className="block capitalize ">
              full name
            </label>
            <input
              name="fullName"
              {...register("fullName", { required: "User name is must" })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.fullName && (
              <span className="text-red-500 text-sm ">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="email" className="block capitalize ">
              Email
            </label>
            <input
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.email && (
              <span className="text-red-500 text-sm ">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1 relative ">
            <label htmlFor="password" className="block capitalize">
              Password
            </label>
            <input
              type={isShowPassword}
              name="password"
              placeholder={`min 5 length character long `}
              {...register("password", {
                required: "Password is must",
                minLength: { value: 5, message: "min 5 length character" },
              })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {isShowPassword === "password" ? (
              <HiEye
                className="block text-xl text-black absolute right-2 bottom-4"
                onClick={() => setIsShowPassword("text")}
              />
            ) : (
              <HiEyeOff
                className="block text-xl text-black absolute right-2 bottom-4"
                onClick={() => setIsShowPassword("password")}
              />
            )}
            {errors?.password && (
              <span className="text-red-500 text-sm ">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1 ">
            <label htmlFor="Confirmpassword" className="block capitalize">
              Confirm Password
            </label>
            <input
              name="confirmpassword"
              type="password"
              {...register("confirmpassword", {
                required: "Confirm Password is must",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.confirmpassword && (
              <span className="text-red-500 text-sm ">
                {errors.confirmpassword.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 flex gap-3 ">
            <label>
              <HiOutlineUserCircle className="text-3xl text-green-800" />
            </label>
            <input
              className="text-blue-500"
              type="file"
              name="avatar"
              accept="image/*"
              {...register("avatar")}
            />
          </div>
          <div className="min-w-full px-1 py-2 flex  justify-center ">
            <button className="w-full font-semibold text-white px-4 py-2 rounded-md text-md bg-blue-600">
              CREATE ACCOUNT
            </button>
          </div>
          <div className="min-w-full px-1 py-2 flex  justify-center ">
            <label>Already have an account?</label>
            <Link to="/login" className="text-blue-600 font-semibold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
