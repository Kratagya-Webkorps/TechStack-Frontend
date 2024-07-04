import React, { useEffect, useState } from "react";
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  ProductCardProps,
} from "../../redux/interfaces/interfaces";
import { FiStar } from "react-icons/fi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useProductFetch from "../../hooks/useProductFetch";
import usePost from "../../hooks/usePost";
import Cookies from "js-cookie";

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  id,
  rating,
  className = ""
}) => {
  const [isInWishlist, setisInWishlist] = useState(false);
  const navigate = useNavigate();
  const loginDetails = useSelector((state: any) => state.loginForm);
  const token = Cookies.get("token");
  const userRole = loginDetails.role;
  const username = loginDetails.username;
  const dispatch = useDispatch();
  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;
  const { makeRequest: sendRequest } = usePost(`${baseURL}/add-to-wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { makeRequest: removeFromWishlistRequest } = usePost(
    `${baseURL}/delete-from-wishlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { data, isLoading, makeRequest } = useProductFetch({ productId: id });
  useEffect(() => {
    if (data) {
      console.log(data.category);
      if (data.category === "accessories") {
        navigate(`/accessories/${data._id}`, {
          state: { productData: data },
        });
        return;
      }
      navigate(`/${data.category}s/${data._id}`, {
        state: { productData: data },
      });
    }
  }, [navigate, data]);

  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5  ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));

  const handleWishlist = async (event: any) => {
    event.stopPropagation();
    if (!username) return;
    if (isInWishlist === false) {
      const sendData = {
        username: username,
        productId: id,
      };

      try {
        await sendRequest(sendData);
        dispatch({
          type: ADD_TO_WISHLIST,
          payload: sendData,
        });
        console.log("Product added to wishlist successfully");
      } catch (err) {
        console.error("Error saving in wishlist:", err);
      }
    }
    if (isInWishlist) {
      try {
        await removeFromWishlistRequest({ username: username, productId: id });
        dispatch({
          type: DELETE_FROM_WISHLIST,
          payload: { username: username, productId: id },
        });
        console.log("Product added to wishlist successfully");
      } catch (err) {
        console.error("Error saving in wishlist:", err);
      }
    }

    setisInWishlist(!isInWishlist);
  };

  const handleProductClick = async () => {
    if (!userRole) {
      navigate("/login");
      return;
    }

    try {
      await makeRequest();
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  function truncateString(name: string) {
    if (name.length > 20) {
      return name.slice(0, 60) + "......";
    } else {
      const spacesToAdd = 20 - name.length;
      const paddedName = name + " ".repeat(spacesToAdd);
      return paddedName;
    }
  }
  const newName = truncateString(name);

  return (
    <div className={`border p-4 rounded-lg shadow-md w-54 h-70 ${className} `}>
      <div onClick={handleProductClick} className=" cursor-pointer">
        <img
          src={image}
          alt="Product"
          className="w-full h-40 mb-4 cursor-pointer object-contain bg-contain"
          onClick={handleProductClick}
        />
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-2 h-24">
              <span className="text-lg font-semibold">{newName}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold flex">
                <HiOutlineCurrencyRupee className="w-6 h-6" />
                {price}
              </span>
              <div className="flex">{stars}</div>
            </div>
          </div>

          <div className="flex">
            {isInWishlist ? (
              <FaHeart
                onClick={handleWishlist}
                className="cursor-pointer mr-2"
              />
            ) : (
              <FaRegHeart
                onClick={handleWishlist}
                className="cursor-pointer mr-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
