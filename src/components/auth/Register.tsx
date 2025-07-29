"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
// import FileUploadForm from "./FileUploadForm";
import Image from "next/image";
import mainLogo from "@/assets/logo/logo.jpg";
import { toast } from "sonner";
// import submitDoc from '@/assets/image/submitDoc.png'

import { useRouter } from "next/navigation";
import AnimationWrapper from "../common/AnimationWrapper";
import { useRegisterMutation } from "@/redux/features/authSlice/authApi";

const signUpSchema = z.object({
  role: z.string().min(1, { message: "Please select a role" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    // getValues,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "HOST",
      name: "",
      email: "",
      phone: "",
      password: "",
      // termsAccepted: false,
    },
  });
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log("response ", response);
      if (response?.success) {
        const { role, name, email, phone, password } = data;

        if (role === "HOST") {
          console.log("HOST registration data:", data);
          toast.success("HOST Registered Successfully");
          router.push("/login");
        } else {
          const guestData = { role, name, email, phone, password };
          console.log("GUEST registration data:", guestData);
          toast.success("GUEST Registered Successfully");
          router.push("/login");

          // Optional: redirect guest or trigger next step
        }
      } else {
        toast.error(
          response?.message || "Registration failed. Please try again."
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);

      // Show backend error message if available
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An unexpected error occurred during registration.";

      toast.error(errorMessage);
    }
  };

  const roleOptions = ["HOST", "GUEST"];
  const selectedRole = watch("role");

  return (
    <AnimationWrapper
      animation="fade-right"
      delay={0.1}
      className="mx-auto w-full max-w-md"
    >
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
        <h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
        <p className="text-slate-600">
          Please enter the information to create an account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Role Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-slate-700">
            Your role
          </Label>
          <div className="relative">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-left",
                errors.role && "border-red-500"
              )}
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            >
              <span>{selectedRole || "Select a role"}</span>
              <ChevronDownIcon className="h-4 w-4 text-slate-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
                <ul className="py-1">
                  {roleOptions.map((role) => (
                    <li key={role}>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-slate-100"
                        onClick={() => {
                          setValue("role", role);
                          setIsRoleDropdownOpen(false);
                        }}
                      >
                        {role}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <input type="hidden" {...register("role")} />
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            Name
          </Label>
          <Input
            id="name"
            placeholder="John Watson"
            className={cn(
              "rounded-md border border-slate-200 px-4 py-3",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.watson@example.com"
            className={cn(
              "rounded-md border border-slate-200 px-4 py-3",
              errors.email && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-700">
            Mobile Number
          </Label>
          <Input
            id="mobileNumber"
            placeholder="(205) 555-0100"
            className={cn(
              "rounded-md border border-slate-200 px-4 py-3",
              errors.phone && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Field */}
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
                "rounded-md border border-slate-200 px-4 py-3 pr-10",
                errors.password && "border-red-500 focus-visible:ring-red-500"
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
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox
            required
            id="termsAccepted"
            className="h-4 w-4 mt-1 rounded border-slate-300 text-slate-600"
            // {...register("termsAccepted")}
          />
          <Label htmlFor="termsAccepted" className="text-sm text-slate-600">
            I Agree the{" "}
            <Link href="/terms" className="text-slate-800 font-medium">
              Terms & Conditions
            </Link>
          </Label>
        </div>
        {/* {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>} */}

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-md"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>

        {/* Sign In Link */}
        <div className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-800 font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </AnimationWrapper>
  );
}
