import Header from "../components/Layout/Header";
import SimpleFooter from "../components/Layout/SimpleFooter";
import Login from "../components/user/Login";

function LoginPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <Login />
      <SimpleFooter />
    </div>
  );
}

export default LoginPage;
