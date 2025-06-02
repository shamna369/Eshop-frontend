/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addProductTocartItems } from "../../redux/reducers/cart";
import { NavLink } from "react-router-dom";
import styles from "../../styles/styles";
import Ratings from "../Rating/Ratings";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
function ProductCard({ data }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    category,
    description,
    discountPrice,
    images,
    name,
    originalPrice,
    ratings,
    reviews,
    shopId,
    sold_out,
    stock,
    _id: id,
  } = data;
  const discount = (
    originalPrice -
    (originalPrice * discountPrice) / 100
  ).toFixed(2);
  const imagesdb = ["1734246883138-user-1.jpg", "1734246883131-default.jpg"];
  function handleAddToCart(data) {}

  return (
    <div>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <NavLink to={`/productDetails/${id}`}>
          <img
            onClick={() => setOpen(true)}
            src={images?.[0] || images?.[1]}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </NavLink>
        <div>
          <h5 className={`${styles.shop_name}`}>
            {shopId === "0" ? "shopid5932" : shopId}
          </h5>
        </div>
        <NavLink to={`/productDetails/${id}`}>
          <h4 className="pb-3 font-[500]">
            {name.length > 40 ? name.slice(0, 40) + "..." : name}
          </h4>

          <div className="flex">
            <Ratings rating={ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                $
                {(
                  originalPrice -
                  (discountPrice * originalPrice) / 100
                ).toFixed(2)}
              </h5>
              <h4 className={`${styles.price}`}>
                {originalPrice ? originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[14px] text-[#68d284]">
              {sold_out} sold
            </span>
          </div>
        </NavLink>

        {/* side options */}
        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24 hover:bg-blue-400 hover:rounded-full hover:p-1"
            color="#444"
            title="Add to cart"
            onClick={() => {
              dispatch(
                addProductTocartItems({
                  discountPrice: discount,
                  images,
                  name,
                  originalPrice,
                  stock,
                  _id: id,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
