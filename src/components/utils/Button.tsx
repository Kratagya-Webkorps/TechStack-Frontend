import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className = "",
  onClick,
  disabled = false,
  loading = false,
  children,
}) => (
  <button
    type={type}
    className={`w-full bg-red-600 text-white p-2 rounded mb-4 ${className}`}
    onClick={onClick}
    disabled={disabled || loading} // Disable button if disabled prop is true or if loading is true
  >
    {loading ? (
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 0112 4.536v3.232a4.002 4.002 0 00-4 4.001H6zm10-5.291A8.004 8.004 0 0112 19.464v-3.232a4.002 4.002 0 004-4.001h2z"
          ></path>
        </svg>
        Loading...
      </span>
    ) : (
      children
    )}
  </button>
);

export default Button;
