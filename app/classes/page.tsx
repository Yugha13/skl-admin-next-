"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlusCircle, Search, Eye, Pencil, Trash2, 
  Users, UserCheck, Clock, Calendar 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample class data
const classesData = [
  { 
    id: "C001", 
    name: "Class 8-A", 
    classTeacher: "Ms. Jennifer Lewis",
    studentCount: 32,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"],
    roomNumber: "101",
    schedule: "Monday to Friday, 8:00 AM - 2:30 PM"
  },
  { 
    id: "C002", 
    name: "Class 9-A", 
    classTeacher: "Mr. James Wilson",
    studentCount: 35,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"],
    roomNumber: "102",
    schedule: "Monday to Friday, 8:00 AM - 3:30 PM"
  },
  { 
    id: "C003", 
    name: "Class 9-B", 
    classTeacher: "Ms. Elizabeth Taylor",
    studentCount: 33,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"],
    roomNumber: "103",
    schedule: "Monday to Friday, 8:00 AM - 3:30 PM"
  },
  { 
    id: "C004", 
    name: "Class 10-A", 
    classTeacher: "Dr. Robert Anderson",
    studentCount: 30,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Computer Science"],
    roomNumber: "201",
    schedule: "Monday to Friday, 8:00 AM - 4:00 PM"
  },
  { 
    id: "C005", 
    name: "Class 10-B", 
    classTeacher: "Mr. Thomas Clark",
    studentCount: 31,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Computer Science"],
    roomNumber: "202",
    schedule: "Monday to Friday, 8:00 AM - 4:00 PM"
  },
  { 
    id: "C006", 
    name: "Class 11-A (Science)", 
    classTeacher: "Mrs. Patricia Moore",
    studentCount: 28,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    roomNumber: "301",
    schedule: "Monday to Friday, 8:30 AM - 4:30 PM"
  },
  { 
    id: "C007", 
    name: "Class 11-B (Commerce)", 
    classTeacher: "Dr. Michael Brown",
    studentCount: 26,
    subjects: ["English", "Mathematics", "Accountancy", "Business Studies", "Economics", "Computer Science"],
    roomNumber: "302",
    schedule: "Monday to Friday, 8:30 AM - 4:30 PM"
  },
  { 
    id: "C008", 
    name: "Class 12-A (Science)", 
    classTeacher: "Mr. Thomas Clark",
    studentCount: 25,
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    roomNumber: "401",
    schedule: "Monday to Friday, 8:30 AM - 4:30 PM"
  },
]

// Sample student data for class view
const sampleStudents = [
  { id: 1, name: "John Smith", rollNumber: "R001", attendance: "95%", performance: "Excellent" },
  { id: 2, name: "Emily Johnson", rollNumber: "R002", attendance: "92%", performance: "Very Good" },
  { id: 3, name: "David Williams", rollNumber: "R003", attendance: "88%", performance: "Good" },
  { id: 4, name: "Sarah Brown", rollNumber: "R004", attendance: "90%", performance: "Very Good" },
  { id: 5, name: "Michael Davis", rollNumber: "R005", attendance: "85%", performance: "Good" },
  { id: 6, name: "Jessica Miller", rollNumber: "R006", attendance: "93%", performance: "Excellent" },
  { id: 7, name: "Daniel Wilson", rollNumber: "R007", attendance: "80%", performance: "Average" },
  { id: 8, name: "Olivia Moore", rollNumber: "R008", attendance: "91%", performance: "Very Good" },
  { id: 9, name: "James Taylor", rollNumber: "R009", attendance: "87%", performance: "Good" },
  { id: 10, name: "Sophia Anderson", rollNumber: "R010", attendance: "94%", performance: "Excellent" },
]

// Sample timetable data
const sampleTimetable = [
  { day: "Monday", periods: [
    { time: "8:00 - 9:00", subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    { time: "9:00 - 10:00", subject: "Physics", teacher: "Mr. Thomas Clark" },
    { time: "10:15 - 11:15", subject: "English", teacher: "Ms. Jennifer Lewis" },
    { time: "11:15 - 12:15", subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    { time: "1:00 - 2:00", subject: "Computer Science", teacher: "Dr. Michael Brown" },
    { time: "2:00 - 3:00", subject: "Physical Education", teacher: "Mr. James Wilson" },
  ]},
  { day: "Tuesday", periods: [
    { time: "8:00 - 9:00", subject: "English", teacher: "Ms. Jennifer Lewis" },
    { time: "9:00 - 10:00", subject: "Biology", teacher: "Ms. Elizabeth Taylor" },
    { time: "10:15 - 11:15", subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    { time: "11:15 - 12:15", subject: "History", teacher: "Mr. James Wilson" },
    { time: "1:00 - 2:00", subject: "Physics", teacher: "Mr. Thomas Clark" },
    { time: "2:00 - 3:00", subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
  ]},
  { day: "Wednesday", periods: [
    { time: "8:00 - 9:00", subject: "Physics", teacher: "Mr. Thomas Clark" },
    { time: "9:00 - 10:00", subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    { time: "10:15 - 11:15", subject: "Computer Science", teacher: "Dr. Michael Brown" },
    { time: "11:15 - 12:15", subject: "English", teacher: "Ms. Jennifer Lewis" },
    { time: "1:00 - 2:00", subject: "Biology", teacher: "Ms. Elizabeth Taylor" },
    { time: "2:00 - 3:00", subject: "Geography", teacher: "Mrs. Sarah Johnson" },
  ]},
]

// Sample teachers list for dropdown
const teachersList = [
  "Dr. Robert Anderson",
  "Ms. Jennifer Lewis",
  "Mr. Thomas Clark",
  "Mrs. Patricia Moore",
  "Mr. James Wilson",
  "Ms. Elizabeth Taylor",
  "Dr. Michael Brown",
  "Mrs. Sarah Johnson"
]

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("students")

  // Filter classes based on search term
  const filteredClasses = classesData.filter(cls => {
    return (
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleView = (cls: any) => {
    setSelectedClass(cls)
    setShowViewDialog(true)
    setActiveTab("students")
  }

  const handleEdit = (cls: any) => {
    setSelectedClass(cls)
    setShowEditDialog(true)
  }

  const handleDelete = (cls: any) => {
    setSelectedClass(cls)
    setShowDeleteDialog(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
        <div className="flex items-center space-x-2">
          <Button 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setShowCreateDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Class
          </Button>
          <Button variant="outline">
            <UserCheck className="mr-2 h-4 w-4" />
            Auto-Assign
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search by class name, teacher or ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Classes Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Assigned Class Teacher</TableHead>
                <TableHead>Student Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.id}</TableCell>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.classTeacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      {cls.studentCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleView(cls)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(cls)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDelete(cls)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Class Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>
              Enter the details to create a new class.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class-id" className="text-right">
                Class ID
              </Label>
              <Input
                id="class-id"
                placeholder="e.g., C009"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class-name" className="text-right">
                Class Name
              </Label>
              <Input
                id="class-name"
                placeholder="e.g., Class 10-C"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class-teacher" className="text-right">
                Class Teacher
              </Label>
              <select
                id="class-teacher"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a teacher</option>
                {teachersList.map(teacher => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-number" className="text-right">
                Room Number
              </Label>
              <Input
                id="room-number"
                placeholder="e.g., 301"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">
                Schedule
              </Label>
              <Input
                id="schedule"
                placeholder="e.g., Monday to Friday, 8:00 AM - 3:30 PM"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="subjects" className="text-right pt-2">
                Subjects
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {[
                  "English", "Mathematics", "Physics", "Chemistry", 
                  "Biology", "History", "Geography", "Computer Science",
                  "Economics", "Accountancy", "Business Studies", "Physical Education"
                ].map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <input type="checkbox" id={`subject-${subject}`} className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor={`subject-${subject}`} className="text-sm font-normal">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>
              Create Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Class Dialog */}
      {selectedClass && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedClass.name}</DialogTitle>
              <DialogDescription>
                Class ID: {selectedClass.id} | Class Teacher: {selectedClass.classTeacher} | Room: {selectedClass.roomNumber}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">
                  <Users className="mr-2 h-4 w-4" />
                  Students
                </TabsTrigger>
                <TabsTrigger value="timetable">
                  <Calendar className="mr-2 h-4 w-4" />
                  Timetable
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="students" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>
                          <Badge className={
                            student.performance === "Excellent" ? "bg-green-100 text-green-800" :
                            student.performance === "Very Good" ? "bg-blue-100 text-blue-800" :
                            student.performance === "Good" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {student.performance}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="timetable" className="mt-4">
                <div className="space-y-6">
                  {sampleTimetable.map(day => (
                    <Card key={day.day} className="overflow-hidden">
                      <CardHeader className="bg-blue-50 py-3">
                        <CardTitle className="text-md font-medium">{day.day}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[150px]">Time</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Teacher</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.periods.map((period, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    {period.time}
                                  </div>
                                </TableCell>
                                <TableCell>{period.subject}</TableCell>
                                <TableCell>{period.teacher}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Class Dialog */}
      {selectedClass && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
              <DialogDescription>
                Update class information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-class-id" className="text-right">
                  Class ID
                </Label>
                <Input
                  id="edit-class-id"
                  defaultValue={selectedClass.id}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-class-name" className="text-right">
                  Class Name
                </Label>
                <Input
                  id="edit-class-name"
                  defaultValue={selectedClass.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-class-teacher" className="text-right">
                  Class Teacher
                </Label>
                <select
                  id="edit-class-teacher"
                  defaultValue={selectedClass.classTeacher}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {teachersList.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-room-number" className="text-right">
                  Room Number
                </Label>
                <Input
                  id="edit-room-number"
                  defaultValue={selectedClass.roomNumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-schedule" className="text-right">
                  Schedule
                </Label>
                <Input
                  id="edit-schedule"
                  defaultValue={selectedClass.schedule}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-subjects" className="text-right pt-2">
                  Subjects
                </Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                  {[
                    "English", "Mathematics", "Physics", "Chemistry", 
                    "Biology", "History", "Geography", "Computer Science",
                    "Economics", "Accountancy", "Business Studies", "Physical Education"
                  ].map(subject => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`edit-subject-${subject}`} 
                        className="h-4 w-4 rounded border-gray-300" 
                        defaultChecked={selectedClass.subjects.includes(subject)}
                      />
                      <Label htmlFor={`edit-subject-${subject}`} className="text-sm font-normal">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditDialog(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedClass && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedClass.name}? This action cannot be undone and will affect {selectedClass.studentCount} students.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}