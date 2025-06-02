import { useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";

function CartInfo() {
  const cart = useSelector((store) => store.cart.cartItems);
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.discountPrice),
    0
  );

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">{totalPrice.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">0</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        $ {totalPrice.toFixed(2)}
      </h5>
      <br />
      <form>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
          disabled={true}
        />
      </form>
    </div>
  );
}

export default CartInfo;
