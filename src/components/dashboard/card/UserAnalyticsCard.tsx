"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import menImg from "@/assets/women.png";
interface UserData {
  count: number;
  growth: number;
  isPositive: boolean;
}

interface UserAnalyticsData {
  daily: UserData;
  weekly: UserData;
  monthly: UserData;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const mockData: UserAnalyticsData = {
  daily: {
    count: 150,
    growth: 10,
    isPositive: true,
  },
  weekly: {
    count: 1250,
    growth: 15,
    isPositive: true,
  },
  monthly: {
    count: 4800,
    growth: -5,
    isPositive: false,
  },
};

const mockUsers: User[] = [
  { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "David Brown",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Lisa Davis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Tom Miller",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Emma Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

type TimePeriod = "daily" | "weekly" | "monthly";

export default function UserAnalyticsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("daily");

  const currentData = mockData[selectedPeriod];
  const visibleUsers = mockUsers.slice(0, 7);
  const remainingCount = Math.max(0, mockUsers.length - 7);

  const getPeriodLabel = (period: TimePeriod) => {
    switch (period) {
      case "daily":
        return "Today";
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
    }
  };

  return (
    <Card className="w-full h-full flex flex-col justify-around bg-gray-50 ">
      <CardHeader className="pb-4">
        <div className="flex lg:flex-row md:flex-col flex-col items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600">
            New Users {getPeriodLabel(selectedPeriod)}
          </h3>
          <div className="flex gap-1">
            {(["daily", "weekly", "monthly"] as TimePeriod[]).map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  "h-8 px-3 text-xs font-medium capitalize",
                  selectedPeriod === period
                    ? "bg-bprimary hover:bg-bprimary/95 hover:text-white text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-black">
            {currentData.count.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            {currentData.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                currentData.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {Math.abs(currentData.growth)}%{" "}
              {getPeriodLabel(selectedPeriod).toLowerCase()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardContent className="space-y-6">
        {/* Metrics Section */}

        {/* Join Today Section */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-black">Join Today</h4>
          <div className="flex items-center">
            {visibleUsers.map((user, index) => (
              <div
                key={user.id}
                className="relative -ml-2 first:ml-0"
                style={{ zIndex: visibleUsers.length - index }}
              >
                <Image
                  src={menImg}
                  alt={user.name}
                  width={50}
                  height={50}
                  className=" w-[50px] h-[50px] rounded-full border-2 border-white object-cover"
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative -ml-2 flex w-[50px] h-[50px] items-center justify-center rounded-full bg-bprimary border-2 border-white text-white text-sm font-medium">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
