"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import logo from "@/assets/logo/logo.jpg";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button";
import logo from "@/assets/logo/logo.jpg";
// Menu items
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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    try {
      // Clear localStorage and cookies
      localStorage.removeItem("accessToken")
      Cookies.remove("token")
      localStorage.removeItem("persist:auth")
      // Optional: Clear sessionStorage if needed
      sessionStorage.clear()
      router.push("/") // Redirect to the home page
      window.location.reload() // Force reload for a clean session state
      // Optionally display a success toast notification
      toast.success("Logout successful")
    } catch (err) {
      console.error("Logout Error:", err)
      toast.error("There was an error logging out.")
    }
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
           <Link href="/">
            <Image
              src={logo}
              alt="Quick Online Deals"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const IconComponent = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <IconComponent className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}