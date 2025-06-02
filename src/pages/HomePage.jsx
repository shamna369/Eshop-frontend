import Category from "../components/Categories/Category";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <Category />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default HomePage;
