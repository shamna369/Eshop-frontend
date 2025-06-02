import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import ProductCard from "./ProductCard";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import { TOTAL_LIMIT } from "../../constants";
import { useProducts } from "../../hooks/productHooks/useProducts";
import styles from "../../styles/styles";
import { useEffect } from "react";

function AllProductsPage() {
  const {
    isPending: isLoading,
    isError,
    data = { products: [], totalDocumentsCount: 0 },
    error,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  } = useProducts();
  const totalPageNo = Math.ceil(data?.totalDocumentsCount / TOTAL_LIMIT);

  function handleUpPagination(page) {
    setPage((cur) => cur + 1);
  }
  function handleDownPagination(page) {
    setPage((cur) => cur - 1);
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);
  return (
    <div>
      <div className={`${styles.section}`}>
        {(isLoading || isFetching) && <Loader />}
        {/* {isFetching ? <Loader /> : null} */}
        {isError && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        )}
        {!isLoading && data.products.length === 0 && !isError && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products available!
          </h1>
        )}

        {/* product items */}
        <div className="grid min-h-[100vh] grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px]  mb-12">
          {!isLoading &&
            data &&
            data.products.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
        {/* pagination component */}
        <div className="flex items-center justify-center m-2 ">
          <button
            disabled={page === 1 || isPlaceholderData}
            className=" px-2 py-1 w-8 h-8 text[1.5rem] cursor-pointer bg-blue-400 font-semibold rounded-sm disabled:bg-slate-400"
            onClick={() => handleDownPagination(page)}
          >
            <GrFormPrevious size={20} />
          </button>
          <p className="w-8 h-8 px-2 py-1 text[1.5rem] bg-blue-400 font-semibold m-1 rounded-sm ">
            {page}
          </p>
          <button
            disabled={page === totalPageNo || isPlaceholderData}
            className="px-2 py-1 w-8 h-8 text[1.5rem] cursor-pointer bg-blue-400 font-semibold rounded-sm  disabled:bg-slate-400 disabled:cursor-not-allowed"
            onClick={() => handleUpPagination(page)}
          >
            <MdNavigateNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;
