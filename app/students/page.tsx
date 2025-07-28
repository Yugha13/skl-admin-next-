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
import { Select } from "@/components/ui/select"
import { 
  PlusCircle, Search, Filter, MoreHorizontal, 
  Eye, Pencil, Trash2, Upload, X, Check 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample student data
const studentsData = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john.smith@example.com", 
    class: "Class 10", 
    status: "Active",
    admissionDate: "15 Jun, 2022",
    feeStatus: "Paid",
    parentName: "Robert Smith",
    contactNumber: "+1 (555) 123-4567"
  },
  { 
    id: 2, 
    name: "Emily Johnson", 
    email: "emily.j@example.com", 
    class: "Class 9", 
    status: "Active",
    admissionDate: "10 Apr, 2022",
    feeStatus: "Due",
    parentName: "Michael Johnson",
    contactNumber: "+1 (555) 234-5678"
  },
  { 
    id: 3, 
    name: "David Williams", 
    email: "david.w@example.com", 
    class: "Class 11", 
    status: "Active",
    admissionDate: "22 May, 2022",
    feeStatus: "Paid",
    parentName: "James Williams",
    contactNumber: "+1 (555) 345-6789"
  },
  { 
    id: 4, 
    name: "Sarah Brown", 
    email: "sarah.b@example.com", 
    class: "Class 8", 
    status: "Inactive",
    admissionDate: "05 Jul, 2022",
    feeStatus: "Overdue",
    parentName: "Jennifer Brown",
    contactNumber: "+1 (555) 456-7890"
  },
  { 
    id: 5, 
    name: "Michael Davis", 
    email: "michael.d@example.com", 
    class: "Class 10", 
    status: "Active",
    admissionDate: "18 Aug, 2022",
    feeStatus: "Paid",
    parentName: "Christopher Davis",
    contactNumber: "+1 (555) 567-8901"
  },
  { 
    id: 6, 
    name: "Jessica Miller", 
    email: "jessica.m@example.com", 
    class: "Class 9", 
    status: "Active",
    admissionDate: "30 Jun, 2022",
    feeStatus: "Due",
    parentName: "Patricia Miller",
    contactNumber: "+1 (555) 678-9012"
  },
  { 
    id: 7, 
    name: "Daniel Wilson", 
    email: "daniel.w@example.com", 
    class: "Class 11", 
    status: "Inactive",
    admissionDate: "12 May, 2022",
    feeStatus: "Overdue",
    parentName: "Thomas Wilson",
    contactNumber: "+1 (555) 789-0123"
  },
  { 
    id: 8, 
    name: "Olivia Moore", 
    email: "olivia.m@example.com", 
    class: "Class 8", 
    status: "Active",
    admissionDate: "25 Jul, 2022",
    feeStatus: "Paid",
    parentName: "Elizabeth Moore",
    contactNumber: "+1 (555) 890-1234"
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Filter students based on search term and status filter
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || student.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleView = (student: any) => {
    setSelectedStudent(student)
    setShowViewDialog(true)
  }

  const handleEdit = (student: any) => {
    setSelectedStudent(student)
    setShowEditDialog(true)
  }

  const handleDelete = (student: any) => {
    setSelectedStudent(student)
    setShowDeleteDialog(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name, email or class..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Status: 
            <select 
              className="ml-1 bg-transparent outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleView(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(student)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDelete(student)}
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

      {/* View Student Dialog */}
      {selectedStudent && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
              <DialogDescription>
                Detailed information about the student.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center space-y-2 mb-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedStudent.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                <Badge
                  className={`${selectedStudent.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {selectedStudent.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Email</Label>
                  <p className="text-sm font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Class</Label>
                  <p className="text-sm font-medium">{selectedStudent.class}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Admission Date</Label>
                  <p className="text-sm font-medium">{selectedStudent.admissionDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Fee Status</Label>
                  <p className="text-sm font-medium">{selectedStudent.feeStatus}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Parent Name</Label>
                  <p className="text-sm font-medium">{selectedStudent.parentName}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Contact Number</Label>
                  <p className="text-sm font-medium">{selectedStudent.contactNumber}</p>
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

      {/* Edit Student Dialog */}
      {selectedStudent && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update student information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedStudent.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={selectedStudent.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <Input
                  id="class"
                  defaultValue={selectedStudent.class}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  defaultValue={selectedStudent.status}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parent" className="text-right">
                  Parent
                </Label>
                <Input
                  id="parent"
                  defaultValue={selectedStudent.parentName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  defaultValue={selectedStudent.contactNumber}
                  className="col-span-3"
                />
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
      {selectedStudent && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedStudent.name}? This action cannot be undone.
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