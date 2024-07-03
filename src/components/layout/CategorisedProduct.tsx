import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Product } from "../../redux/interfaces/interfaces";
import ProductCard from "../layout/ProductCard";

interface ProductCategoryProps {
  category: string;
}

const CategorisedProduct: React.FC<ProductCategoryProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("token");
  const url = process.env.REACT_APP_SERVER_PORT;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    const start = (page - 1) * 9;
    const end = start + 8;
    try {
      const response = await axios.get(
        `${url}/get-product-category/${category}?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
    setProducts([]);
    setPage(1);
    fetchProducts(page);
  }, [category]);

  useEffect(() => {
    function handleScroll() {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >= containerRef.current.offsetTop &&
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
    <div className="px-6 gap-6flex-grow">
      {loading && page === 1 && <div>Loading...</div>}
      {!loading && error && <div className="text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
        {products.map((product, index) => (
          <div className="grid-col-4" key={index}>
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
      {loading && page === 1 && <div className="p-8">Loading more...</div>}
      {!loading && error && <div className="p-8 text-red-600">{error}</div>}

      {!loading && !hasMore && (
        <p style={{ textAlign: "center", width: "100%" }}>
          <b>{"Yay! You have seen it all"}</b>
        </p>
      )}
      {loading && hasMore && <h4>Loading more...</h4>}
      <div ref={containerRef} style={{ height: "1px", visibility: "hidden" }} />
    </div>
  );
};

export default CategorisedProduct;
