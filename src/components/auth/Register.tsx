"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ✅ Schema without confirmPassword
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Select Role"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Infer the form values type
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const roles = ["Student", "Mentor", "Event Organiser"];
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // ✅ Handle role selection properly
    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        setValue("role", role);
    };

    // ✅ Submit handler
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
        <div className="bg-white rounded-[13px] overflow-hidden">
            <div className="flex gap-6 py-5">
                {roles.map((role) => (
                    <label key={role} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedRole === role}
                            onChange={() => handleRoleChange(role)}
                            className="w-5 h-5 accent-primary"
                        />
                        <span className="text-lg">{role}</span>
                    </label>
                ))}
            </div>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

            <div className="border shadow-sm overflow-hidden rounded-[13px]">
                <h2 className="text-2xl text-center text-white bg-primary py-[18px] font-medium text-[24px] mb-6">
                    Register
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    {/* ✅ Email Input */}
                    <div>
                        <Label htmlFor="email" className="text-lg">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="mt-2 h-12 px-2 text-lg text-[#a5a6a8]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* ✅ Password Input */}
                    <div className="relative">
                        <Label htmlFor="password" className="text-lg">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="mt-2 h-12 px-2 pr-10 text-lg text-[#a5a6a8] w-full"
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

                    {/* ✅ Confirm Password Input (Not in Schema) */}
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

                    {/* ✅ Submit Button */}
                    <Button type="submit" className="w-full bg-primary py-6">Register</Button>
                </form>

                {/* ✅ Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4 pb-4">
                    Have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
