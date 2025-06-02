import { useEffect, useRef } from "react";
import ProductCard from "../Products/ProductCard";
import styles from "../../styles/styles";
import { useFeaturedProducts } from "../../hooks/productHooks/useFeaturedProducts";
import Loader from "../Layout/Loader";

function FeaturedProducts() {
  const { data: allProducts = [], isPending, error } = useFeaturedProducts();
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current && !isPending) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0.5],
      };

      const intersectionCallback = (entries, observer) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("translate-y-0", "opacity-100");
            target.classList.remove("translate-y-10", "opacity-0");
            observer.unobserve(target);
          }
        });
      };

      const observer = new IntersectionObserver(intersectionCallback, options);

      const productCards =
        parentRef.current.querySelectorAll(".product-card") || [];
      productCards.forEach((card) => observer.observe(card));

      return () => {
        productCards.forEach((card) => observer.unobserve(card));
      };
    }
  }, [isPending]);

  if (isPending) return <Loader />;
  return (
    <div>
      <div className={`${styles.section} mb-[10rem]`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div
          className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0"
          ref={parentRef}
        >
          {allProducts?.length &&
            allProducts?.map((i, index) => (
              <div
                key={index}
                className="product-card transform transition-all duration-300 ease-out translate-y-10 opacity-0"
              >
                <ProductCard data={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
