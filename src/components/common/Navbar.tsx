"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import logo from "@/assets/logo/logo.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";

import { usePathname } from "next/navigation";
import { LuUserRound } from "react-icons/lu";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../ui/button";
type NavItem = {
  label: string;
  href: string;
};
const searchCarSchema = z.object({
  cars: z.string({ message: "Please enter a valid email address" }),
});

type searchFormValues = z.infer<typeof searchCarSchema>;

const navItems: NavItem[] = [
  { label: "Auctions", href: "/" },
  { label: "Sell a Car", href: "/sell-a-car" },
  { label: "Community", href: "/community" },
  { label: "What's Cars & Bids?", href: "/about" },
  { label: "Daily Email", href: "/daily-email" },
];

export default function Navbar() {
  const { register, handleSubmit } = useForm<searchFormValues>({
    resolver: zodResolver(searchCarSchema),
  });
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (data: searchFormValues) => {
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="w-full border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="lg:flex hidden">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                      isActive
                        ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Search and Sign In */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  className="peer ps-9 pe-9"
                  placeholder="Search..."
                  {...register("cars")}
                  required
                  type="search"
                />

                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <SearchIcon size={16} className="text-primary" />
                </div>
                <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                >
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="text-primary"
                  />
                </button>
              </div>
            </div>
          </form>
          <Link
            href={"/"}
            className="lg:flex md:flex hidden items-center gap-2 p-2  rounded-[8px] hover:bg-slate-50 "
          >
            <LuUserRound className="text-primary" size={24} />

            <p className="flex items-center text-sm font-medium text-gray-700">
              Sign Up/Sign In
            </p>
          </Link>
        </div>

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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-6 w-[300px]">
          <ul className="flex flex-col  items-start space-y-4 ">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                      isActive
                        ? "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="py-4">
            <Link
              href={"/"}
              className="flex items-center gap-2 py-2 px-2 rounded-[8px] hover:bg-slate-100 "
            >
              <LuUserRound className="text-primary" size={24} />

              <p className="flex items-center text-sm font-medium text-gray-700">
                Sign Up/Sign In
              </p>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
