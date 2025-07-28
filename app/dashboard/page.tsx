"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts"
import { 
  Users, GraduationCap, BookOpen, DollarSign, 
  PlusCircle, Bell, Calendar, ArrowRight 
} from "lucide-react"

// Sample data for charts
const monthlyFeeData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 15000 },
  { month: "Mar", amount: 18000 },
  { month: "Apr", amount: 16000 },
  { month: "May", amount: 21000 },
  { month: "Jun", amount: 19000 },
  { month: "Jul", amount: 22000 },
  { month: "Aug", amount: 25000 },
  { month: "Sep", amount: 23000 },
  { month: "Oct", amount: 20000 },
  { month: "Nov", amount: 24000 },
  { month: "Dec", amount: 27000 },
]

const studentGrowthData = [
  { year: "2018", students: 1800 },
  { year: "2019", students: 2000 },
  { year: "2020", students: 2100 },
  { year: "2021", students: 2250 },
  { year: "2022", students: 2400 },
  { year: "2023", students: 2500 },
]

const feeStatusData = [
  { name: "Paid", value: 65, color: "#22c55e" },
  { name: "Due", value: 25, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
]

const upcomingExams = [
  { id: 1, title: "Mid-Term Mathematics", date: "15 Aug, 2023", class: "Class 10" },
  { id: 2, title: "Science Quarterly Test", date: "18 Aug, 2023", class: "Class 9" },
  { id: 3, title: "English Literature", date: "22 Aug, 2023", class: "Class 8" },
  { id: 4, title: "Computer Science Practical", date: "25 Aug, 2023", class: "Class 11" },
  { id: 5, title: "History & Civics", date: "28 Aug, 2023", class: "Class 7" },
]

// Custom label for pie chart
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

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            August 2023
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">2,500</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +4.5% <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-50">
                <GraduationCap className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">150</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +2.3% <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-50">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +1.5% <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-yellow-50">
                <DollarSign className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$27,000</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +12.5% <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Fee Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyFeeData}
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
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #f3f4f6',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Student Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Student Growth (by Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={studentGrowthData}
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
                    tickFormatter={(value) => value}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'Students']}
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
                    dataKey="students" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Fee Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fee Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={200}
                  >
                    {feeStatusData.map((entry, index) => (
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
            <div className="flex justify-between items-center mt-4">
              {feeStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{exam.title}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-500">{exam.date}</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className="text-xs text-gray-500">{exam.class}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Student
              </Button>
              <Button className="w-full justify-start bg-green-500 hover:bg-green-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Class
              </Button>
              <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600">
                <Bell className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
              <Button className="w-full justify-start bg-yellow-500 hover:bg-yellow-600">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}