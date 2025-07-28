import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Eye } from "lucide-react"
import Image from "next/image"

const notices = [
  {
    id: 1,
    title: "School annual sports day celebration 2023",
    date: "20 July, 2023",
    views: "20k",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Annual Function celebration 2023-24",
    date: "05 July, 2023",
    views: "15k",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Mid term examination routine published",
    date: "15 June, 2023",
    views: "22k",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    title: "Inter school annual painting competition",
    date: "18 May, 2023",
    views: "18k",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function NoticeBoard() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notice Board</CardTitle>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Image
              src={notice.image || "/placeholder.svg"}
              alt={notice.title}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{notice.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-blue-500">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">{notice.views}</span>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
