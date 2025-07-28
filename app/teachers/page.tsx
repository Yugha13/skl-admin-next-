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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  PlusCircle, Search, Filter, MoreHorizontal, 
  Eye, Pencil, Trash2, BookOpen, GraduationCap, Users 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample teacher data
const teachersData = [
  { 
    id: 1, 
    name: "Dr. Robert Anderson", 
    subject: "Mathematics", 
    classesAssigned: ["Class 9", "Class 10", "Class 11"],
    status: "Active",
    qualification: "Ph.D. in Mathematics",
    joinDate: "10 Jan, 2020",
    email: "robert.a@example.com",
    contactNumber: "+1 (555) 123-4567"
  },
  { 
    id: 2, 
    name: "Ms. Jennifer Lewis", 
    subject: "English", 
    classesAssigned: ["Class 8", "Class 9"],
    status: "Active",
    qualification: "M.A. in English Literature",
    joinDate: "15 Mar, 2021",
    email: "jennifer.l@example.com",
    contactNumber: "+1 (555) 234-5678"
  },
  { 
    id: 3, 
    name: "Mr. Thomas Clark", 
    subject: "Physics", 
    classesAssigned: ["Class 10", "Class 11", "Class 12"],
    status: "Active",
    qualification: "M.Sc. in Physics",
    joinDate: "05 Jun, 2019",
    email: "thomas.c@example.com",
    contactNumber: "+1 (555) 345-6789"
  },
  { 
    id: 4, 
    name: "Mrs. Patricia Moore", 
    subject: "Chemistry", 
    classesAssigned: ["Class 11", "Class 12"],
    status: "Inactive",
    qualification: "Ph.D. in Chemistry",
    joinDate: "22 Aug, 2020",
    email: "patricia.m@example.com",
    contactNumber: "+1 (555) 456-7890"
  },
  { 
    id: 5, 
    name: "Mr. James Wilson", 
    subject: "History", 
    classesAssigned: ["Class 8", "Class 9", "Class 10"],
    status: "Active",
    qualification: "M.A. in History",
    joinDate: "17 Jul, 2021",
    email: "james.w@example.com",
    contactNumber: "+1 (555) 567-8901"
  },
  { 
    id: 6, 
    name: "Ms. Elizabeth Taylor", 
    subject: "Biology", 
    classesAssigned: ["Class 9", "Class 10", "Class 11"],
    status: "Active",
    qualification: "M.Sc. in Biology",
    joinDate: "30 Apr, 2020",
    email: "elizabeth.t@example.com",
    contactNumber: "+1 (555) 678-9012"
  },
  { 
    id: 7, 
    name: "Dr. Michael Brown", 
    subject: "Computer Science", 
    classesAssigned: ["Class 10", "Class 11", "Class 12"],
    status: "Active",
    qualification: "Ph.D. in Computer Science",
    joinDate: "12 Feb, 2019",
    email: "michael.b@example.com",
    contactNumber: "+1 (555) 789-0123"
  },
  { 
    id: 8, 
    name: "Mrs. Sarah Johnson", 
    subject: "Geography", 
    classesAssigned: ["Class 8", "Class 9"],
    status: "Inactive",
    qualification: "M.Sc. in Geography",
    joinDate: "25 Sep, 2021",
    email: "sarah.j@example.com",
    contactNumber: "+1 (555) 890-1234"
  },
]

// List of subjects for filtering
const subjects = [
  "All Subjects",
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science"
]

// List of classes for filtering
const classes = [
  "All Classes",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12"
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [classFilter, setClassFilter] = useState("All Classes")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)

  // Filter teachers based on search term, subject filter, and class filter
  const filteredTeachers = teachersData.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubject = subjectFilter === "All Subjects" || teacher.subject === subjectFilter
    
    const matchesClass = classFilter === "All Classes" || 
      teacher.classesAssigned.some(cls => cls === classFilter)
    
    return matchesSearch && matchesSubject && matchesClass
  })

  const handleView = (teacher: any) => {
    setSelectedTeacher(teacher)
    setShowViewDialog(true)
  }

  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher)
    setShowEditDialog(true)
  }

  const handleDelete = (teacher: any) => {
    setSelectedTeacher(teacher)
    setShowDeleteDialog(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
        <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setShowAddDialog(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <BookOpen className="mr-2 h-4 w-4" />
            <select 
              className="bg-transparent outline-none"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Users className="mr-2 h-4 w-4" />
            <select 
              className="bg-transparent outline-none"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </Button>
        </div>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Classes Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classesAssigned.map((cls: string) => (
                        <Badge key={cls} variant="outline" className="bg-blue-50">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${teacher.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleView(teacher)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(teacher)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDelete(teacher)}
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

      {/* Add Teacher Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Enter the details of the new teacher.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name
              </Label>
              <Input
                id="new-name"
                placeholder="Full name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right">
                Email
              </Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Email address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-subject" className="text-right">
                Subject
              </Label>
              <select
                id="new-subject"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {subjects.filter(s => s !== "All Subjects").map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-qualification" className="text-right">
                Qualification
              </Label>
              <Input
                id="new-qualification"
                placeholder="Highest qualification"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-contact" className="text-right">
                Contact
              </Label>
              <Input
                id="new-contact"
                placeholder="Phone number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="new-classes" className="text-right pt-2">
                Classes
              </Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {classes.filter(c => c !== "All Classes").map(cls => (
                  <div key={cls} className="flex items-center space-x-2">
                    <input type="checkbox" id={`class-${cls}`} className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor={`class-${cls}`} className="text-sm font-normal">
                      {cls}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddDialog(false)}>
              Add Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Teacher Dialog */}
      {selectedTeacher && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Teacher Details</DialogTitle>
              <DialogDescription>
                Detailed information about the teacher.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center space-y-2 mb-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedTeacher.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{selectedTeacher.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {selectedTeacher.subject}
                  </Badge>
                  <Badge
                    className={`${selectedTeacher.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {selectedTeacher.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Email</Label>
                  <p className="text-sm font-medium">{selectedTeacher.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Contact</Label>
                  <p className="text-sm font-medium">{selectedTeacher.contactNumber}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Qualification</Label>
                  <p className="text-sm font-medium">{selectedTeacher.qualification}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Join Date</Label>
                  <p className="text-sm font-medium">{selectedTeacher.joinDate}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-gray-500">Classes Assigned</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTeacher.classesAssigned.map((cls: string) => (
                      <Badge key={cls} variant="outline" className="bg-blue-50">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Teacher Dialog */}
      {selectedTeacher && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
              <DialogDescription>
                Update teacher information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedTeacher.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  defaultValue={selectedTeacher.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-subject" className="text-right">
                  Subject
                </Label>
                <select
                  id="edit-subject"
                  defaultValue={selectedTeacher.subject}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {subjects.filter(s => s !== "All Subjects").map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-qualification" className="text-right">
                  Qualification
                </Label>
                <Input
                  id="edit-qualification"
                  defaultValue={selectedTeacher.qualification}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <select
                  id="edit-status"
                  defaultValue={selectedTeacher.status}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="edit-contact"
                  defaultValue={selectedTeacher.contactNumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-classes" className="text-right pt-2">
                  Classes
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {classes.filter(c => c !== "All Classes").map(cls => (
                    <div key={cls} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`edit-class-${cls}`} 
                        className="h-4 w-4 rounded border-gray-300" 
                        defaultChecked={selectedTeacher.classesAssigned.includes(cls)}
                      />
                      <Label htmlFor={`edit-class-${cls}`} className="text-sm font-normal">
                        {cls}
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
      {selectedTeacher && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedTeacher.name}? This action cannot be undone.
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