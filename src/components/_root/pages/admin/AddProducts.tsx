import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import InputField from "../../../utils/InputField";
import { ProductFormData } from "../../../../redux/interfaces/interfaces";

const ADMIN_PORT = process.env.REACT_APP_ADMIN_PORT;

const AddProducts: React.FC = () => {
  const initialFormData: ProductFormData = {
    name: "",
    description: "",
    productImage: null,
    price: "",
    stock: "",
    category: "",
    owner: "",
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [imageError, setImageError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setImageError("Please upload a valid image file (JPEG, PNG, GIF)");
        setFormData((prevData) => ({ ...prevData, productImage: null }));
      } else {
        setImageError("");
        setFormData((prevData) => ({ ...prevData, productImage: file }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.owner) newErrors.owner = "Owner is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value as Blob | string);
      }
    });
    try {
      const token = Cookies.get("token");
      console.log({formDataToSend});

      const response = await axios.post(`${ADMIN_PORT}/create`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center h-min md:mt-24 bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={handleFileChange}
              accept="image/*"
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
          </div>

          <InputField
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          <InputField
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="tv">TV</option>
              <option value="accessories">Accessories</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <InputField
            type="text"
            name="owner"
            placeholder="Owner"
            value={formData.owner}
            onChange={handleChange}
            required
          />
          {errors.owner && (
            <p className="text-red-500 text-sm">{errors.owner}</p>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
