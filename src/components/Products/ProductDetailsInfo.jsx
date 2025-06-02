/* eslint-disable react/prop-types */
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  addProductTocartItems,
  removeItemFromcartItems,
} from "../../redux/reducers/cart";
import { useState } from "react";
import Ratings from "../Rating/Ratings";
function ProductDetailsInfo({ data }) {
  const {
    category = "others",
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
    _id,
  } = data;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const isAlreadyInCart = cartItems.find((el) => el._id === _id);
  const [isInCart, setIsInCart] = useState(isAlreadyInCart);
  const [click, setClick] = useState(false);
  // console.log(isAlreadyInCart);
  //console.log(`data in details info page is ${data}`);
  const discount = (
    originalPrice -
    (originalPrice * discountPrice) / 100
  ).toFixed(2);

  function handleIncreaseQuantity(_id) {
    if (stock >= isAlreadyInCart?.quantity + 1) dispatch(increaseQuantity(_id));
  }
  function handleDecreaseQuantity(_id) {
    if (isAlreadyInCart?.quantity - 1 >= 1) dispatch(decreaseQuantity(_id));
  }
  //console.log(data);
  return (
    <div className="w-full 800px:w-[50%] pt-5">
      <h2 className="text-slate-400 uppercase  ">{category}</h2>
      <h1 className={`${styles.productTitle}`}>{name}</h1>
      <Ratings rating={ratings} />
      <p>{description}</p>
      <div className="flex pt-3">
        <h4 className={`${styles.productDiscountPrice}`}>${discount}</h4>
        <h3 className={`${styles.price}`}>{originalPrice || null}</h3>
      </div>
      <p>{stock === 0 ? "out of stock" : null}</p>
      <div className="flex datas-center mt-12 justify-between pr-3">
        <div>
          <button
            className="bg-blue-400 text-white font-bold rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => handleDecreaseQuantity(_id)}
          >
            -
          </button>
          <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
            {isAlreadyInCart?.quantity || 0}
          </span>
          <button
            className="bg-blue-400 text-white font-bold rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => handleIncreaseQuantity(_id)}
          >
            +
          </button>
          {isAlreadyInCart && (
            <div
              className=" inline-block text-red-600 text-xl ml-[1rem] cursor-pointer"
              onClick={() => dispatch(removeItemFromcartItems(_id))}
            >
              <RiDeleteBinLine />
            </div>
          )}
        </div>
      </div>

      {isAlreadyInCart ? (
        <span className="text-blue-500 text-sm">added in cart</span>
      ) : null}
      {isAlreadyInCart && isAlreadyInCart?.quantity >= stock ? (
        <span className="text-red-500 text-sm block">stock is limitted</span>
      ) : null}
      <div
        className={`${styles.button} bg-blue-800 !mt-6 !rounded !h-11 flex datas-center`}
        onClick={() => {
          dispatch(
            addProductTocartItems({
              discountPrice: discount,
              images,
              name,
              originalPrice,
              stock,
              _id,
            })
          );
          setIsInCart(true);
        }}
      >
        <span className="text-white flex datas-center">
          Add to cart <AiOutlineShoppingCart className="ml-1" />
        </span>
      </div>
    </div>
  );
}

export default ProductDetailsInfo;
