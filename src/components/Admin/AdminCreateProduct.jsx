import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff, HiOutlineUserCircle } from "react-icons/hi";

import { server } from "../../server";

import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCreateProduct } from "../../hooks/productHooks/useCreateProduct";
const categoryData = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
];
function AdminCreateProduct() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { createProductMutate } = useCreateProduct();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  async function SubmitForm(data, e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("images", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("originalPrice", data.originalPrice);
    formData.append("discountPrice", data.discountPrice);
    formData.append("ratings", data.ratings);
    formData.append("shopId", data.shopId);

    createProductMutate(formData, {
      onSuccess: () => reset(),
    });
    reset();
  }
  // useEffect(() => {
  //   if (isAuthenticated === true) navigate("/home");
  // }, [isAuthenticated, navigate]);
  return (
    <div className="w-full h-full flex  items-center flex-col">
      <div className="mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add New Product
        </h2>
      </div>
      <div className=" py-5 rounded-md w-full shadow-md  bg-gray-100 sm:max-w-md sm:mx-auto sm:px-10">
        <form onSubmit={handleSubmit(SubmitForm)}>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="name" className="block capitalize ">
              Name
            </label>
            <input
              name="name"
              {...register("name", { required: " name is must" })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.name && (
              <span className="text-red-500 text-sm ">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="category" className="block capitalize ">
              Category
            </label>
            <select
              defaultValue=""
              {...register("category")}
              className="px-2 text-[13px] text-gray-600 capitalize py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryData.map((el, i) => (
                <option
                  key={i}
                  value={el}
                  className="text-[14px] py-1 capitalize"
                >
                  {el}
                </option>
              ))}
            </select>

            {errors?.category && (
              <span className="text-red-500 text-sm ">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="description" className="block capitalize ">
              Description
            </label>
            <textarea
              {...register("description", { required: "description is must" })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />

            {errors?.description && (
              <span className="text-red-500 text-sm ">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="originalPrice" className="block capitalize ">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              {...register("originalPrice", {
                required: "original price is must",
              })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.originalPrice && (
              <span className="text-red-500 text-sm ">
                {errors.originalPrice.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="discountPrice" className="block capitalize ">
              Discount Price Percentage
            </label>
            <input
              type="number"
              name="discountPrice"
              {...register("discountPrice", {
                required: "discountPrice is must",
              })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.discountPrice && (
              <span className="text-red-500 text-sm ">
                {errors.discountPrice.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="stock" className="block capitalize ">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              {...register("stock", { required: "stock is must" })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.stock && (
              <span className="text-red-500 text-sm ">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="shopId" className="block capitalize ">
              Shop Id
            </label>
            <input
              name="shopId"
              {...register("shopId", { required: "shopId is must" })}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.shopId && (
              <span className="text-red-500 text-sm ">
                {errors.shopId.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="ratings" className="block capitalize ">
              Ratings
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.01"
              name="ratings"
              {...register("ratings")}
              className="px-2 py-1 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.ratings && (
              <span className="text-red-500 text-sm ">
                {errors.ratings.message}
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
              {...register("avatar", { required: "image is must" })}
            />
          </div>
          <div className="min-w-full px-1 py-2 flex  justify-center ">
            <button
              disabled={true}
              className="w-full font-semibold text-white px-4 py-2 rounded-md text-md bg-blue-600"
            >
              ADD PRODUCT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateProduct;
