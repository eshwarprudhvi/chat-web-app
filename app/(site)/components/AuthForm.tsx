"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "./loginForms/LoginForm";
import RegisterForm from "./loginForms/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm: React.FC = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      // console.log("Authenticated");
    }
  }, [session?.status, router]);
  return (
    <div className="space-y-6">
      {/* Toggle Buttons */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
        <button
          onClick={() => setVariant("LOGIN")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            variant === "LOGIN"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setVariant("REGISTER")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            variant === "REGISTER"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Register
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        {variant === "LOGIN" ? "Welcome Back" : "Create Account"}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {variant === "LOGIN"
          ? "Sign in to continue to your account"
          : "Join us today"}
      </p>

      {variant === "LOGIN" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthForm;
