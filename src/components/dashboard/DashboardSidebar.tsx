"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.jpg";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { MdOutlineCategory } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import { ImBlogger } from "react-icons/im";
import { CgProductHunt } from "react-icons/cg";

import {
  LayoutDashboard,
  CreditCard,
  ListOrdered,
  Package,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, href: "/dashboard/overview" },
  { title: "Payment", icon: CreditCard, href: "/dashboard/payment" },
  { title: "Order list", icon: ListOrdered, href: "/dashboard/orders" },
  { title: "All User", icon: Package, href: "/dashboard/users" },
  {
    title: "Podcast and event",
    icon: MdOutlineEvent,
    href: "/dashboard/podcastEvent",
  },
  {
    title: "Blog Category",
    icon: MdProductionQuantityLimits,
    href: "/dashboard/blogCategory",
  },
  {
    title: "Product Category",
    icon: MdOutlineCategory,
    href: "/dashboard/productCategory",
  },
  {
    title: "Product",
    icon: CgProductHunt,
    href: "/dashboard/product",
  },
  {
    title: "Blog",
    icon: ImBlogger,
    href: "/dashboard/blog",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname().split("/dashboard/")[1];

  console.log("My path is ", pathname);

  const router = useRouter();

  const handleLogout = () => {
    try {
      // Clear localStorage and cookies
      localStorage.removeItem("accessToken");
      Cookies.remove("token");
      localStorage.removeItem("persist:auth");

      // Optional: Clear sessionStorage if needed (if you're using it for session management)
      sessionStorage.clear();

      router.push("/"); // Redirect to the home page
      window.location.reload(); // Force reload for a clean session state

      // Optionally display a success toast notification
      toast.success("Logout successful");
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("There was an error logging out.");
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-primary text-white">
      <div className="p-4">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="Quick Online Deals"
            width={80}
            height={40}
            className="mb-6 lg:ml-0 ml-12"
          />
        </Link>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const itemPath = item.href.split("/dashboard/")[1] || "";
            const isActive = pathname.toLowerCase() === itemPath.toLowerCase();

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[8px] px-3 py-2 text-sm transition-colors hover:bg-white hover:text-primary",
                  isActive && "bg-white text-black"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[8px] bg-primary px-3 py-2 text-sm  hover:bg-white hover:text-black text-white transition-colors "
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
