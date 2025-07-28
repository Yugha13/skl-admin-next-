"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const growthData = [
  { year: "2018", schoolWide: 1800, class10: 120, class9: 115 },
  { year: "2019", schoolWide: 2000, class10: 135, class9: 125 },
  { year: "2020", schoolWide: 2100, class10: 140, class9: 130 },
  { year: "2021", schoolWide: 2250, class10: 145, class9: 135 },
  { year: "2022", schoolWide: 2400, class10: 150, class9: 140 },
  { year: "2023", schoolWide: 2500, class10: 155, class9: 145 },
]

export default function StudentGrowthChart() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Student Growth Trend</CardTitle>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  View <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>School-wide</DropdownMenuItem>
                <DropdownMenuItem>By Class</DropdownMenuItem>
                <DropdownMenuItem>By Grade</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">School-wide</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">Class 10</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">Class 9</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#f3f4f6' }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => value}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={40}
                domain={[0, 'dataMax + 500']}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => value}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={40}
                domain={[0, 200]}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'schoolWide') return [value, 'School-wide']
                  if (name === 'class10') return [value, 'Class 10']
                  if (name === 'class9') return [value, 'Class 9']
                  return [value, name]
                }}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Line 
                type="monotone" 
                dataKey="schoolWide" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                yAxisId="left"
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="class10" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                yAxisId="right"
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="class9" 
                stroke="#a855f7" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                yAxisId="right"
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}