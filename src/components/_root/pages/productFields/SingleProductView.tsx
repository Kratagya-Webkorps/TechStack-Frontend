import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductFetch from "../../../../hooks/useProductFetch";
import ProductPage from "./ProductPage";

const SingleProductView: React.FC = () => {
  const { productId: routeProductId } = useParams<{ productId: string }>();
  const productId = routeProductId;
  
  const {
    data: initialData,
    isLoading,
    makeRequest,
  } = useProductFetch({
    productId: productId,
  });

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await makeRequest();
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [data, makeRequest]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setData(null);
  }, [productId]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { category, description, name, price, productImage, rating, stock } = data;

  return (
    <div className="p-8 flex flex-grow justify-center">
      <ProductPage
        category={category}
        description={description}
        name={name}
        price={price}
        productImage={productImage}
        rating={rating}
        stock={stock}
      />
    </div>
  );
};

export default SingleProductView;
