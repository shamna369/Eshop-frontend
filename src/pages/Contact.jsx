import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

function Contact() {
  return (
    <div>
      <Header />
      <br />
      <div className={`${styles.section} h-[30rem] bg-blue-100 shadow-md p-4`}>
        <h1 className="text-3xl text-blue-800 font-bold pt-[3rem] ">
          Welcome to <span className="text-orange-500">Shop</span>
          <span className="text-black">O</span> Customer Service What would you
          like help with today?
        </h1>
        <h2 className="text-2xl text-blue-700  pt-[2rem] font-semibold">
          You can quickly take care of most things here, or connect with us when
          needed.
        </h2>
        <div className=" flex justify-center items-center pt-[3rem]">
          <p>
            Contact us through:{" "}
            <span className="text-blue-500">shopocustmrservice@gmail.com</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
