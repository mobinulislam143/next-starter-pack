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
// import hoverStar from '@/assets/hoverStar.png'
const loginSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
});
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");


    const router = useRouter()

    const onSubmit = (data: LoginFormValues) => {
        if (data.password !== confirmPassword) {
            toast.error("Passwords must match!");
            return;
        }

        console.log("Login Data:", data);
        toast.success("Registration successful!");
        router.push("/");
    };
    return (
        <div className=" bg-white shadow-md rounded-[13px] overflow-hidden">
            <h2 className="text-2xl text-center text-white bg-primary py-[18px] font-medium text-[24px]  mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
             
                <div className="relative">
                    <Label htmlFor="password" className="text-lg">New Password</Label>
                    <div className="relative">
                        <Input
                            className="mt-2 h-12 px-2 pr-10 text-lg text-[#a5a6a8] w-full"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your New password"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="relative">
                    <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={confirmShowPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 h-12 px-2 pr-10 text-lg text-[#a5a6a8] w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                            {confirmShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </div> */}
                <Button type="submit" className="w-full bg-primary py-6">Reset</Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4 pb-4">
                Don’t have an account? <Link href="/register" className="text-primary hover:underline">Sign Up</Link>
            </p>
        </div>
    );
}