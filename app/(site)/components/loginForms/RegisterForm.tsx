"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import SocialButton from "../auth/SocialButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await axios.post("/api/register", data).then(async () => {
        await signIn("credentials", {
          ...data,
          redirect: false,
        }).then((res) => {
          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("register successful");
            router.refresh();
            router.push("/users");
          }
        });
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username */}
      <Input
        id="name"
        isRequired={true}
        label="name"
        type="text"
        placeholder="Choose a username"
        register={register}
        disabled={isSubmitting}
      />

      {/* Email */}
      <Input
        id="email"
        isRequired={true}
        type="email"
        label="Email"
        placeholder="demo@example.com"
        register={register}
        disabled={isSubmitting}
      />

      {/* Password */}
      <Input
        id="password"
        isRequired={true}
        type="password"
        label="Password"
        placeholder="Create a password"
        register={register}
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 hover:cursor-pointer"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>
      <div>
        <p className="text-gray-400 text-center pb-2">or register with</p>
        <SocialButton provider="google" />
      </div>
    </form>
  );
};

export default RegisterForm;
