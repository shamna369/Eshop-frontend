import axios from "axios";
import { TOTAL_LIMIT } from "../constants";
import { server } from "../server";

export const getAllProducts = async (page) => {
  const resData = await axios.get(
    `${server}/products/all-products?limit=${TOTAL_LIMIT}&page=${page}`
  );

  return resData.data;
};
//get all names,images of products type in search bar component
export const getAllSearchProducts = async (searchText) => {
  const resData = await axios.get(`${server}/products/all-products`, {
    params: { searchText, namesOnly: true },
  });

  return resData.data;
};
//get products details by id
export const getProductDetailsById = async (id) => {
  const resData = await axios.get(`${server}/products/details/${id}`);

  return resData.data.data;
};
//get high(above 4) rated products
export const getHighRatedProducts = async () => {
  const resData = await axios.get(
    `${server}/products/all-products?ratings[gte]=4&limit=15`
  );
  // console.log(resData.data.products);
  return resData.data.products;
};

//category wise products
export const getAllProductsByCategory = async (page, category) => {
  const resData = await axios.get(
    `${server}/products/all-products?limit=${TOTAL_LIMIT}&page=${page}&category=${category}`
  );

  return resData.data;
};
