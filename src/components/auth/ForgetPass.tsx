/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import SignupLottie from "@/components/lottie/SignupLottie";
import { Input } from "@/components/ui/input";
// import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import AnimationWrapper from "../common/AnimationWrapper";
import Image from "next/image";
import mainLogo from "@/assets/logo/logo.jpg";
import { toast } from "sonner";
// import { FaArrowLeft } from "react-icons/fa";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

//   const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("Login Data:", data);
      console.log("data", data);


    } catch (error: any) {
     
      toast.error(error);
    }
  };

  return (
    <AnimationWrapper
      animation="fade-right"
      delay={0.1}
      className="overflow-hidden mx-auto w-full max-w-md"
    >
      {/* <Link href="/register" className="pb-4">
         Back

        </Link> */}
      <div className="space-y-2">
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
        <h1 className="text-3xl font-bold text-slate-900">Forget Password</h1>
        <p className="text-slate-600">
          Enter your email address to recover your password.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
        <div>
          <Label htmlFor="email" className="text-lg">
            Email
          </Label>
          <Input
            className="mt-2 h-12 px-2 text-lg text-primary font-semibold"
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm ">{errors.email.message}</p>
          )}
        </div>

        <Button
        //   disabled={isLoading}
          type="submit"
          className="w-full bg-primary py-6"
        >
          {/* {isLoading ? "Sending Otp..." : "Send Otp"} */}
          Send Otp
        </Button>
      </form>
    </AnimationWrapper>
  );
}
