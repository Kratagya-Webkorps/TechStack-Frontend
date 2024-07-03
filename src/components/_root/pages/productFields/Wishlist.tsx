import React, { useEffect, useState } from "react";
import {
  DELETE_FROM_WISHLIST,
  Product,
} from "../../../../redux/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import useWishlistFetch from "../../../../hooks/useWishlistFetch";
import axios from "axios";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import usePost from "../../../../hooks/usePost";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const loginDetails = useSelector((state: any) => state.loginForm);
  const username = loginDetails.username;
  const userRole = loginDetails.role;
  const token = Cookies.get("token");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data: wishlistData } = useWishlistFetch({ username });
  const { data, makeRequest: removeFromWishlistRequest } = usePost(
    `${baseURL}/delete-from-wishlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlistRequest({
        username: username,
        productId: productId,
      });
      dispatch({
        type: DELETE_FROM_WISHLIST,
        payload: { username: username, productId: productId },
      });

      setWishlistProducts((prevWishlistProducts) =>
        prevWishlistProducts.filter(
          (product) => product.product._id !== productId
        )
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setError("Error removing product from wishlist");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wishlistData) {
          const productPromises = wishlistData.products.map(async (item) => {
            const response = await axios.get(
              `${baseURL}/get-product/${item.productId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            return {
              product: response.data,
              quantity: item.quantity,
            };
          });

          const resolvedProducts = await Promise.all(productPromises);

          setWishlistProducts(resolvedProducts);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };

    fetchData();
  }, [wishlistData, token, baseURL]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-md">
      <div className="mb-5">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          Return To Shop
        </Link>
      </div>
      <table className="w-full mb-5 border-collapse border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {wishlistProducts.map((product) => (
            <tr key={product.product._id} className="border-b">
              <td className="p-2 flex items-center">
                <img
                  src={product.product.productImage}
                  alt={product.product.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="ml-3">{product.product.name}</span>
              </td>
              <td className="p-2">{product.product.price}</td>
              <td
                className="p-2 cursor-pointer"
                onClick={() => handleRemove(product.product._id)}
              >
                <RxCross2 />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Wishlist;
