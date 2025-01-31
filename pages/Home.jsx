import React from "react";
import { useSelector } from "../react-redux";
import Product from "../components/Product";
import { getAllProducts, getProductError, getProductLoadingState } from "../store/slices/productsSlice";

export default function Home() {
  const isLoading = useSelector(getProductLoadingState);
  const productsList = useSelector(getAllProducts);
  const error = useSelector(getProductError);

  console.log(isLoading)

  return isLoading ? <h1>Loading...</h1> : error || (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}
