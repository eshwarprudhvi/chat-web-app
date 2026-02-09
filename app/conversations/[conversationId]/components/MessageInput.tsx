"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  id: string;
  errors: FieldErrors;
  required?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  register,
  type,
  required,
  errors,
  id,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        // autoComplete={id}
        {...register(id, { required })}
        required={required}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
