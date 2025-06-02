import { useForm } from "react-hook-form";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import styles from "../../styles/styles";
import { useUpdateUser } from "../../hooks/userHooks/useUpdateUser";

function UserDetails() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { updateUserMutate, isError, isSuccess, isPending } = useUpdateUser();
  const [imageSrc, setImageSrc] = useState("default.jpg");
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("newemail", data.newemail);
    formData.append("photo", data.image[0]);
    updateUserMutate(formData);

    toast.success("User details updated successfully");
    reset();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
      setImageSrc(imageUrl); // Update the preview image source
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[98%] mx-auto py-4 bg-white shadow-md px-6 "
    >
      <div className="flex justify-center w-full text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        <h1>Update Profile</h1>
      </div>

      <div className="flex justify-center w-full ">
        <div className="relative">
          <img
            src={imageSrc}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="text-blue-700 px-1 h-[60px]  cursor-pointer absolute -bottom-14 left-6">
            <input
              accept="image/*"
              type="file"
              name="image"
              {...register("image")}
              onChange={(e) => {
                handleImageChange(e);
              }}
              className="overflow-hidden text-wrap text-[.7rem] font-semibold"
            />
          </div>
        </div>
      </div>
      <br />
      <br />

      <div>
        <div className="w-full 800px:flex block pb-3">
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2  text-blue-600">Full Name</label>
            <input
              type="text"
              {...register("name")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2  text-blue-600">Current Email</label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
            />
            {errors?.email && (
              <span className="text-red-500 text-sm ">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full 800px:flex block pb-3">
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2  text-blue-600">
              Current Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              {...register("password", { required: "This field is must" })}
            />
            {errors?.password && (
              <span className="text-red-500 text-sm ">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2 text-blue-600">New Email</label>
            <input
              type="text"
              {...register("newemail", {
                required: false,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
            />
            {errors?.newemail && (
              <span className="text-red-500 text-sm ">
                {errors.newemail.message}
              </span>
            )}
          </div>
        </div>
        <input
          className={`w-[250px] h-[40px] bg-blue-800 font-semibold text-white text-center  rounded-[3px] mt-8 cursor-pointer`}
          type="submit"
          disabled={true}
          value={"Update"}
        />
      </div>
    </form>
  );
}

export default UserDetails;
