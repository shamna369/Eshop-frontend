import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import { useGetProductById } from "../../hooks/productHooks/useGetProductById";
import { useEditProduct } from "../../hooks/productHooks/useEditProduct";
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
function AdminEditProduct() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { id } = useParams();
  const { data: product, isPending: isLoading } = useGetProductById(id);
  const isEditId = Boolean(product?._id);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { editProductMutate, isError, isSuccess, isPending } = useEditProduct();
  useEffect(() => {
    if (product) {
      // Update form values when product data is loaded
      reset({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        originalPrice: product.originalPrice || "",
        discountPrice: product.discountPrice || "",
        stock: product.stock || "",
        shopId: product.shopId || "",
        ratings: product.ratings || "",
      });
    }
  }, [product, reset]);

  async function SubmitForm(data, e) {
    e.preventDefault();
    console.log(data);
    editProductMutate({ id, data });
    reset();
    navigate(-1);
  }
  // useEffect(() => {
  //   if (isAuthenticated === true) navigate("/home");
  // }, [isAuthenticated, navigate]);
  return (
    <div className="w-full h-full flex  items-center flex-col">
      <button
        className="font-bold absolute left-[30%]"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowBack size={20} title="back" />
      </button>
      <div className="mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-800">
          Update Product
        </h2>
      </div>

      <div className=" py-5 rounded-md w-full shadow-md   bg-gray-100 sm:max-w-md sm:mx-auto sm:px-10">
        <form onSubmit={handleSubmit(SubmitForm)}>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="name" className="block capitalize  text-blue-800 ">
              Name
            </label>
            <input
              name="name"
              {...register("name")}
              className="px-2 py-1 rounded-md border text-[13px] text-gray-600 border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.name && (
              <span className="text-red-500 text-sm ">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label
              htmlFor="category"
              className="block capitalize  text-blue-800 "
            >
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
            <label
              htmlFor="description"
              className="block capitalize  text-blue-800"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              className="px-2 py-1 rounded-md text-[13px] text-gray-600 border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />

            {errors?.description && (
              <span className="text-red-500 text-sm ">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label
              htmlFor="originalPrice"
              className="block capitalize  text-blue-800 "
            >
              Original Price
            </label>
            <input
              type="number"
              step="0.01"
              name="originalPrice"
              {...register("originalPrice")}
              className="px-2 py-1 rounded-md text-[13px] text-gray-600 border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.originalPrice && (
              <span className="text-red-500 text-sm ">
                {errors.originalPrice.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label
              htmlFor="discountPrice"
              className="block capitalize  text-blue-800 "
            >
              Discount Percentage
            </label>
            <input
              type="number"
              name="discountPrice"
              step="0.01"
              {...register("discountPrice")}
              className="px-2 py-1 text-[13px] text-gray-600 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.discountPrice && (
              <span className="text-red-500 text-sm ">
                {errors.discountPrice.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label htmlFor="stock" className="block capitalize  text-blue-800 ">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              {...register("stock")}
              className="px-2 py-1 text-[13px] text-gray-600 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.stock && (
              <span className="text-red-500 text-sm ">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label
              htmlFor="shopId"
              className="block capitalize  text-blue-800 "
            >
              Shop Id
            </label>
            <input
              name="shopId"
              {...register("shopId")}
              className="px-2 py-1 text-[13px] text-gray-600 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.shopId && (
              <span className="text-red-500 text-sm ">
                {errors.shopId.message}
              </span>
            )}
          </div>
          <div className="min-w-full px-1 py-2 grid grid-rows-1  ">
            <label
              htmlFor="ratings"
              className="block capitalize text-blue-800 "
            >
              Ratings
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.01"
              name="ratings"
              {...register("ratings")}
              className="px-2 py-1 text-[13px] text-gray-600 rounded-md border border-gray-200 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors?.ratings && (
              <span className="text-red-500 text-sm ">
                {errors.ratings.message}
              </span>
            )}
          </div>

          <div className="min-w-full px-1 py-2 flex  justify-center ">
            <button
              disabled={true}
              className="w-full font-semibold text-white px-4 py-2 rounded-md text-md bg-blue-900"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;
