"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimationWrapper from "../common/AnimationWrapper";
import mainLogo from "@/assets/logo/logo.jpg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { registerFormSchema } from "../form/formSchema";
import Image from "next/image";
import { registerFormSchema } from "@/lib/formSchema";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <AnimationWrapper animation="fade-right" delay={0.1} className="mx-auto w-full max-w-[650px]">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-gray-600">Let&apos;s create new account</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="group relative">
                  <label
                    htmlFor={nameId}
                    className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                  >
                    <span className="bg-background inline-flex px-2">Your Name</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id={nameId}
                            placeholder=""
                            className="w-full border-2 rounded-[32px] py-6 border-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="group relative">
                  <label
                    htmlFor={emailId}
                    className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                  >
                    <span className="bg-background inline-flex px-2">Email</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id={emailId}
                            type="email"
                            placeholder=""
                            className="w-full border-2 rounded-[32px] py-6 border-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <div className="group relative">
                  <label
                    htmlFor={phoneId}
                    className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                  >
                    <span className="bg-background inline-flex px-2">Phone</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id={phoneId}
                            type="tel"
                            placeholder=""
                            className="w-full border-2 rounded-[32px] py-6 border-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="group relative">
                  <label
                    htmlFor={passwordId}
                    className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                  >
                    <span className="bg-background inline-flex px-2">Password</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id={passwordId}
                              type={showPassword ? "text" : "password"}
                              placeholder=" "
                              className="w-full py-6 placeholder:text-gray-400 border-2 rounded-[32px] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold pr-10"
                              {...field}
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
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Repeat Password Field */}
              <div className="space-y-2">
                <div className="group relative">
                  <label
                    htmlFor={repeatPasswordId}
                    className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                  >
                    <span className="bg-background inline-flex px-2">Confirm Password</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id={repeatPasswordId}
                              type={showRepeatPassword ? "text" : "password"}
                              placeholder=" "
                              className="w-full py-6 placeholder:text-gray-400 border-2 rounded-[32px] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                            >
                              {showRepeatPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-bprimary hover:bg-bprimary/80 text-white font-medium rounded-[32px]"
            >
              Register
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <div className="text-center text-sm text-slate-600 w-full">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-bprimary hover:text-bprimary/80 hover:underline"
          >
            Login Here
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 w-full">
          © 2025 
          <Link
            href="/terms"
            className="text-bprimary hover:text-bprimary/80"
          >
            Term & Condition
          </Link>{" "}
          |{" "}
          <Link
            href="/privacy"
            className="text-bprimary hover:text-bprimary/80"
          >
            Privacy & Policy
          </Link>
        </div>
      </div>
    </AnimationWrapper>
  );
}