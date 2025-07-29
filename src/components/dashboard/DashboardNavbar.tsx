import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react";


// Page title mapping
const pageTitles: Record<string, string> = {
  "/dashboard": "Welcome to Dashboard",
  "/dashboard/overview": "Overview",
  "/dashboard/payment": "Payments",
  "/dashboard/orders": "Order List",
  "/dashboard/users": "All Users",
  "/dashboard/podcastEvent": "Podcast and Event",
  "/dashboard/blogCategory": "Blog Category",
  "/dashboard/productCategory": "Product Category",
  "/dashboard/product": "Product",
  "/dashboard/blog": "Blog",
  "/dashboard/profile": "Admin Profile",
}

// Breadcrumb mapping
const breadcrumbMapping: Record<string, { label: string; href?: string }[]> = {
  "/dashboard": [{ label: "Dashboard" }],
  "/dashboard/overview": [{ label: "Dashboard", href: "/dashboard" }, { label: "Overview" }],
  "/dashboard/payment": [{ label: "Dashboard", href: "/dashboard" }, { label: "Payment" }],
  "/dashboard/orders": [{ label: "Dashboard", href: "/dashboard" }, { label: "Orders" }],
  "/dashboard/users": [{ label: "Dashboard", href: "/dashboard" }, { label: "Users" }],
  "/dashboard/podcastEvent": [{ label: "Dashboard", href: "/dashboard" }, { label: "Podcast & Event" }],
  "/dashboard/blogCategory": [{ label: "Dashboard", href: "/dashboard" }, { label: "Blog Category" }],
  "/dashboard/productCategory": [{ label: "Dashboard", href: "/dashboard" }, { label: "Product Category" }],
  "/dashboard/product": [{ label: "Dashboard", href: "/dashboard" }, { label: "Product" }],
  "/dashboard/blog": [{ label: "Dashboard", href: "/dashboard" }, { label: "Blog" }],
  "/dashboard/profile": [{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }],
}

export default function DashboardNav() {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || "Dashboard"
  const breadcrumbs = breadcrumbMapping[pathname] || [{ label: "Dashboard" }]

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl ml-4 md:ml-0">{pageTitle}</h1>
        </div>

        {/* User Profile Link */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline-block">Johan</span>
        </Link>
      </div>
    </header>
  )
}
