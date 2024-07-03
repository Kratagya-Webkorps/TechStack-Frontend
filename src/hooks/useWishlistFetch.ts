import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { CartData } from "../redux/interfaces/interfaces";

interface useWishlistFetchProps {
  username: string;
}

interface WishlistDataProps {
  username:string;
  products: CartData[];
}

const useWishlistFetch = ({ username }: useWishlistFetchProps) => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const userRole = loginDetails.role;
  const token = Cookies.get("token");

  const [data, setData] = useState<WishlistDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${baseURL}/get-wishlist`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [username, baseURL, token]);

  return { data, error, isLoading };
};

export default useWishlistFetch;
