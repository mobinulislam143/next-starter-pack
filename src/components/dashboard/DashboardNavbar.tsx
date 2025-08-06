
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import React from "react";

// Page title mapping
const pageTitles: Record<string, string> = {
  "/dashboard": "Welcome to Dashboard",
  "/dashboard/overview": "Overview",
  "/dashboard/users": "All Users",
  "/dashboard/providers": "Provider List",
  "/dashboard/qualitylist": "Quality List",
  "/dashboard/messages": "Messages",
  "/dashboard/settings": "Settings",
};

export default function DashboardNav() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl ml-4 md:ml-0">
            {pageTitle}
          </h1>
        </div>
      </div>
    </header>
  );
}
