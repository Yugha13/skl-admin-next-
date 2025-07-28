import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, Building, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "2500",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Teachers",
    value: "150",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Classes",
    value: "45",
    icon: Building,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Earnings",
    value: "$10,000",
    icon: DollarSign,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
