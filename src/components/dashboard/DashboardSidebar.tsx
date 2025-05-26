"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo/mainLogo.png";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { MdOutlineCategory } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { ImBlogger } from "react-icons/im";
import { CgProductHunt } from "react-icons/cg";

import { LogOut} from "lucide-react";
import { cn } from "@/lib/utils";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserTag } from "react-icons/fa";
import { TbUserSquare } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const menuItems = [
  { title: "Dashboard", icon: LuLayoutDashboard, href: "/dashboard/overview" },
  { title: "Broker List", icon: FaUserTag, href: "/dashboard/payment" },
  { title: "Property List", icon: TbUserSquare, href: "/dashboard/orders" },
  { title: "User List", icon: FaUsers, href: "/dashboard/users" },
  {
    title: "Settings",
    icon: IoSettingsSharp,
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
    <div className="flex h-screen w-64 flex-col bg-primary text-white py-[40px] overflow-y-auto">
      <div className="p-4">
        <Link href={"/dashboard/overview"}>
          <Image
            src={logo}
            alt="Quick Online Deals"
            width={110}
            height={20}
            className="w-full my-4"
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
