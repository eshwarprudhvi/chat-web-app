"use client";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";

import MessageInput from "./MessageInput";
import { useState } from "react";
export default function Form() {
  const [loading, setLoading] = useState(false);
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    try {
      setLoading(true);
      setValue("message", "", { shouldValidate: true });
      axios.post("/api/messages", {
        ...data,
        conversationId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 gap-2 bg-white border-t flex items-center lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(result) => handleUpload(result)}
        uploadPreset="qxsqlkbu"
      >
        <HiPhoto
          size={30}
          className="text-gray-300 cursor-pointer hover:text-gray-500"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="type a message..."
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full p-2 bg-gray-400 cursor-pointer hover:bg-gray-600 transition disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <IoSend size={18} className="text-white" />
          )}
        </button>
      </form>
    </div>
  );
}
