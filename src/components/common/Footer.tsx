"use client";

import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import mainLogo from "@/assets/logo/logo.jpg";
import Image from "next/image";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { footerData } from "@/types/fakeData";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

// Footer data organized as JSON objects

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
  });
  const role = useSelector((state: RootState) => state.auth.user?.role);
  console.log("my role", role);
  const onSubmit = async (data: SubscribeFormValues) => {
    try {
      console.log("Subscription email:", data.email);
      // Here you would typically send this to your API
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify(data) })
      reset();
      toast.success("Thank you for subscribing!");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  return (
    <footer className="bg-[#f5f5f5] pt-12 ">
      <div className="container mx-auto pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
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
            <p className="text-sm text-gray-600 mb-6">
              {footerData.companyInfo.description}
            </p>
            <div className="space-y-2">
              {footerData.companyInfo.socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <div key={index} className="flex items-center">
                    <Icon className="h-5 w-5 mr-2" />
                    <span className="text-sm text-gray-600">{link.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {/* <footer className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
          {/* Quick Menu Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Quick Menu
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore-stays"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Explore Stays
                </Link>
              </li>
              <li>
                <Link
                  href="/property-list"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  List Your Property
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Help and Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`${
                    role === "HOST"
                      ? "/host-profile"
                      : role === "GUEST"
                      ? "/user-profile"
                      : role === "SUPER_ADMIN"
                      ? "/admin/overview"
                      : "/login"
                  }`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
              </li>
              {/* {role} */}
              <li>
                <Link
                  href={`${
                    role === "HOST"
                      ? "/hostdashboard/allProperties"
                      : role === "GUEST"
                      ? "/user-profile/currentBooking"
                      : role === "SUPER_ADMIN"
                      ? "/admin/properties"
                      : "/login"
                  }`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  My Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Saved
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Service
            </h3>
            <ul className="space-y-3">
              {role === "HOST" && (
                <>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Basic Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Standard Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Premium Plan
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/termsAndCondition"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          {/* </footer> */}

          {/* Subscribe */}
          <div className="col-span-1 ">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {footerData.subscribe.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {footerData.subscribe.description}
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex">
                <div className="*:not-first:mt-2">
                  <div className="relative">
                    <Input
                      className="peer ps-9 pe-9"
                      placeholder="Search..."
                      {...register("email")}
                      type="search"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <SearchIcon size={16} />
                    </div>
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Submit search"
                      type="submit"
                    >
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {/* <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">©2023 All Rights are reserved</p>
        </div> */}
      </div>
      <div className="w-full bg-black text-white">
        <p className="text-center py-2">©2025 All Rights are reserved️ </p>
      </div>
    </footer>
  );
}
