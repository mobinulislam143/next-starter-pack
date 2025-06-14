"use client";
import SignupLottie from "@/components/lottie/SignupLottie";

import { ReactNode } from "react";
// import Navbar from "../common/Navbar";



export default function AuthWrapper({ children }: { children : ReactNode}) {


    return (
        <div>
            {/* <Navbar/> */}
            <div className="container relative ">
               

                <div className="grid min-h-screen lg:grid-cols-2 md:grid-cols-2  grid-cols-1 items-center justify-between gap-[20px]">

                    <div className="lg:block md:block hidden ">
                        <div className="bg-[#f3fdf7]">
                            <SignupLottie />

                        </div>
                    </div>
                    <div className="lg:block md:block flex justify-center items-cente">
                        <div className="w-full px-6 sm:px-12 md:px-1 lg:px-3 xl:px-4">
                            {children}
                      </div>
                    </div>

                </div>

            </div>
        </div>
    );
}