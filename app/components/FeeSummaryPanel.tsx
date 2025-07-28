"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Bell } from "lucide-react"

const feeData = [
  { name: "Paid", value: 65, color: "#22c55e" },
  { name: "Due", value: 25, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function FeeSummaryPanel() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Fee Summary</CardTitle>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            size="sm"
          >
            <Bell className="w-4 h-4" />
            Send Reminder
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #f3f4f6",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-6 mt-6 md:mt-0">
            <div className="space-y-4">
              {feeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Students</span>
                <span className="text-sm font-bold">2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Fee Collection</span>
                <span className="text-sm font-bold text-green-500">$875,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Collection</span>
                <span className="text-sm font-bold text-yellow-500">$306,250</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}