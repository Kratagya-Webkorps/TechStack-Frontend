import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import image01 from "../../../images/image01.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SUBMIT_FORM } from "../../../redux/interfaces/interfaces";
import InputField from "../../utils/InputField";
import Button from "../../utils/Button";
import usePost from "../../../hooks/usePost";

interface FormData {
  name: string;
  userName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { makeRequest, data,isLoading, error: requestError } = usePost(
    `${SERVER_PORT}/signup`
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }
    setError("");
    try {
      await makeRequest({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        username: formData.userName,
      });
      if(data)console.log({data});
      if (requestError) {
        setError(requestError);
        return;
      }
      dispatch({
        type: SUBMIT_FORM,
        payload: formData,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row h-min mt-52  xl:mt-0 ">
      <div className="sm:w-1/2 hidden md:block justify-center items-center">
        <img
          src={image01}
          alt="Shopping Cart and Smartphone"
          className="max-h-full max-w-full"
        />
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <form
          className="bg-white p-6 rounded-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>
          <p className="mb-4 text-gray-600">Enter your details below</p>
          <InputField
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            placeholder="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {(error || requestError) && (
            <p className="text-red-500 text-sm mb-4">
              {error || requestError}
            </p>
          )}
          <Button type="submit" >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link className="text-red-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
