import { useSelector } from "react-redux";

import CartInfo from "./CartInfo";
import CheckoutSteps from "./CheckoutSteps";
import ShippingInfo from "./ShippingInfo";

function CheckoutMain() {
  const cart = useSelector((store) => store.cart.cartItems);

  return (
    <div className="w-[96%] mx-auto min-h-[70vh] my-[1rem]  grid grid-cols-3 gap-0 grid-rows-[auto] shadow-sm bg-slate-100">
      <div className=" h-[70px] col-span-3 flex justify-center items-center mb-4">
        <CheckoutSteps />
      </div>

      <div className="bg-white min-h-[25rem] p-10 col-span-3 md:col-span-2 flex justify-center items-center shadow-md">
        <ShippingInfo />
      </div>

      <div className="bg-white min-h-[25rem] mt-4 p-10 col-span-3 md:col-span-1 md:ml-8 md:mt-0 flex justify-center items-center shadow-md">
        <CartInfo />
      </div>
    </div>
  );
}

export default CheckoutMain;
