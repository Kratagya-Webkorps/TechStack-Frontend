import React, { useState, useCallback, ChangeEvent, FormEvent, useEffect } from "react";
import image01 from "../../../images/image01.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../../redux/interfaces/interfaces";
import Cookies from "js-cookie";
import InputField from "../../utils/InputField";
import Button from "../../utils/Button";
import usePost from "../../../hooks/usePost"; // Assuming the path to your usePost hook

interface LoginFormProps {
  role: "user" | "admin";
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeRequest, isLoading, data } = usePost(
    `${SERVER_PORT}${role === "admin" ? "/login-admin" : "/login"}`
  );

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {

    if (data) {
      const { email, role, success, username, token } = data; // Assuming your API response structure
      Cookies.set("token", token, { expires: 7, secure: true });

      if (success) {
        navigate("/");
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            userName: username,
            email: email,
            isLoggedIn: success,
            role: role,
          },
        });
       
      }
    }
  }, [data,navigate,dispatch])
  

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await makeRequest({
        username: userName,
        password: password,
      });

      
    } catch (err) {
      console.error("Error logging in:", err);
      setError(`Login failed: ${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row h-min mt-52  xl:mt-0">
      <div className="sm:w-1/2 hidden md:block justify-center items-center">
        <img
          src={image01}
          alt="Shopping Cart and Smartphone"
          className="max-h-full max-w-full"
        />
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 ">
        <form
          className="bg-white p-6 rounded-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4">
            {role === "admin" ? "Admin Login" : "Login to your account"}
          </h1>
          <p className="mb-4 text-gray-600">Enter your details below</p>
          <InputField
            type="text"
            placeholder="UserName"
            name="username"
            value={userName}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {isLoading ? (
            <Button type="submit" disabled>
              Loading...
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}
          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link className="text-red-600" to="/signup">
              Signup
            </Link>
          </p>
          {role !== "admin" && (
            <p className="mt-4 text-gray-600">
              Want to login as admin?{" "}
              <Link className="text-red-600" to="/login-admin">
                Admin Login
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
