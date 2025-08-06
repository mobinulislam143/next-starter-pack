"use client";

import { dashboardStats } from "@/types/fakeData";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import { ChartBarDefault } from "@/components/dashboard/ChartBarDefault";
import UserAnalyticsCard from "@/components/dashboard/card/UserAnalyticsCard";
import SellingService from "@/components/dashboard/card/SellingService";
import { getIconComponent } from "@/utils/icon-mapper";

const Dashboard = () => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat) => {
            const IconComponent = getIconComponent(stat.icon);

            return (
              <DashboardStatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={IconComponent}
                bgColor={stat.bgColor}
                iconColor={stat.iconColor}
                textColor={stat.textColor}
              />
            );
          })}
        </div>
      </div>
      {/* order insights */}
      <div className="mt-6 grid xl:grid-cols-3 grid-cols-2 gap-4 ">
        <div className="col-span-2">
          <ChartBarDefault />
        </div>
        <div className="xl:col-span-1 col-span-2">
          <UserAnalyticsCard />
        </div>
      </div>
      <div className="mt-6">
        <SellingService />
      </div>
    </div>
  );
};

export default Dashboard;
