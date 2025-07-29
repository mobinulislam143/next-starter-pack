"use client";

import { type ReactNode } from "react";
// import { DashboardSidebar } from "../DashboardSidebar";
import DashboardNav from "../DashboardNavbar";
// import { IoMenu } from "react-icons/io5";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar";
// import { AppSidebar } from "@/components/app-sidebar";

const Wrapper = ({ children }: { children: ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev);
//   };

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardNav />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Wrapper;
