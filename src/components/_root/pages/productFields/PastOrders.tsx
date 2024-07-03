import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../../../redux/interfaces/interfaces";
import { Link } from "react-router-dom";
import useOrdersFetch from "../../../../hooks/useOrdersFetch";

const PastOrders = () => {
  const loginDetails = useSelector((state: any) => state.loginForm);
  const username = loginDetails.username;
  const userRole = loginDetails.role;
  const token = Cookies.get("token");

  const [orderProducts, setOrderProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const baseURL =
    userRole === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const { data: orderData } = useOrdersFetch({ username });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (orderData) {
          const productPromises = orderData.map(async (order) => {
            const productsWithDetails = await Promise.all(
              order.products.map(async (item) => {
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
              })
            );

            return productsWithDetails;
          });

          const resolvedProductsArray = await Promise.all(productPromises);
          const flattenedProducts = resolvedProductsArray.flat();
          setOrderProducts(flattenedProducts);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };

    fetchData();
  }, [orderData]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-md">
      <div className="mb-5">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          Return To Shop
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mb-5 border-collapse border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left w-fit">Subtotal</th>
              <th className="p-2 text-left">Track Location</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((item) => (
              <tr key={item.product._id} className="border-b">
                <td className="p-2 flex flex-col md:flex-row items-center">
                  <img
                    src={item.product.productImage}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain"
                  />
                  <span className="ml-3 ">
                    {item.product.name.length > 30
                      ? `${item.product.name.substring(0, 30)}...`
                      : item.product.name}
                  </span>
                </td>

                <td className="p-2">{item.product.price}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2 w-fit">
                  {item.product.price * item.quantity} Rs.
                </td>
                <td className="p-2 text-sky-500 underline">
                  <Link to="/orders/track">Track Now</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default PastOrders;
