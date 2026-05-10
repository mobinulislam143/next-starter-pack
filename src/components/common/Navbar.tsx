"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import { Heart, Bell, User } from "lucide-react";
import { IoMenu } from "react-icons/io5";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";

import mainLogo from "@/assets/logo/logo.jpg";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { notificationData } from "@/types/fakeData";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/property-list", label: "List Your Property" },
  { href: "/support", label: "Help and Support" },
  { href: "/explore-stays", label: "Explore Stays" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false); // mobile menu
  const [notifOpen, setNotifOpen] = useState(false);

  const userRole = useSelector(
    (state: RootState) => state?.auth?.user?.role
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // close notification on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-100 py-4">
      <div className="container">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-[100px] h-[100px] relative">
              <Image
                src={mainLogo}
                alt="logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium border-b-2 pb-1",
                    isActive
                      ? "text-gray-900 border-gray-900 font-bold"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-3 lg:space-x-6">

            {/* SAVED */}
            <Link
              href="/saved"
              className="text-gray-500 hover:text-gray-900"
            >
              <Heart className="h-6 w-6" />
            </Link>

            {/* NOTIFICATIONS */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setNotifOpen((prev) => !prev)}
                className="text-gray-500 hover:text-gray-900"
              >
                <Bell className="h-6 w-6" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-md z-50">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">Notifications</h2>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto">
                    {notificationData.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "p-4 border-b hover:bg-gray-50",
                          !n.read && "bg-gray-50"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className="w-[40px] h-[40px] relative">
                            <Image
                              src={mainLogo}
                              alt="logo"
                              fill
                              className="object-contain"
                            />
                          </div>

                          <div>
                            <p className="text-sm text-gray-700">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {notificationData.length === 0 && (
                      <p className="p-4 text-center text-gray-500">
                        No notifications
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <Link
              href={
                userRole === "HOST"
                  ? "/host-profile"
                  : userRole === "GUEST"
                  ? "/user-profile"
                  : userRole === "SUPER_ADMIN"
                  ? "/admin/overview"
                  : "/login"
              }
              className="text-gray-500 hover:text-gray-900"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <IoMenu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE SHEET */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-6 w-[300px]">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-medium",
                    isActive
                      ? "text-gray-900 font-bold"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}