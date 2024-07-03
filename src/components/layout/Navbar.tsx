import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LOGOUT_SUCCESS,
  SAVE_TO_CART,
  SAVE_TO_WISHLIST,
  UPDATE_CART_ITEM_COUNT,
  UPDATE_WISHLIST_ITEM_COUNT,
} from "../../redux/interfaces/interfaces";
import Cookies from "js-cookie";
import NavbarContainer from "../utils/NavbarContainer";
import NavbarIcon from "../utils/NavbarIcon";
import NavbarItem from "../utils/NavbarItem";
import usePost from "../../hooks/usePost";
import useDebounce from "../../hooks/useDebounce";
import useCartFetch from "../../hooks/useCartFetch";
import { fetchCartLength } from "../../hooks/fetchCartLength";
import { fetchWishlistLength } from "../../hooks/fetchWishlistLength";

interface SearchResult {
  _id: string;
  name: string;
  category: string;
}

const Navbar: React.FC = () => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const cart = useSelector((state: any) => state.cart);
  const wishlist = useSelector((state: any) => state.wishlist);
  const tempWishlist = useSelector(
    (state: any) => state.wishlist.wishlistItems
  );
  const tempCart = useSelector((state: any) => state.cart.cartItems);

  const isLoggedIn = loginDetails.isLoggedIn;
  const userRole = loginDetails.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = loginDetails.username;
  const token = Cookies.get("token");
  const { data: cartData } = useCartFetch({ username });
  const [isOpen, setIsOpen] = useState(false);
  const [isLiOpen, setIsLiOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data, makeRequest } = usePost(`${baseURL}/get-cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { data: wishlistData, makeRequest: wishlistRequest } = usePost(
    `${baseURL}/get-wishlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const UserCartData =
    tempCart.find((item: any) => item.username === username) || 0;
  const UserWishlistData =
    tempWishlist.find((item: any) => item.username === username) || 0;

useEffect(() => {
if(searchQuery.length===0){
  navigate("/")

}
}, [searchQuery])

  useEffect(() => {
    if (username && cartData) {
      const sendData = {
        username: username,
        products: cartData.products,
      };

      dispatch({
        type: SAVE_TO_CART,
        payload: sendData,
      });

    }
  }, [username, cartData, dispatch]);
  useEffect(() => {
    if (username && wishlistData) {
      const sendData = {
        username: username,
        products: wishlistData.products,
      };

      dispatch({
        type: SAVE_TO_WISHLIST,
        payload: sendData,
      });

    }
  }, [username, cartData, dispatch]);

  useEffect(() => {
    const count = fetchCartLength(username, cart);
    setCartItemCount(count);

    dispatch({
      type: UPDATE_CART_ITEM_COUNT,
      payload: {
        username: username,
        count: count,
      },
    });
  }, [username]);
  useEffect(() => {
    const count = fetchWishlistLength(username, wishlist);
    setWishlistItemCount(count);

    dispatch({
      type: UPDATE_WISHLIST_ITEM_COUNT,
      payload: {
        username: username,
        count: count,
      },
    });
  }, [username]);
  useEffect(() => {
    setCartItemCount(UserCartData.cartItemCount);
  }, [UserCartData]);

  useEffect(() => {
    setWishlistItemCount(UserWishlistData.wishlistItemCount);
  }, [UserWishlistData]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    navigate("/");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  };

  const goToCart = async () => {
    if (cartItemCount <= 0) return;
    try {
      await makeRequest({ username: username });
      if (data) {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSearchResults = (productId: string, category: string) => () => {
    if (productId && category) {
      navigate(`/${category}/${productId}`);
    }
    setIsLiOpen(true);
  };

  const goToWishlist = async () => {
    if (wishlistItemCount <= 0) return;
    try {
      await wishlistRequest({ username: username });
      console.log(wishlistData);
      if (wishlistData) {
        navigate("/wishlist");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${serverPort}/name/${debouncedSearchQuery}`
        );
        const results: SearchResult[] = await response.json();
        setSearchResults(results);
  
        if (debouncedSearchQuery.match(/laptops|accessories|tvs|phones/i)) {
          navigate(`/${debouncedSearchQuery}`)
          console.log("Matched category:", debouncedSearchQuery);
        }

      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    if (debouncedSearchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, baseURL, token]);
  

  return (
    <NavbarContainer isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)}>
      <div className="flex gap-4 mx-4 items-center relative">
        <div className="relative w-full">
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            onChange={(e) => {
              setIsLiOpen(false);
              setSearchQuery(e.target.value);
            }}
            className=" w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <FiSearch
            className=" text-gray-700 absolute top-2 left-2"
            size={20}
          />
          {searchResults.length > 0 && (
            <div
              className={`${
                isLiOpen ? "hidden" : "block"
              } absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10`}
            >
              <ul>
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleSearchResults(result._id, result.category)}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <NavbarIcon Icon={FiHeart} onClick={goToWishlist} />
          {wishlistItemCount > 0 && (
            <span className="absolute rounded-full py-1 px-2 text-xs font-medium leading-none grid place-items-center top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white">
              {wishlistItemCount}
            </span>
          )}
        </div>
        <div className="relative">
          <FiShoppingCart
            className="text-gray-700 cursor-pointer"
            size={25}
            onClick={goToCart}
          />
          {cartItemCount > 0 && (
            <span className="absolute rounded-full py-1 px-2 text-xs font-medium leading-none grid place-items-center top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } items-center justify-between w-full md:flex md:w-auto md:order-1 absolute top-16 md:relative md:top-0 left-0 right-0 bg-white md:bg-transparent md:border-none dark:bg-gray-800 dark:border-gray-700 md:dark:bg-transparent md:dark:border-none md:dark:text-white md:flex-row md:p-0 md:mt-0 md:space-x-8 rtl:space-x-reverse`}
        id="navbar-sticky"
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
          <NavbarItem to="/" label="Home" onClick={closeMenu} />
          <NavbarItem to="/contact" label="Contact" onClick={closeMenu} />
          <NavbarItem to="/about" label="About" onClick={closeMenu} />
          {!isLoggedIn && (
            <NavbarItem to="/signup" label="Signup" onClick={closeMenu} />
          )}
          {isLoggedIn && (
            <>
              <NavbarItem
                to={`/${username}`}
                label={
                  userRole === "admin" ? `${username}(Admin)` : `${username}`
                }
                onClick={closeMenu}
              />
              {userRole === "admin" && (
                <NavbarItem
                  to="/addproducts"
                  label="Add Products"
                  onClick={closeMenu}
                />
              )}
              <li>
                <button
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
