import useGet from "./useGet";
import Cookies from "js-cookie";

interface UseProductFetchProps {
  productId?: string;
}

const useProductFetch = ({ productId }: UseProductFetchProps) => {
  const token = Cookies.get("token");

  const baseURL = process.env.REACT_APP_SERVER_PORT;

  const { data, isLoading, makeRequest } = useGet(
    `${baseURL}/get-product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return { data, isLoading, makeRequest };
};

export default useProductFetch;
