"use client";
import Image from "next/image";

import { ReactNode } from "react";
import login from "@/assets/image/login.png"
import { usePathname } from 'next/navigation';


export default function AuthWrapper({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  console.log("pathName", pathName);

  return (
    <div>
      <main className="flex min-h-screen flex-col md:flex-row">
        <div className="relative hidden flex-1 md:block">
          <Image
            src={login}
            alt="Luxury-hotel"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 md:px-12 lg:px-16 xl:px-20">
          <div className="xl:max-w-[450px] w-full flex justify-center mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}