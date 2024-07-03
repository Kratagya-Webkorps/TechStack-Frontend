import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

interface PaymentResponse {
  amount: number;
  currency: string;
  status: string;
  method: string;
}

const useRazorpayPayment = () => {
  const [responseId, setResponseId] = useState<string>("");
  const [responseState, setResponseState] = useState<Partial<PaymentResponse>>(
    {}
  );
  const token = Cookies.get("token");
  const loginDetails = useSelector((state: any) => state.loginForm);

  const baseURL =
    loginDetails.role === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount: number) => {
    const data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseURL}/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      handleRazorpayScreen(response.data.amount);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handleRazorpayScreen = async (amount: number) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Failed to load Razorpay SDK. Are you online?");
      return;
    }

    const options: RazorpayOptions = {
      key: "rzp_test_tYWqeAHNvQufSm",
      amount: amount,
      currency: "INR",
      name: "Kratagya Agrawal",
      description: "Payment to Kratagya Agrawal",
      handler: (response: RazorpayResponse) => {
        setResponseId(response.razorpay_payment_id);
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const fetchPayment = async (paymentId: string) => {
    try {
      const response = await axios.get(`${baseURL}/payment/${paymentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseState(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  return { createRazorpayOrder, fetchPayment, responseId, responseState };
};

export default useRazorpayPayment;
