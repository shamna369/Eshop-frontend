import ProductCard from "./ProductCard";
import styles from "../../styles/styles";
import { productData as allProducts } from "../../static/data";
import { useEffect, useRef, useState } from "react";

function FeaturedProducts() {
  // const { allProducts } = useSelector((state) => state.products);
  const parentRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add("translate-y-0", "opacity-100");
          target.classList.remove("translate-y-[40%]", "opacity-0");
        } else {
          target.classList.add("translate-y-[40%]", "opacity-0");
          target.classList.remove("translate-y-0", "opacity-100");
        }
      });
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    // Observe each product card individually
    const productCards = parentRef.current.querySelectorAll(".product-card");
    productCards.forEach((card) => observer.observe(card));

    return () => {
      // Cleanup: Unobserve all product cards
      productCards.forEach((card) => observer.unobserve(card));
    };
  }, []);
  return (
    <div>
      <div
        className={`${styles.section} mb-[10rem] border-b-2 border-blue-500 `}
      >
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div
          className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0"
          ref={parentRef}
        >
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts &&
                allProducts.map((i, index) => (
                  <div
                    key={index}
                    className="product-card transform transition-transform duration-300 ease-out translate-y-10 opacity-0"
                  >
                    <ProductCard data={i} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
