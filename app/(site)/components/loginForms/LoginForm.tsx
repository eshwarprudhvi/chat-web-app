"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import SocialButton from "../auth/SocialButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginInput {
  email: string;
  password: string;
  type: String;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const session = useSession();
  const router = useRouter();

  const onSubmit = (data: LoginInput) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        toast.error("Invalid Credentials");
      }
      if (result?.ok && !result?.error) {
        toast.success("Logged in successfully");

        router.push("/users");
      }
    });
  };

  const socialAction = (provider: String) => {
    //rest
    signIn(provider as string, {
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        toast.error("Invalid Credentials");
      }
      if (result?.ok && !result?.error) {
        toast.success("Logged in successfully");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        id="email"
        isRequired={true}
        type="email"
        label="email"
        placeholder="enter email"
        register={register}
        disabled={isSubmitting}
      ></Input>
      <Input
        id="password"
        isRequired={true}
        type="password"
        label="password"
        placeholder="enter password"
        register={register}
        disabled={isSubmitting}
      ></Input>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg  hover:cursor-pointer font-medium text-white transition-colors ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </div>
      <div>
        <p className="text-gray-400 text-center pb-2">or continue with</p>
        <SocialButton provider="google" />
      </div>
    </form>
  );
};

export default LoginForm;
