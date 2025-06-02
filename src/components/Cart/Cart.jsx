/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { increaseQuantity, decreaseQuantity } from "../../redux/reducers/cart";
import CartItems from "./CartItems";
function Cart({ setIsCartOpen }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.discountPrice),
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className=" p-6 fixed top-0 right-0 max-h-screen w-[80%] md:w-[40%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full bg-white min-h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-8 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-red-700"
                onClick={() => setIsCartOpen(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <div className="">
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer text-red-700 font-bold"
                  onClick={() => setIsCartOpen(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => <CartItems key={index} data={i} />)}
              </div>
            </div>

            <div className=" mb-5 py-1 flex items-center justify-center flex-col ">
              {/* checkout buttons */}
              <p className=" my-2 text-[15px] ">
                {" "}
                Total -{" "}
                <span className="text-red-500 font-semibold">
                  {" "}
                  $ {totalPrice.toFixed(2)}
                </span>
              </p>
              <NavLink to="/checkout">
                <div
                  className={`h-[34px] flex items-center justify-center  bg-blue-800 rounded-[5px] px-5`}
                >
                  <h1 className="text-[#fff] text-[15px] font-[600]">
                    Checkout Now
                  </h1>
                </div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
