"use client"

import { useState } from "react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Sidebar from "./components/Sidebar"
import StatsCards from "./components/StatsCards"
import MonthlyRevenueChart from "./components/MonthlyRevenueChart"
import StudentGrowthChart from "./components/StudentGrowthChart"
import NoticeBoard from "./components/NoticeBoard"
import FeeSummaryPanel from "./components/FeeSummaryPanel"

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                  5
                </Badge>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Jane Cooper</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyRevenueChart />
            <StudentGrowthChart />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NoticeBoard />
            <FeeSummaryPanel />
          </div>
      </>
    )
}
