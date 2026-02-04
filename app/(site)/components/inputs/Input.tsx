import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

type InputType = "text" | "email" | "password";
type InputProps = {
  id: string;
  label: string;
  isRequired?: boolean;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
};

const Input = ({
  type,
  isRequired,
  label,
  id,
  placeholder,
  disabled,
  register,
  error,
  className = "",
}: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type ? type : "text"}
        required={isRequired}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id)}
        className={`
          w-full px-4 py-3 
          border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          placeholder-gray-400
          ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-500"
              : "bg-white text-gray-800"
          }
        `}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Input;
