"use client";
import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import AnimationWrapper from "../common/AnimationWrapper";
// import ForgotPasswordModal from "./ForgotPasswordModal";
// import ResetPasswordModal from "./ResetPasswordModal";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Your existing login logic here
      console.log("Login data:", data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-up"
      delay={0.1}
      className="bg-white rounded-2xl shadow-xl lg:px-8 lg:py-8 py-8 px-4 w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm">Login into your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <div className="relative">
            <Input
              id={emailId}
              type="email"
              placeholder="Enter Email"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="relative">
            <Input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 hover:text-green-700 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
      <ResetPasswordModal
        isOpen={showResetPassword}
        onClose={() => setShowResetPassword(false)}
      />
    </AnimationWrapper>
  );
}