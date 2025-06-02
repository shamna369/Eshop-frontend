import { Link, Outlet } from "react-router-dom";
import CheckoutMain from "../components/Checkout/CheckoutMain";
import Header from "../components/Layout/Header";
import SimpleFooter from "../components/Layout/SimpleFooter";
function CheckoutPage() {
  return (
    <div>
      <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <br />

      <Outlet />
      <SimpleFooter />
    </div>
  );
}

export default CheckoutPage;
