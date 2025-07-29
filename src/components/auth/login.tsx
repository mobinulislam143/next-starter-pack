/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import mainLogo from "@/assets/logo/logo.jpg";
import AnimationWrapper from "../common/AnimationWrapper";
import { useLoginMutation } from "@/redux/features/authSlice/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

interface DecodedToken {
  email: string;
  role: string;
  id: string;
}

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // isHost: false,
    },
  });

  const [loginUser, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginUser(data).unwrap();

      // Assuming response contains a token or user data
      if (response?.success) {
        const accessToken = response?.data?.token;
        if (accessToken) {
          const decodeToken = jwtDecode<DecodedToken>(accessToken);

          console.log("Login successful:", response);

          dispatch(
            setUser({
              accessToken,
              user: {
                email: decodeToken.email,
                role: decodeToken.role,
                id: decodeToken.id.toString(),
                // name: "",
                // phone: "",

              },
            })
          );
        }
        Cookies.set("token", accessToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });
        localStorage.setItem("accessToken", accessToken);
        toast.success("Login successful!"); 
        router.push('/')
      }
    } catch (error: any) {
      console.error("Login failed:", error);

      // Show user-friendly error message
      const message =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-right"
      delay={0.1}
      className="mx-auto w-full max-w-md"
    >
      <div className="flex flex-col items-start space-y-8">
        {/* Logo */}
        <Link href={"/"}>
            <div className="w-[100px] h-[100px]">
            <Image
              src={mainLogo}
              width={100}
              height={100}
              className="w-full h-full"
              alt="mainlog"
            />
          </div>
        </Link>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back <span className="inline-block">👋</span>
          </h1>
          <p className="text-slate-600">
            Please enter the sign in information.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.watson@example.com"
                className={cn(
                  "h-12 px-4 rounded-md border border-slate-200",
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className={cn(
                    "h-12 px-4 rounded-md border border-slate-200 pr-10",
                    errors.password &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                className="h-4 w-4 rounded border-slate-300 text-slate-600"
                // {...register("rememberMe")}
              />
              <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                Remember Me
              </Label>
            </div> */}
            <Link
              href="/forgot-password"
              className="text-sm text-slate-600  hover:text-primary hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Sign in button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-slate-600 hover:bg-slate-700 text-white rounded-md"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Host toggle */}
          {/* <div className="flex items-center justify-between pt-2">
            <Label htmlFor="isHost" className="text-sm text-slate-600">
              Are you a host?
            </Label>
            <Switch
              id="isHost"
              className="data-[state=checked]:bg-slate-600"
              checked={!!watch("isHost")}
              onCheckedChange={(checked) => setValue("isHost", checked)}
            />
          </div> */}

          {/* Or sign in with */}
          {/* <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-500">
                Or sign in with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 rounded-md"
          >
            <FcGoogle />
            Google
          </Button> */}

          <div className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-slate-900 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  );
}
