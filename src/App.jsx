import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import styles from "./styles/styles";

import PageNotFound from "./pages/PageNotFound";
import IndexPage from "./pages";
import HomePage from "./pages/HomePage";
import Cart from "./components/Cart/Cart";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UserDetails from "./components/Profile/UserDetails";

import ProductsPage from "./pages/ProductsPage";
import CategoryProducts from "./components/Categories/CategoryProducts";
import Contact from "./pages/Contact";
import Address from "./components/Profile/Address";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./components/Order/OrderSuccess";
import CheckoutMain from "./components/Checkout/CheckoutMain";
import PaymentForm from "./components/Payment/PaymentForm";
import PaymentStatus from "./components/Payment/PaymentStatus";
import PaymentSuccessPage from "./components/Payment/PaymentSuccessPage";
import OrderTable from "./components/Order/OrderTable";
import ChangePassword from "./components/Profile/ChangePassword";
import AdminPage from "./pages/AdminPage";
import AdminAllOrders from "./components/Admin/AdminAllOrders";
import AdminAllProducts from "./components/Admin/AdminAllProducts";
import AdminViewProductDetails from "./components/Admin/AdminViewProductDetails";
import AdminCreateProduct from "./components/Admin/AdminCreateProduct";
import AdminEditProduct from "./components/Admin/AdminEditProduct";
import AdminShowUsers from "./components/Admin/AdminShowUsers";
import OrderDetails from "./components/Order/OrderDetails";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LogoutPage from "./pages/LogoutPage";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/index" element={<IndexPage />} />
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productDetails/:id" element={<ProductDetailsPage />} />
          <Route path="/allProducts" element={<ProductsPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route
            path="/allProducts/category/:category"
            element={<CategoryProducts />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />}>
              <Route index element={<CheckoutMain />} />
              <Route path="order-success" element={<PaymentSuccessPage />} />
              <Route path="payment-form" element={<PaymentForm />} />
              <Route path="order-successful" element={<OrderSuccess />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<Navigate replace to="userdetails" />} />
              <Route path="userdetails" element={<UserDetails />} />
              <Route path="orders" element={<OrderTable />} />
              <Route path="orders/:id" element={<OrderDetails />}></Route>
              <Route path="changepassword" element={<ChangePassword />} />

              <Route path="address" element={<Address />} />
            </Route>
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-users" element={<AdminShowUsers />} />
            <Route path="all-orders" element={<AdminAllOrders />} />
            <Route
              path="all-orders/order-details/:id"
              element={<OrderDetails />}
            />
            <Route path="all-users" element={<AdminShowUsers />} />
            <Route
              path="all-products/product-view/:id"
              element={<AdminViewProductDetails />}
            />
            <Route path="all-products" element={<AdminAllProducts />} />
            <Route path="create-product" element={<AdminCreateProduct />} />
            <Route
              path="all-products/edit-product/:id"
              element={<AdminEditProduct />}
            />
            <Route path="all-users" element={""} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer autoClose={5000} />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
