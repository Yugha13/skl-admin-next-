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
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { 
  PlusCircle, Search, Eye, Pencil, Trash2, 
  Calendar, FileText, Download, Send, 
  CheckCircle2, AlertCircle 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample exams data
const examsData = [
  { 
    id: "E001", 
    title: "Mid-Term Examination", 
    startDate: "15 Sep, 2023",
    endDate: "22 Sep, 2023",
    classes: ["Class 8-A", "Class 9-A", "Class 9-B", "Class 10-A", "Class 10-B"],
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    status: "Completed",
    resultsPublished: true
  },
  { 
    id: "E002", 
    title: "First Unit Test", 
    startDate: "10 Jul, 2023",
    endDate: "12 Jul, 2023",
    classes: ["Class 8-A", "Class 9-A", "Class 9-B"],
    subjects: ["English", "Mathematics", "Science"],
    status: "Completed",
    resultsPublished: true
  },
  { 
    id: "E003", 
    title: "Second Unit Test", 
    startDate: "25 Aug, 2023",
    endDate: "27 Aug, 2023",
    classes: ["Class 8-A", "Class 9-A", "Class 9-B"],
    subjects: ["English", "Mathematics", "Science"],
    status: "Completed",
    resultsPublished: true
  },
  { 
    id: "E004", 
    title: "Final Examination", 
    startDate: "05 Dec, 2023",
    endDate: "15 Dec, 2023",
    classes: ["Class 8-A", "Class 9-A", "Class 9-B", "Class 10-A", "Class 10-B", "Class 11-A (Science)", "Class 11-B (Commerce)", "Class 12-A (Science)"],
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Computer Science"],
    status: "Scheduled",
    resultsPublished: false
  },
  { 
    id: "E005", 
    title: "Pre-Board Examination", 
    startDate: "10 Nov, 2023",
    endDate: "17 Nov, 2023",
    classes: ["Class 10-A", "Class 10-B", "Class 12-A (Science)"],
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    status: "Scheduled",
    resultsPublished: false
  },
  { 
    id: "E006", 
    title: "Practical Examination", 
    startDate: "20 Nov, 2023",
    endDate: "25 Nov, 2023",
    classes: ["Class 10-A", "Class 10-B", "Class 11-A (Science)", "Class 12-A (Science)"],
    subjects: ["Physics", "Chemistry", "Biology", "Computer Science"],
    status: "Scheduled",
    resultsPublished: false
  },
]

// Sample classes
const classes = [
  "Class 8-A",
  "Class 9-A",
  "Class 9-B",
  "Class 10-A",
  "Class 10-B",
  "Class 11-A (Science)",
  "Class 11-B (Commerce)",
  "Class 12-A (Science)"
]

// Sample subjects
const subjects = [
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Accountancy",
  "Business Studies",
  "Social Studies",
  "Science"
]

// Sample student marks data
const studentMarksData = [
  { id: 1, name: "John Smith", rollNumber: "R001", marks: 85, grade: "A", status: "Pass" },
  { id: 2, name: "Emily Johnson", rollNumber: "R002", marks: 92, grade: "A+", status: "Pass" },
  { id: 3, name: "David Williams", rollNumber: "R003", marks: 78, grade: "B+", status: "Pass" },
  { id: 4, name: "Sarah Brown", rollNumber: "R004", marks: 65, grade: "B", status: "Pass" },
  { id: 5, name: "Michael Davis", rollNumber: "R005", marks: 45, grade: "C", status: "Fail" },
  { id: 6, name: "Jessica Miller", rollNumber: "R006", marks: 88, grade: "A", status: "Pass" },
  { id: 7, name: "Daniel Wilson", rollNumber: "R007", marks: 72, grade: "B", status: "Pass" },
  { id: 8, name: "Olivia Moore", rollNumber: "R008", marks: 95, grade: "A+", status: "Pass" },
  { id: 9, name: "James Taylor", rollNumber: "R009", marks: 58, grade: "C+", status: "Pass" },
  { id: 10, name: "Sophia Anderson", rollNumber: "R010", marks: 35, grade: "D", status: "Fail" },
]

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState("exams")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateExamDialog, setShowCreateExamDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState<any>(null)
  
  // Marks entry state
  const [selectedExamForMarks, setSelectedExamForMarks] = useState<string>("") 
  const [selectedSubject, setSelectedSubject] = useState<string>("") 
  const [selectedClass, setSelectedClass] = useState<string>("") 
  const [marksData, setMarksData] = useState(studentMarksData)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  
  // Filter exams based on search term
  const filteredExams = examsData.filter(exam => {
    return (
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      exam.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleView = (exam: any) => {
    setSelectedExam(exam)
    setShowViewDialog(true)
  }

  const handleDelete = (exam: any) => {
    setSelectedExam(exam)
    setShowDeleteDialog(true)
  }

  const handleMarksChange = (studentId: number, value: string) => {
    const marks = parseInt(value) || 0
    let grade = "F"
    let status = "Fail"
    
    if (marks >= 90) grade = "A+"
    else if (marks >= 80) grade = "A"
    else if (marks >= 70) grade = "B+"
    else if (marks >= 60) grade = "B"
    else if (marks >= 50) grade = "C+"
    else if (marks >= 40) grade = "C"
    else if (marks >= 33) grade = "D"
    
    if (marks >= 33) status = "Pass"
    
    setMarksData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, marks, grade, status } 
          : student
      )
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Exams & Marks</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="exams" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Exams
          </TabsTrigger>
          <TabsTrigger value="marks" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Marks Entry
          </TabsTrigger>
        </TabsList>
        
        {/* Exams Tab */}
        <TabsContent value="exams" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search exams..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowCreateExamDialog(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.id}</TableCell>
                      <TableCell className="font-medium">{exam.title}</TableCell>
                      <TableCell>{exam.startDate} to {exam.endDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exam.classes.length > 3 ? (
                            <>
                              <Badge variant="outline" className="bg-blue-50">
                                {exam.classes[0]}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50">
                                {exam.classes[1]}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50">
                                +{exam.classes.length - 2} more
                              </Badge>
                            </>
                          ) : (
                            exam.classes.map(cls => (
                              <Badge key={cls} variant="outline" className="bg-blue-50">
                                {cls}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            exam.status === "Completed" 
                              ? "bg-green-100 text-green-800" 
                              : exam.status === "Scheduled" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {exam.status}
                        </Badge>
                        {exam.resultsPublished && (
                          <Badge className="ml-2 bg-purple-100 text-purple-800">
                            Results Published
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleView(exam)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDelete(exam)}
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
        </TabsContent>
        
        {/* Marks Entry Tab */}
        <TabsContent value="marks" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Marks Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="exam-select" className="mb-2 block">
                    Select Exam
                  </Label>
                  <Select value={selectedExamForMarks} onValueChange={setSelectedExamForMarks}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {examsData.map(exam => (
                        <SelectItem key={exam.id} value={exam.id}>{exam.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subject-select" className="mb-2 block">
                    Select Subject
                  </Label>
                  <Select 
                    value={selectedSubject} 
                    onValueChange={setSelectedSubject}
                    disabled={!selectedExamForMarks}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="class-select" className="mb-2 block">
                    Select Class
                  </Label>
                  <Select 
                    value={selectedClass} 
                    onValueChange={setSelectedClass}
                    disabled={!selectedExamForMarks || !selectedSubject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {selectedExamForMarks && selectedSubject && selectedClass ? (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    <span>Marks Entry Grid</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="h-8">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button 
                        className="bg-blue-500 hover:bg-blue-600 h-8"
                        onClick={() => setShowPublishDialog(true)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Publish Results
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="w-[120px]">Marks (100)</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marksData.map(student => (
                        <TableRow key={student.id}>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              min="0" 
                              max="100" 
                              value={student.marks} 
                              onChange={(e) => handleMarksChange(student.id, e.target.value)}
                              className="h-8 w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              student.grade === "A+" || student.grade === "A" ? "bg-green-100 text-green-800" :
                              student.grade === "B+" || student.grade === "B" ? "bg-blue-100 text-blue-800" :
                              student.grade === "C+" || student.grade === "C" ? "bg-yellow-100 text-yellow-800" :
                              student.grade === "D" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {student.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              student.status === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }>
                              {student.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Submit Marks
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Data Selected</h3>
              <p className="text-gray-500 max-w-md">
                Please select an exam, subject, and class to view and enter marks for students.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Exam Dialog */}
      <Dialog open={showCreateExamDialog} onOpenChange={setShowCreateExamDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Exam</DialogTitle>
            <DialogDescription>
              Enter the details to create a new examination.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exam-title" className="text-right">
                Exam Title
              </Label>
              <Input
                id="exam-title"
                placeholder="e.g., Final Examination 2023"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="exam-classes" className="text-right pt-2">
                Classes
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {classes.map(cls => (
                  <div key={cls} className="flex items-center space-x-2">
                    <input type="checkbox" id={`class-${cls}`} className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor={`class-${cls}`} className="text-sm font-normal">
                      {cls}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="exam-subjects" className="text-right pt-2">
                Subjects
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {subjects.map(subject => (
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
            <Button variant="outline" onClick={() => setShowCreateExamDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateExamDialog(false)}>
              Create Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Exam Dialog */}
      {selectedExam && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedExam.title}</DialogTitle>
              <DialogDescription>
                Exam ID: {selectedExam.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <Badge
                  className={`${
                    selectedExam.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : selectedExam.status === "Scheduled" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedExam.status}
                </Badge>
                {selectedExam.resultsPublished && (
                  <Badge className="bg-purple-100 text-purple-800">
                    Results Published
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Start Date</Label>
                  <p className="text-sm font-medium">{selectedExam.startDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">End Date</Label>
                  <p className="text-sm font-medium">{selectedExam.endDate}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-500">Classes</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedExam.classes.map((cls: string) => (
                    <Badge key={cls} variant="outline" className="bg-blue-50">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-500">Subjects</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedExam.subjects.map((subject: string) => (
                    <Badge key={subject} variant="outline" className="bg-green-50">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h4 className="font-medium mb-2">Exam Schedule</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedExam.subjects.map((subject: string, index: number) => {
                      // Generate sample dates between start and end date
                      const startDate = new Date(selectedExam.startDate.split(",")[0] + ", 2023")
                      const examDate = new Date(startDate)
                      examDate.setDate(startDate.getDate() + index)
                      const dateStr = examDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      
                      return (
                        <TableRow key={subject}>
                          <TableCell>{dateStr}</TableCell>
                          <TableCell>{subject}</TableCell>
                          <TableCell>9:00 AM - 12:00 PM</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
              {!selectedExam.resultsPublished && selectedExam.status === "Completed" && (
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Send className="mr-2 h-4 w-4" />
                  Publish Results
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedExam && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedExam.title}? This action cannot be undone and will remove all associated exam data and results.
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

      {/* Publish Results Confirmation Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Publish Exam Results</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish the results for this exam? Once published, results will be visible to students and parents.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="text-sm">All marks have been entered for selected class and subject</p>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <p className="text-sm">This action cannot be undone. Please verify all marks before publishing.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowPublishDialog(false)}
            >
              Publish Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}