import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | School Admin Dashboard",
  description: "Manage school settings and configurations",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  )
}