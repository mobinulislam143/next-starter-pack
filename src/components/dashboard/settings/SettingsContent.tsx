"use client"

import { BasicForm } from "./form/BasicForm"
import { NotificationForm } from "./form/NotificationForm"
import { PasswordForm } from "./form/PasswordForm"


interface SettingsContentProps {
  activeSection: "basic" | "account" | "notifications"
}

export function SettingsContent({ activeSection }: SettingsContentProps) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      {activeSection === "basic" && <BasicForm />}
      {activeSection === "account" && <PasswordForm />}
      {activeSection === "notifications" && <NotificationForm />}
    </div>
  )
}
