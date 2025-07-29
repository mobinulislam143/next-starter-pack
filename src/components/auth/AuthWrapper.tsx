"use client";
import Image from "next/image";

import { ReactNode } from "react";
import luxuryHotel from "@/assets/image/luxuryHotel2.png";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="p-4">
      <main className="flex min-h-[95vh] flex-col md:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-12 lg:px-16 xl:px-20">
          {children}
        </div>
        <div className="relative hidden flex-1 md:block">
          <Image
            src={luxuryHotel}
            alt="Luxury-hotel"
            fill
            priority
            className="object-cover rounded-[12px]"
          />
        </div>
      </main>
    </div>
  );
}
