'use client'

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className=" min-h-screen ">

      <Navbar />
      <div className="min-h-screen" >{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
