import { useDispatch, useSelector } from "react-redux";
import useCartFetch from "../../../../hooks/useCartFetch";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Product,
  REMOVE_FROM_CART,
} from "../../../../redux/interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";
import useRazorpayPayment from "../../../../hooks/useRazorpayPayment";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const username = loginDetails.username;
  const userRole = loginDetails.role;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  const { createRazorpayOrder, fetchPayment, responseId, responseState } =
    useRazorpayPayment();

  const [cartProducts, setCartProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data: cartData } = useCartFetch({ username });

  const handlePayment = async () => {
    try {
      await createRazorpayOrder(subtotal);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      setError("Error processing payment");
    }
  };
  const handleRemove = async (productId: string) => {
    try {
      const response = await axios.delete(`${baseURL}/delete-from-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          username: username,
          productId: productId,
        },
      });
      if (response.status === 200) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter(
            (product) => product.product._id !== productId
          )
        );
        setSubtotal(
          (prevSubtotal) =>
            prevSubtotal -
            cartProducts.find((product) => product.product._id === productId)!
              .product.price *
              cartProducts.find((product) => product.product._id === productId)!
                .quantity
        );
        dispatch({
          type: REMOVE_FROM_CART,
          payload: {
            username: username,
            productId: productId,
          },
        });
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      setError("Error removing product from cart");
    }
  };

  useEffect(() => {
    if (responseId) {
      fetchPayment(responseId);
    }
  }, [responseId, fetchPayment]);
  useEffect(() => {
    const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;
    if (!isObjEmpty(responseState)) {
      setOrderData((prevOrderData: any) => ({
        ...prevOrderData,
        ...responseState,
      }));
      const sendData = async () => {
        try {
          const response = await axios.post(
            `${baseURL}/${username}/create-order`,
            { ...orderData, ...responseState },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          navigate(`/${username}/orders`);
        } catch (error) {
          console.error("Error sending order data:", error);
          setError("Error creating order");
        }
      };

      sendData();
    }
  }, [responseState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cartData) {
          const productPromises = cartData.products.map(async (item) => {
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

          setCartProducts(resolvedProducts);
          setOrderData({
            username: cartData.username,
            products: cartData.products,
          });
          const subtotalValue = resolvedProducts.reduce(
            (accumulator, product) => {
              return accumulator + product.product.price * product.quantity;
            },
            0
          );

          setSubtotal(subtotalValue);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };

    fetchData();
  }, [cartData, token, baseURL]);

  return (
    <>
      {" "}
      {cartProducts.length > 0 ? (
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
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Subtotal</th>
                <th className="p-2 text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
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
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">
                    {product.product.price * product.quantity}
                  </td>
                  <td
                    className="p-2 cursor-pointer "
                    onClick={() => handleRemove(product.product._id)}
                  >
                    <RxCross2 />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border p-5">
            <div className="flex justify-between mb-3">
              <span>Subtotal:</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{subtotal}</span>
            </div>
            <button
              onClick={handlePayment}
              className="bg-red-500 text-white w-full mt-5 py-3 rounded-md"
            >
              Proceed to checkout
            </button>
          </div>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      ):(
        <h2 className="text-3xl mt-4 sm:text-4xl leading-normal font-extrabold tracking-tight">
          Nothing Inside Cart 
        </h2>
      )}
    </>
  );
};

export default Cart;
