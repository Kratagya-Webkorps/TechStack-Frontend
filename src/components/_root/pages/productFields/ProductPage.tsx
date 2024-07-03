import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddToCart from "../../../utils/AddToCart";
import { ProductDetails } from "../../../../redux/interfaces/interfaces";

const ProductPage: React.FC<ProductDetails> = ({
  category,
  description,
  name,
  price,
  productImage,
  rating,
  stock,
}) => {

  const { productId } = useParams();


  return (
    <div className=" mx-auto bg-white shadow-md p-4">
      <div className="flex flex-col md:flex-row items-center ">
        <img
          src={productImage}
          alt={name}
          className="object-contain max-h-96 "
        />

        <div className="md:w-1/2 md:pl-10 mt-4 md:mt-0 p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-2">{category}</p>
          <p className="text-gray-800 mb-4">{description}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500 mr-2">
              {Array.from({ length: 5 }, (_, index) =>
                index < rating ? (
                  <FaStar key={index} />
                ) : (
                  <FaRegStar key={index} />
                )
              )}
            </div>
            <span className="text-gray-600">({rating} ratings)</span>
          </div>
          <div className="text-xl md:text-2xl font-bold mb-4">₹{price}</div>
          <div className="mb-4">
            {stock > 0 ? (
              <span className="text-green-500">In Stock "{stock}"</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <AddToCart
              productId={productId as string}
              stock={stock}
              price={price}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
