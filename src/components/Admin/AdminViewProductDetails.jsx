import ProductDetailsInfo from "../Products/ProductDetailsInfo";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useGetProductById } from "../../hooks/productHooks/useGetProductById";
import FeaturedImageGallery from "../Products/imagePics";
import Loader from "../Layout/Loader";
import ErrorPage from "../../pages/ErrorPage";
import styles from "../../styles/styles";
import Ratings from "../Rating/Ratings";
function AdminViewProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isPending: isLoading } = useGetProductById(id);

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
        <button className="text-black" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={20} title="back" />
        </button>
        <div className="flex flex-col items-center justify-center gap-4 w-full mx-auto md:flex-row ">
          <div className="w-[200px] flex items-center justify-center md:w-[400px]">
            <FeaturedImageGallery images={product?.images} key={id} />
          </div>

          <div className="w-full 800px:w-[50%] pt-5">
            <h2 className="text-slate-400 uppercase  ">{product.category}</h2>
            <h1 className={`${styles.productTitle}`}>{product.name}</h1>
            <Ratings rating={product.ratings} />
            <p>{product.description}</p>
            <div className="flex pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>
                ${" "}
                {(
                  product.originalPrice -
                  (product.originalPrice * product.discountPrice) / 100
                ).toFixed(2)}
              </h4>
              <h3 className={`${styles.price}`}>
                ${product.originalPrice || null}
              </h3>
            </div>
            <p>{product.stock === 0 ? "out of stock" : null}</p>
          </div>
        </div>
      </div>
    );
}

export default AdminViewProductDetails;
