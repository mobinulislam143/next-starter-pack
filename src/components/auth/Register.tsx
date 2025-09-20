"use client";
import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimationWrapper from "../common/AnimationWrapper";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      console.log("Register data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-up"
      delay={0.1} className="bg-white rounded-2xl shadow-xl lg:px-8 lg:py-8 py-8 px-4 w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm">Getting started is easy</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <Input
            id={fullNameId}
            type="text"
            placeholder="Full Name"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Input
            id={emailId}
            type="email"
            placeholder="Email Address"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            {...register("email")}
          />
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

        {/* Confirm Password Field */}
        <div>
          <div className="relative">
            <Input
              id={confirmPasswordId}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Login Now
          </Link>
        </p>
      </form>
    </AnimationWrapper>
  );
}