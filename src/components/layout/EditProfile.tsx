import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../utils/InputField";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const token = Cookies.get("token");
  const userData = useSelector((state: any) => state.loginForm);
  const { username, role, email } = userData;
  const navigate = useNavigate();
  const [validate, setValidate] = useState({
    message: "",
    success: false,
  });
  const [fieldErrors, setFieldErrors] = useState({
    Username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    Username: username,
    role: role,
    email: email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [doubleAuthCheck, setDoubleAuthCheck] = useState(false);
  const baseURL =
    formData.role === "admin"
      ? process.env.REACT_APP_ADMIN_PORT
      : process.env.REACT_APP_USER_PORT;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidate({ message: "", success: false });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const errors: any = {};
    if (!formData.Username) errors.Username = "Username cannot be empty";
    if (!formData.email) errors.email = "Email cannot be empty";
    if (!formData.currentPassword)
      errors.currentPassword = "Current Password cannot be empty";
    if (!formData.newPassword)
      errors.newPassword = "New Password cannot be empty";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password cannot be empty";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (formData.newPassword === formData.currentPassword) {
      setValidate({
        message: "New password cannot be the same as the current password.",
        success: false,
      });
      return;
    }
    if (!(formData.newPassword === formData.confirmPassword)) {
      setValidate({
        message: "New password and confirm password should be same.",
        success: false,
      });
      setDoubleAuthCheck(true);
      return;
    }

    const userData = {
      username: formData.Username,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      email: formData.email,
    };

    try {
      const response = await axios.post(`${baseURL}/updatePassword`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { message, success } = response.data;
      setValidate({
        message: message,
        success: success,
      });
      if (success) {
        navigate(`/${username}`);
      }
    } catch (error: any) {
      const { message, success } = error.response.data;
      setValidate({
        message: message,
        success: success,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-red-500 text-xl font-semibold mb-4">My Account</h2>
      <form onSubmit={submit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <InputField
            type="text"
            placeholder="Username"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
          />
          {fieldErrors.Username && (
            <p className="text-red-500 text-sm">{fieldErrors.Username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <InputField
            type="text"
            placeholder=""
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <InputField
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {fieldErrors.currentPassword && (
            <p className="text-red-500 text-sm">
              {fieldErrors.currentPassword}
            </p>
          )}
        </div>

        {validate.message && !doubleAuthCheck && (
          <p className="text-red-500 text-sm">{validate.message}</p>
        )}

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {fieldErrors.newPassword && (
            <p className="text-red-500 text-sm">{fieldErrors.newPassword}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {fieldErrors.confirmPassword}
            </p>
          )}
          {validate.message && doubleAuthCheck && (
            <p className="text-red-500 text-sm">{validate.message}</p>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Link to={`/${username}`}>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
