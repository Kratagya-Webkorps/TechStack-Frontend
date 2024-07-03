import React, { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required={required}
        disabled={disabled}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-2"
        >
          {showPassword ? <FaEye /> :<FaRegEyeSlash /> }
        </button>
      )}
    </div>
  );
};

export default InputField;
