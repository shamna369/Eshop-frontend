/* eslint-disable react/prop-types */
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import styles from "../../styles/styles";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromcartItems,
} from "../../redux/reducers/cart";
import { toast } from "react-toastify";
function CartItems({ data }) {
  const dispatch = useDispatch();
  function handleIncreaseQuantity(item) {
    if (item.stock >= item.quantity + 1) dispatch(increaseQuantity(item._id));
  }
  function handleDecreaseQuantity(item) {
    if (item.quantity - 1 >= 1) dispatch(decreaseQuantity(item._id));
  }
  const totalPrice = (data.discountPrice * data.quantity).toFixed(2);
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <button
            disabled={data.quantity === data.stock}
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] disabled:pointer-events-none ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => handleIncreaseQuantity(data)}
          >
            <HiPlus size={18} color="#fff" />
          </button>
          <span className="pl-[10px]">{data.quantity}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => handleDecreaseQuantity(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <div className="w-[120px] flex justify-center items-center">
          <img
            src={data?.images?.[0] || data?.images?.[1] || "/default.jpg"}
            alt=""
            className="max-w-[120px] max-h-[60px]  rounded-[5px]"
          />
        </div>
        <div className="pl-[5px]">
          <h1 className="text-[14px]">{data.name}</h1>
          <h4 className="font-[400] text-[14px] text-[#00000082]">
            ${data.discountPrice}
          </h4>
          <h4 className="font-[600] pt-[3px]  font-sans">
            $ <span className="">{totalPrice}</span>
          </h4>
          {data.quantity === data.stock && (
            <p className="text-[#d02222] text-[10px]">stock is limitted</p>
          )}
        </div>
        <RxCross1
          className="cursor-pointer absolute right-0 mr-8 text-red-700 font-bold "
          onClick={() => dispatch(removeItemFromcartItems(data._id))}
        />
      </div>
    </div>
  );
}

export default CartItems;
