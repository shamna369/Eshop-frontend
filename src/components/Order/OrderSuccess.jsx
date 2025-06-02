import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../Layout/SimpleFooter";
import Header from "../Layout/Header";

import SimpleFooter from "../Layout/SimpleFooter";

const OrderSuccess = () => {
  return (
    <div className="">
      <PaymentSuccessPage />
    </div>
  );
};

// Optional: Heroicons for the success icon

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  // Mock order details (replace with actual data)
  const orderDetails = {
    orderId: "ORD123456",
    paymentMethod: "Credit Card",
    totalAmount: "$150.00",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          {/* <CheckCircleIcon className="h-16 w-16 text-green-500" /> */}
        </div>
        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => navigate("/allProducts")}
            className="bg-green-400 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
