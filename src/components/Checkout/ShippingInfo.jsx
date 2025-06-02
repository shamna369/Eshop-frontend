import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { server } from "../../server";
import { emptyCartItems } from "../../redux/reducers/cart";
import { toast } from "react-toastify";
import { createNewOrderDetails } from "../../redux/reducers/order";
import { useGetUserData } from "../../hooks/userHooks/useGetUserData";
function ShippingInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, isLoading, isError } = useGetUserData();
  const cart = useSelector((store) => store.cart.cartItems);
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.discountPrice),
    0
  );
  const [paymentType, setPaymentType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [landMark, setLandMark] = useState("");

  const userId = user?._id || "";
  async function handleOrder(e, { ...details }) {
    e.preventDefault();
    const { email, fullName, address, landMark, phone, cart } = details;
    if (cart.length === 0) {
      toast.error("Your Cart is Empty");
      return;
    }
    if (
      !fullName ||
      !landMark ||
      !address ||
      !phone ||
      !email ||
      !paymentType
    ) {
      toast.error("Please fill out the form");
      return;
    } else {
      //create order
      try {
        const res = await axios.post(`${server}/order/create-new-order`, {
          shippingAddress: { address, landMark, phone },
          cart,
          userId,
        });
        console.log(res.data);
        if (res.status === 201) {
          const { _id, userId } = res.data.newOrder;

          dispatch(
            createNewOrderDetails({
              userId,
              orderId: _id,
              totalPrice,
              name: fullName,
              email,
            })
          );

          if (paymentType === "2") navigate("payment-form");
          if (paymentType === "1") navigate("order-successful");
          dispatch(emptyCartItems());
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (!user) return null;

  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-black font-bold "
      >
        <MdKeyboardBackspace size={24} />
      </button>
      <form>
        <div className="grid md:grid-cols-2 md:gap-2">
          <div>
            <label className="capitalize">
              full name <span className="text-red-500 ">*</span>
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className="w-full h-[40px] px-1 border border-slate-300 outline-none rounded-[5px]"
            />
          </div>
          <div>
            <label className="capitalize">
              Email <span className="text-red-500 ">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] px-1 border border-slate-300  outline-none rounded-[5px]"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-2">
          <div>
            <label className="capitalize">
              Phone Number <span className="text-red-500 ">*</span>
            </label>
            <input
              required={true}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full h-[40px] px-1 border border-slate-300  outline-none rounded-[5px]"
            />
          </div>
          <div>
            <label className="capitalize">
              Shipping Address <span className="text-red-500 ">*</span>
            </label>
            <input
              required={true}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="w-full h-[40px] px-1 border border-slate-300  outline-none rounded-[5px]"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-2">
          <div className="flex flex-col">
            <label className="capitalize">
              Local land mark <span className="text-red-500 ">*</span>
            </label>
            <input
              required={true}
              onChange={(e) => setLandMark(e.target.value)}
              value={landMark}
              className="w-full  h-[40px] px-1 border border-slate-300  outline-none rounded-[5px]"
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="capitalize">
              Payment Method <span className="text-red-500 ">*</span>
            </label>
            <select
              value={paymentType}
              required={true}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full  h-[40px] px-1 border border-slate-300  outline-none rounded-[5px]"
            >
              <option value={""} disabled={true} className="text-gray-400">
                --Select payment type--
              </option>
              <option value={1}>Cash on delivery</option>
              <option value={2}>Card</option>
            </select>
          </div>
        </div>
        <button
          onClick={(e) =>
            handleOrder(e, {
              email,
              fullName,
              address,
              landMark,
              phone,
              cart,
            })
          }
          className="p-2 font-semibold mt-4 rounded-md text-white bg-blue-700"
        >
          Order Now
        </button>
      </form>
    </div>
  );
}

export default ShippingInfo;
