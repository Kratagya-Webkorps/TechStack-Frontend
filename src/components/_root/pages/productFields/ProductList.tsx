import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {  Product } from "../../../../redux/interfaces/interfaces";
import ProductCard from "../../../layout/ProductCard";

const SERVER_URL = process.env.REACT_APP_SERVER_PORT;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    const start = (page - 1) * 9;
    const end = start + 8;

    try {
      const response = await axios.get(
        `${SERVER_URL}/products/range?start=${start}&end=${end}`
      );
      const newProducts = response.data;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length === 9);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (
        bottomRef.current &&
        window.innerHeight + window.scrollY >= bottomRef.current.offsetTop &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="flex-grow px-6 gap-6">
      <div className="flex items-center justify-between mb-6 pt-6">
        <h2 className="text-2xl font-bold">Explore our products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
        {products.map((product, index) => (
          <div className="grid-col-4 " key={index}>
            <ProductCard
              key={index}
              id={product._id}
              image={product.productImage}
              name={product.name}
              price={product.price}
              rating={product.rating}
              className="max-w-xs"
            />
          </div>
        ))}
      </div>

      {loading && page === 1 && <div className="p-8">Loading...</div>}
      {!loading && error && <div className="p-8 text-red-600">{error}</div>}

      {!loading && !hasMore && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          <b>Yay! You have seen it all</b>
        </p>
      )}

      {loading && hasMore && <h4>Loading more...</h4>}

      <div ref={bottomRef} style={{ height: "1px", visibility: "hidden" }} />
    </div>
  );
};

export default ProductList;
