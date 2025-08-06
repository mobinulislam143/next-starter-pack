"use client";

import { useState, useEffect } from "react";
import menImg from "@/assets/women.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Line } from "react-chartjs-2";
// import Image from "next/image";
import PerformanceDashboard from "./PerformanceDashboard";
import DynamicServiceCard, { Service } from "./DynamicServiceCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SellingService() {
  const [services] = useState<Service[]>([
    {
      name: "Electrical Services",
      category: "Handyman",
      times: 30,
      revenue: 8000,
      image: menImg.src,
    },
    {
      name: "Massage Services",
      category: "Spa & wellness",
      times: 40,
      revenue: 1250,
      image: menImg.src,
    },
    {
      name: "Bedroom Washing",
      category: "Home Cleaning",
      times: 20,
      revenue: 254,
      image: menImg.src,
    },
  ]);

  useEffect(() => {
    // Simulate dynamic data update
  }, []);

  return (
    <div className="mt-6 grid xl:grid-cols-3 grid-cols-2 gap-4">
      <div className="col-span-2">
        <DynamicServiceCard services={services} />
      </div>
      <div className="xl:col-span-1 col-span-2">
        <PerformanceDashboard />
      </div>
    </div>
  );
}
