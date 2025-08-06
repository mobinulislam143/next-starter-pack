import type { LucideIcon } from "lucide-react"

interface DashboardStatCardProps {
  title: string
  value: string
  icon: LucideIcon
  bgColor: string
  iconColor: string
  textColor: string
}

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  textColor,
}: DashboardStatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor} mb-2`}>{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}
