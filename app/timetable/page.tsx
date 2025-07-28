"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from "@/components/ui/dialog"
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { 
  Calendar, Clock, Save, Wand2, AlertTriangle, 
  Edit, Check, X 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample time slots
const timeSlots = [
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:15 - 11:15",
  "11:15 - 12:15",
  "1:00 - 2:00",
  "2:00 - 3:00",
  "3:00 - 4:00"
]

// Sample days of the week
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "Physical Education",
  "Free Period"
]

// Sample teachers
const teachers = [
  "Dr. Robert Anderson",
  "Ms. Jennifer Lewis",
  "Mr. Thomas Clark",
  "Mrs. Patricia Moore",
  "Mr. James Wilson",
  "Ms. Elizabeth Taylor",
  "Dr. Michael Brown",
  "Mrs. Sarah Johnson"
]

// Define types for timetable data
interface TimetableSlot {
  subject: string;
  teacher: string;
}

interface TimetableDayData {
  [timeSlot: string]: TimetableSlot;
}

interface TimetableData {
  [day: string]: TimetableDayData;
}

// Sample timetable data (initially empty)
const initialTimetableData = () => {
  const data: TimetableData = {}
  
  daysOfWeek.forEach(day => {
    data[day] = {}
    timeSlots.forEach(slot => {
      data[day][slot] = { subject: "", teacher: "" }
    })
  })
  
  return data
}

// Sample timetable data for Class 10-A (pre-filled)
const sampleTimetableData = {
  "Monday": {
    "8:00 - 9:00": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "9:00 - 10:00": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "10:15 - 11:15": { subject: "English", teacher: "Ms. Jennifer Lewis" },
    "11:15 - 12:15": { subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    "1:00 - 2:00": { subject: "Computer Science", teacher: "Dr. Michael Brown" },
    "2:00 - 3:00": { subject: "Physical Education", teacher: "Mr. James Wilson" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  },
  "Tuesday": {
    "8:00 - 9:00": { subject: "English", teacher: "Ms. Jennifer Lewis" },
    "9:00 - 10:00": { subject: "Biology", teacher: "Ms. Elizabeth Taylor" },
    "10:15 - 11:15": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "11:15 - 12:15": { subject: "History", teacher: "Mr. James Wilson" },
    "1:00 - 2:00": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "2:00 - 3:00": { subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  },
  "Wednesday": {
    "8:00 - 9:00": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "9:00 - 10:00": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "10:15 - 11:15": { subject: "Computer Science", teacher: "Dr. Michael Brown" },
    "11:15 - 12:15": { subject: "English", teacher: "Ms. Jennifer Lewis" },
    "1:00 - 2:00": { subject: "Biology", teacher: "Ms. Elizabeth Taylor" },
    "2:00 - 3:00": { subject: "Geography", teacher: "Mrs. Sarah Johnson" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  },
  "Thursday": {
    "8:00 - 9:00": { subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    "9:00 - 10:00": { subject: "English", teacher: "Ms. Jennifer Lewis" },
    "10:15 - 11:15": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "11:15 - 12:15": { subject: "Computer Science", teacher: "Dr. Michael Brown" },
    "1:00 - 2:00": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "2:00 - 3:00": { subject: "Biology", teacher: "Ms. Elizabeth Taylor" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  },
  "Friday": {
    "8:00 - 9:00": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "9:00 - 10:00": { subject: "English", teacher: "Ms. Jennifer Lewis" },
    "10:15 - 11:15": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "11:15 - 12:15": { subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    "1:00 - 2:00": { subject: "History", teacher: "Mr. James Wilson" },
    "2:00 - 3:00": { subject: "Geography", teacher: "Mrs. Sarah Johnson" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  },
  "Saturday": {
    "8:00 - 9:00": { subject: "Computer Science", teacher: "Dr. Michael Brown" },
    "9:00 - 10:00": { subject: "Mathematics", teacher: "Dr. Robert Anderson" },
    "10:15 - 11:15": { subject: "Physics", teacher: "Mr. Thomas Clark" },
    "11:15 - 12:15": { subject: "Chemistry", teacher: "Mrs. Patricia Moore" },
    "1:00 - 2:00": { subject: "Free Period", teacher: "" },
    "2:00 - 3:00": { subject: "Free Period", teacher: "" },
    "3:00 - 4:00": { subject: "Free Period", teacher: "" }
  }
}

// Sample conflicts data
const sampleConflicts = [
  { day: "Monday", time: "9:00 - 10:00", teacher: "Mr. Thomas Clark", classes: ["Class 10-A", "Class 11-A (Science)"] },
  { day: "Wednesday", time: "1:00 - 2:00", teacher: "Ms. Elizabeth Taylor", classes: ["Class 10-A", "Class 9-B"] },
]

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [timetableData, setTimetableData] = useState<TimetableData>(sampleTimetableData)
  const [editingCell, setEditingCell] = useState<{day: string, time: string} | null>(null)
  const [showConflictsDialog, setShowConflictsDialog] = useState(false)
  const [showAutoGenerateDialog, setShowAutoGenerateDialog] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  
  // Function to handle cell edit
  const handleCellEdit = (day: string, time: string) => {
    setEditingCell({ day, time })
  }
  
  // Function to save cell edit
  const handleSaveEdit = (day: string, time: string, subject: string, teacher: string) => {
    setTimetableData(prev => {
      const updatedData: TimetableData = {
        ...prev,
        [day]: {
          ...(prev[day] || {}),
          [time]: { subject, teacher }
        }
      }
      return updatedData
    })
    setEditingCell(null)
  }
  
  // Function to cancel cell edit
  const handleCancelEdit = () => {
    setEditingCell(null)
  }
  
  // Function to check if a cell has a conflict
  const hasConflict = (day: string, time: string) => {
    return sampleConflicts.some(conflict => 
      conflict.day === day && 
      conflict.time === time && 
      conflict.classes.includes(selectedClass)
    )
  }
  
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
        <div className="flex items-center space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Wand2 className="mr-2 h-4 w-4" />
                Auto-generate Timetable
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Auto-generate Timetable</AlertDialogTitle>
                <AlertDialogDescription>
                  This will automatically generate a timetable for the selected class based on subject requirements and teacher availability. Any existing timetable data will be overwritten.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setShowAutoGenerateDialog(false)}>
                  Generate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowSaveConfirmation(true)}>
            <Save className="mr-2 h-4 w-4" />
            Save Timetable
          </Button>
        </div>
      </div>

      {/* Class and Day Selection */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="class-select">Select Class:</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="day-select">Select Day:</Label>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map(day => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
          onClick={() => setShowConflictsDialog(true)}
        >
          <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
          View Conflicts
        </Button>
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Timetable for {selectedClass} - {selectedDay}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map(time => (
                <TableRow key={time} className={hasConflict(selectedDay, time) ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      {time}
                    </div>
                    {hasConflict(selectedDay, time) && (
                      <Badge variant="outline" className="mt-1 bg-red-50 text-red-800 border-red-200">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Conflict
                      </Badge>
                    )}
                  </TableCell>
                  
                  {editingCell && editingCell.day === selectedDay && editingCell.time === time ? (
                    <>
                      <TableCell>
                        <Select defaultValue={timetableData[selectedDay]?.[time]?.subject || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map(subject => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={timetableData[selectedDay]?.[time]?.teacher || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {teachers.map(teacher => (
                              <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleSaveEdit(
                              selectedDay, 
                              time, 
                              timetableData[selectedDay]?.[time]?.subject || "", 
                              timetableData[selectedDay]?.[time]?.teacher || ""
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        {timetableData[selectedDay]?.[time]?.subject || "Not assigned"}
                      </TableCell>
                      <TableCell>
                        {timetableData[selectedDay]?.[time]?.teacher || "Not assigned"}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleCellEdit(selectedDay, time)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Conflicts Dialog */}
      <Dialog open={showConflictsDialog} onOpenChange={setShowConflictsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Timetable Conflicts
            </DialogTitle>
            <DialogDescription>
              The following conflicts were detected in the timetable.
            </DialogDescription>
          </DialogHeader>
          
          {sampleConflicts.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Conflicting Classes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleConflicts.map((conflict, index) => (
                    <TableRow key={index} className="bg-red-50">
                      <TableCell>{conflict.day}</TableCell>
                      <TableCell>{conflict.time}</TableCell>
                      <TableCell>{conflict.teacher}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {conflict.classes.map(cls => (
                            <Badge key={cls} variant="outline" className="bg-red-50 text-red-800 border-red-200">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <Check className="h-12 w-12 text-green-500 mb-2" />
              <p className="text-center text-gray-500">No conflicts detected in the timetable.</p>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowConflictsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <AlertDialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Timetable</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save the current timetable for {selectedClass}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowSaveConfirmation(false)}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}