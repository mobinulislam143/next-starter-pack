"use client"

import { SettingsContent } from "@/components/dashboard/settings/SettingsContent"
import { SettingsSidebar } from "@/components/dashboard/settings/SettingsSidebar"
import { useState } from "react"
// import { SettingsSidebar } from "@/components/settings-sidebar"
// import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<"basic" | "account" | "notifications">("basic")

  return (
    <div className="flex w-full max-w-6xl mx-auto py-8 px-4 md:px-6 lg:px-8">
      <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SettingsContent activeSection={activeSection} />
    </div>
  )
}
