/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimationWrapper from "../common/AnimationWrapper";
import { useLoginMutation } from "@/redux/features/authSlice/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import mainLogo from "@/assets/logo/logo.jpg";
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }), // Changed from 4 to 8 to match error message
});

interface DecodedToken {
  email: string;
  role: string;
  id: string;
}

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
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
    },
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId(); // Separate ID for password field

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response?.success) {
        const accessToken = response?.data?.token;
        if (accessToken) {
          const decodeToken = jwtDecode<DecodedToken>(accessToken);
          dispatch(
            setUser({
              accessToken,
              user: {
                email: decodeToken.email,
                role: decodeToken.role,
                id: decodeToken.id.toString(),
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
        router.push("/dashboard/login");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const message =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-right"
      delay={0.1}
      className="mx-auto w-full max-w-[650px]"
    >
      <div className="flex flex-col items-start space-y-8">
        {/* Logo */}
        <Link href={"/"} className="mb-14">
          <div className="">
            <Image
              src={mainLogo}
              width={70}
              height={70}
              className="w-full h-full object-cover"
              alt="mainlog"
            />
          </div>
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600">
            Let&apos;s login into your account first
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <div className="group relative">
                <label
                  htmlFor={emailId}
                  className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                >
                  <span className="bg-background inline-flex px-2">Email</span>
                </label>
                <Input
                  id={emailId}
                  type="email"
                  placeholder=""
                  className="w-full border-2 rounded-[32px] py-6 border-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="group relative">
                <label
                  htmlFor={passwordId}
                  className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                >
                  <span className="bg-background inline-flex px-2">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Input
                    id={passwordId}
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className="w-full py-6 placeholder:text-gray-400 border-2 rounded-[32px] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold pr-10"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-bsecondary hover:text-bsecondary/80 font-semibold hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Sign in button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-bprimary hover:bg-bprimary/80 text-white font-medium rounded-[32px]"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

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
