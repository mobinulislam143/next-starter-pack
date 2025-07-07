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
import { useRouter } from "next/navigation";
// import hoverStar from '@/assets/hoverStar.png'
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


    const router = useRouter()

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login Data:", data);
        router.push("/forgot-password/otp")
    };

    return (
        <div className=" bg-white shadow-md rounded-[13px] overflow-hidden">
            <h2 className="text-2xl text-center text-white bg-primary py-[18px] font-medium text-[24px]  mb-6">Forget Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                <div>
                    <Label htmlFor="email" className="text-lg">Email</Label>
                    <Input className="mt-2 h-12 px-2 text-lg text-[#a5a6a8]" id="email" type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
                </div>


                <Button type="submit" className="w-full bg-primary py-6">Send Notification</Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4 pb-4">
                Don’t have an account? <Link href="/register" className="text-primary hover:underline">Sign Up</Link>
            </p>
        </div>
    );
}