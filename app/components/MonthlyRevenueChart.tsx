"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 19000 },
  { month: "Jul", revenue: 22000 },
  { month: "Aug", revenue: 25000 },
  { month: "Sep", revenue: 23000 },
  { month: "Oct", revenue: 20000 },
  { month: "Nov", revenue: 24000 },
  { month: "Dec", revenue: 27000 },
]

export default function MonthlyRevenueChart() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Monthly Revenue Overview</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                2023 <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>2023</DropdownMenuItem>
              <DropdownMenuItem>2022</DropdownMenuItem>
              <DropdownMenuItem>2021</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#f3f4f6' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">Monthly Revenue</span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            Total: <span className="text-blue-500">$242,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}