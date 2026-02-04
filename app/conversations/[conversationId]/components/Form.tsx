"use client";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";

import MessageInput from "./MessageInput";
export default function Form() {
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
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
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
        onUploadAdded={handleUpload}
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
          className="rounded-full p-2 bg-gray-400 cursor-pointer hover:bg-gray-600 transition"
        >
          <IoSend size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
