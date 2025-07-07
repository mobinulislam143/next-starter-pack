"use client";
// import SignupLottie from "@/components/lottie/SignupLottie";
import { Input } from "@/components/ui/input";
// import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import hoverStar from '@/assets/hoverStar.png'
const loginSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits") // Ensuring at least 6 characters
    .max(6, "OTP must be 6 digits") // Ensuring at most 6 characters
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensuring only digits
    // .transform((val) => Number(val)), // Makes `otp` a number
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Otp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
    router.push("/reset-password");
  };

  return (
    <div className=" bg-white shadow-md rounded-[13px] overflow-hidden">
      <h2 className="text-2xl text-center text-white bg-primary py-[18px] font-medium text-[24px]  mb-6">
        Enter your Otp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        <div>
          <Label htmlFor="otp" className="text-lg">
            OTP
          </Label>
          <Input
            className="mt-2 h-12 px-2 text-lg text-[#a5a6a8]"
            id="otp"
            type="number"
            placeholder="Enter your otp"
            {...register("otp")}
          />
          {errors.otp && (
            <p className="text-red-500 text-sm ">{errors.otp.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-primary py-6">
          Enter OTP
        </Button>
      </form>
    </div>
  );
}
