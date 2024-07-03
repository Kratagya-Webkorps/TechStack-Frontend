import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-gray-600 mb-8">
          Your visited page not found. You may go home page.
        </p>
        <button
          onClick={goToHomePage}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Back to home page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
