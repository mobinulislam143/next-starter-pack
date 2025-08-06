import { Briefcase, User, Users, Wallet, type LucideIcon } from "lucide-react"

export const iconMapper: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  user: User,
  users: Users,
  wallet: Wallet,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMapper[iconName] || User
}
