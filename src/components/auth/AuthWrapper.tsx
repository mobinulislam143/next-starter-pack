"use client";
import Image from "next/image";

import { ReactNode } from "react";
import luxuryHotel from "@/assets/image/luxuryHotel2.png";
import login from "@/assets/image/luxuryHotel2.png"
import { usePathname } from 'next/navigation';


export default function AuthWrapper({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  console.log("pathName", pathName);

  return (
    <div className="p-4">
      <main className="flex min-h-[95vh] flex-col md:flex-row">
        {pathName === "/login" || pathName === "/register" ? (
          <>
            <div className="relative hidden flex-1 md:block">
              <Image
                src={pathName === "/login" ? login : luxuryHotel}
                alt="Luxury-hotel"
                fill
                priority
                className="object-cover rounded-[12px]"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20">
                <div className="flex flex-col items-start space-y-8">
           
          </div>
              {children}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20">
                <div className="flex flex-col items-start space-y-8">
           
          </div>
              {children}
            </div>
            <div className="relative hidden flex-1 md:block">
              <Image
                src={login} // Default image when not on '/login' or '/registration'
                alt="Luxury-hotel"
                fill
                priority
                className="object-cover rounded-[12px]"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

