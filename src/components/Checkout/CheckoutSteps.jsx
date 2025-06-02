function CheckoutSteps() {
  return (
    <div className="px-6 py-2 flex items-center">
      <h2 className="py-1 px-4 rounded-full bg-red-400 text-white font-semibold">
        Shipping
      </h2>
      <span className="inline-block w-[50px]  h-[4px] bg-red-400 md:w-[100px]"></span>

      <h2 className="py-1 px-4 rounded-full bg-red-400 text-white font-semibold ">
        Payment
      </h2>
      <span className="inline-block w-[50px] h-[4px] bg-red-400 md:w-[100px]"></span>
      <h2 className="py-1 px-4 rounded-full bg-red-400 text-white font-semibold ">
        Order
      </h2>
    </div>
  );
}

export default CheckoutSteps;
