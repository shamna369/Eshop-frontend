/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect } from "react";
import { useGetProductById } from "../../hooks/productHooks/useGetProductById";

import ProductDetailsInfo from "./ProductDetailsInfo";
import FeaturedImageGallery from "./imagePics";
import Loader from "../Layout/Loader";
import ErrorPage from "../../pages/ErrorPage";
function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product, isPending: isLoading } = useGetProductById(id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  if (isLoading)
    return (
      <div className="w-[90%] py-6 px-2 my-12 min-h-[100vh] mx-auto shadow-md flex justify-center items-center">
        <Loader />
      </div>
    );
  if (!product)
    return (
      <div className="w-[90%] py-6 px-2 my-12 mx-auto shadow-md flex justify-center items-center">
        <ErrorPage />
      </div>
    );
  else
    return (
      <div className="w-[90%] pt-4 pb-2 px-2 my-[2rem] mx-auto  bg-white shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-black font-bold"
        >
          <MdKeyboardBackspace size={24} />
        </button>
        <div className="flex flex-col items-center justify-center gap-4 w-full mx-auto md:flex-row ">
          <div className="w-[200px] flex items-center justify-center md:w-[400px]">
            <FeaturedImageGallery images={product?.images} key={id} />
          </div>

          <ProductDetailsInfo data={product} key={id} />
        </div>
      </div>
    );
}

export default ProductDetails;
