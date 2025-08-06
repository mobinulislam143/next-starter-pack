"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "Mon", completed: 45, rejected: 12 },
  { day: "Tue", completed: 52, rejected: 15 },
  { day: "Wed", completed: 38, rejected: 18 },
  { day: "Thu", completed: 65, rejected: 14 },
  { day: "Fri", completed: 48, rejected: 16 },
  { day: "Sat", completed: 72, rejected: 11 },
  { day: "Sun", completed: 58, rejected: 19 },
];

const timeRanges = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function PerformanceDashboard() {
  const [selectedRange, setSelectedRange] = useState("Weekly");

  return (
    <div className="w-full  mx-auto">
      <div className="bg-white  rounded-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Performance</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                {selectedRange}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeRanges.map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#6B7280" }}
                dy={10}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10B981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: "#10B981" }}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#EF4444"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: "#EF4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-gray-700 font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span className="text-gray-700 font-medium">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
