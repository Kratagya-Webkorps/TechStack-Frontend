import { useState, useCallback } from "react";
import axios from "axios";

interface RequestConfig {
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
  };
}

export default function useGet(url: string, config?: RequestConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const makeRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, config);
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
    setIsLoading(false);
  }, [url, config]);

  return { data, isLoading, error, makeRequest };
}
