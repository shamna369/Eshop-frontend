import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderById } from "../../hooks/orderHooks/useGetOrderById";
import Loader from "../Layout/Loader";
function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isPending, isError, data, error } = useGetOrderById(id);
  //console.log(data);
  return (
    <div key={id} className=" w-full flex items-center justify-center">
      {isPending && !data ? (
        <Loader />
      ) : (
        <div className="w-[94%] bg-white rounded-lg shadow-lg p-6 mt-8">
          <button className="font-bold" onClick={() => navigate(-1)}>
            <IoMdArrowBack size={20} title="back" />
          </button>
          <h1 className="mt-4 text-2xl font-bold mb-4 text-blue-800">
            Order Details
          </h1>

          {/* Order Information */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-bold">Order ID:</span> {data.id}
              </p>
              <p>
                <span className="font-bold">User ID:</span> {data.userId}
              </p>
              <p>
                <span className="font-bold">Date:</span>
                {new Date(data.createdAt).toLocaleDateString()}{" "}
                {new Date(data.createdAt).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-bold">Status:</span>{" "}
                <span className="text-green-600">{data?.status}</span>
              </p>
              <p>
                Payment Status:{""}{" "}
                <span className="text-green-600">
                  {data.paymentInfo?.status || ""}
                </span>
              </p>
              <p>
                Total Amount:{" "}
                <span className="font-bold text-red-800 ">
                  ${data.totalPrice}
                </span>
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-[20px] font-semibold mb-2">Shipping Address</h2>
            <p className="text-[14px] font-sans ">
              {data.shippingAddress?.address || ""}
            </p>
            <p className="text-[14px] font-sans ">
              {data.shippingAddress?.landMark || ""}
            </p>
            <p className="text-[14px] font-sans ">
              {data.shippingAddress?.phone || ""}
            </p>
          </div>

          {/* Items */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Items</h2>
            <div className="border rounded-lg overflow-hidden">
              {data?.cart?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b p-4 last:border-0"
                >
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{item.discountPrice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
