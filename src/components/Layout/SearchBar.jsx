import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Link, NavLink, useParams } from "react-router-dom";

import { useGetNameList } from "../../hooks/productHooks/useSearchName";

function SearchBar() {
  const {
    isPending,
    data,
    error,
    search: searchTerm,
    setSearch: setSearchTerm,
  } = useGetNameList();

  const searchRef = useRef(null);
  const { id } = useParams();
  // Handle the search term input and filter the product data
  function handleSearchData(e) {
    const term = e.target.value;
    setSearchTerm(term);
  }
  useEffect(() => {
    // Reset search term when the product ID changes
    setSearchTerm(null);
  }, [id, setSearchTerm]);
  useEffect(() => {
    // Function to handle clicks outside of the search bar
    function handleClickDocument(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm(null);
      }
    }

    // Add event listener for outside click
    document.addEventListener("click", handleClickDocument);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("click", handleClickDocument);
    };
  }, [setSearchTerm]);

  return (
    <div className="w-[50%] relative">
      <input
        type="text"
        className="w-full p-1 border-2 rounded-lg outline-none border-blue-700"
        placeholder="search products..."
        value={searchTerm || ""}
        onChange={handleSearchData}
        ref={searchRef}
      />
      <AiOutlineSearch
        size={20}
        className="absolute right-2 top-1.5 cursor-pointer text-blue-400"
      />
      {isPending && null}
      {data?.productList && searchTerm && (
        <ul className="absolute max-h-[50vh] z-10 bg-white w-full right-0 rounded-sm shadow-sm overflow-auto">
          {data?.productList.map((el, i) => (
            <NavLink to={`/productDetails/${el._id}`} key={el._id}>
              <div className="py-1 px-2 border-b border-slate-200 last:border-none break-words flex cursor-pointer items-center hover:font-semibold hover:bg-blue-100">
                <li className="text-[13px] font-Roboto ml-2 text-[#333]">
                  {el.name}
                </li>
              </div>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
