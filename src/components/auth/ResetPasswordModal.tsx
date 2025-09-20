"use client";
import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordId = useId();
  const confirmPasswordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      console.log("Reset password data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Password reset successful!");
      onClose();
      reset();
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h1>
          <p className="text-gray-600 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Field */}
          <div>
            <div className="relative">
              <Input
                id={passwordId}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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
            {isLoading ? "Updating..." : "Log In"}
          </Button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center space-x-2 text-sm text-green-600 hover:text-green-700 font-medium w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}