"use client";

import {  useRef, useState } from "react";
import Link from "next/link";
import { Heart, Bell, User } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import mainLogo from "@/assets/logo/logo.jpg";

import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { notificationData } from "@/types/fakeData";


const navItems = [
  { href: "/", label: "Home", active: true },
  { href: "/property-list", label: "List Your Property" },
  { href: "/support", label: "Help and Support" },
  { href: "/explore-stays", label: "Explore Stays" },
  
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);



  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const userRole = useSelector((state: RootState) => state?.auth?.user?.role)


  return (
    <header className="border-b border-gray-100 py-4">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="w-[87px] h-[70px] mb-3">
                <Image
                  src={mainLogo}
                  width={87}
                  height={70}
                  className="w-full h-full"
                  alt="mainlog"
                />
              </div>
            </Link>
          </div>
          {/* Logo */}

          {/* Desktop Navigation - Show on md screens and up */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive
                      ? "text-gray-900 font-bold border-b-2 border-gray-900"
                      : "text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side icons - Show on md screens and up */}

          <div className="flex  items-center lg:space-x-6 md:space-x-6 space-x-3">
            <Link
              href={"/saved"}
              // type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <button
              ref={buttonRef}
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label="Notifications"
              onClick={toggleDropdown}
            >
              <Bell className="h-6 w-6" />
            </button>

            {isOpen && (
              <>
                {/* Overlay for mobile - helps with click outside detection */}
                <div className="fixed inset-0 bg-black/5 z-40 md:hidden" />

                {/* Notification dropdown */}
                <div
                  ref={dropdownRef}
                  className="absolute top-[80px] right-[10px] w-72 sm:w-80 sm:right-[20px] md:top-[80px] md:right-[220px] lg:top-[60px] lg:right-[290px] mt-2 bg-white shadow-lg rounded-md z-50"
                >
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                  </div>
                  <div className="max-h-[70vh] overflow-y-auto">
                    {notificationData.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 border-b border-gray-100 hover:bg-gray-50",
                          !notification.read && "bg-gray-50"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className="w-[50px] h-[40px] mt-1">
                            <Image
                              src={mainLogo}
                              width={50}
                              height={40}
                              className="w-full h-full"
                              alt="mainlog"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {notificationData.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </>
            )}
            <Link  href={`${userRole === "HOST" ? "/host-profile" : userRole === "GUEST"? "/user-profile": userRole === 'SUPER_ADMIN'? '/admin/overview':  "/login"}`}
              // href={"/"}
              className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label="Account"
            >
              {" "}
              <User className="h-6 w-6" />{" "}
            </Link>
          </div>

          {/* Mobile menu button - Show on sm screens and down */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              className="text-gray-500 hover:text-gray-900"
            >
              <IoMenu className="w-10" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Show on sm screens and down */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-6 w-[300px]">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2 px-1 text-sm font-medium ${
                  item.active
                    ? "text-gray-900 border-l-2 border-gray-900 pl-3"
                    : "text-gray-500 hover:text-gray-700 pl-4"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
