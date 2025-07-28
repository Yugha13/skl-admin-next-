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
  PlusCircle, Search, Bell, Calendar, Clock, 
  Users, CheckCircle2, XCircle, Eye, Trash2, 
  Copy, Send, Save, FileText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample notification history data
const notificationHistoryData = [
  { 
    id: 1, 
    title: "Fee Payment Reminder", 
    message: "This is a reminder that the last date for fee payment is 15th August. Please make the payment to avoid late fee charges.", 
    sentOn: "05 Aug, 2023 • 10:30 AM", 
    target: "All Students", 
    status: "Sent", 
    sentTo: 320, 
    read: 245 
  },
  { 
    id: 2, 
    title: "Parent-Teacher Meeting", 
    message: "The Parent-Teacher Meeting for Classes 9 and 10 will be held on 20th August from 9:00 AM to 1:00 PM. Your presence is mandatory.", 
    sentOn: "10 Aug, 2023 • 09:15 AM", 
    target: "Class 9, Class 10", 
    status: "Sent", 
    sentTo: 120, 
    read: 98 
  },
  { 
    id: 3, 
    title: "Annual Sports Day Announcement", 
    message: "The Annual Sports Day will be held on 25th September. Students interested in participating should register with their respective sports teachers by 5th September.", 
    sentOn: "01 Sep, 2023 • 11:45 AM", 
    target: "All Students, All Teachers", 
    status: "Sent", 
    sentTo: 450, 
    read: 380 
  },
  { 
    id: 4, 
    title: "Holiday Announcement", 
    message: "The school will remain closed on 15th September due to local elections. Regular classes will resume on 16th September.", 
    sentOn: "12 Sep, 2023 • 02:30 PM", 
    target: "All Students, All Teachers, All Staff", 
    status: "Sent", 
    sentTo: 520, 
    read: 490 
  },
  { 
    id: 5, 
    title: "Exam Schedule for Class 12", 
    message: "The pre-board examination for Class 12 will commence from 10th November. The detailed schedule has been uploaded on the school website.", 
    sentOn: "01 Nov, 2023 • 09:00 AM", 
    target: "Class 12-A (Science)", 
    status: "Scheduled", 
    sentTo: 45, 
    read: 0 
  },
  { 
    id: 6, 
    title: "Teacher's Meeting", 
    message: "All teachers are requested to attend a meeting regarding the upcoming annual day celebrations on 18th November at 3:00 PM in the conference hall.", 
    sentOn: "15 Nov, 2023 • 10:00 AM", 
    target: "All Teachers", 
    status: "Scheduled", 
    sentTo: 35, 
    read: 0 
  },
  { 
    id: 7, 
    title: "Library Book Return Reminder", 
    message: "All students who have borrowed books from the library are requested to return them by 20th November for the annual stock verification.", 
    sentOn: "10 Nov, 2023 • 01:15 PM", 
    target: "All Students", 
    status: "Sent", 
    sentTo: 320, 
    read: 210 
  },
  { 
    id: 8, 
    title: "Science Exhibition", 
    message: "The annual science exhibition will be held on 5th December. Students interested in presenting their projects should submit their proposals to their science teachers by 20th November.", 
    sentOn: "15 Nov, 2023 • 11:30 AM", 
    target: "Class 9-A, Class 9-B, Class 10-A, Class 10-B", 
    status: "Scheduled", 
    sentTo: 160, 
    read: 0 
  },
]

// Sample notification templates
const notificationTemplates = [
  { 
    id: 1, 
    title: "Fee Payment Reminder", 
    message: "This is a reminder that the last date for fee payment is [DATE]. Please make the payment to avoid late fee charges.", 
    category: "Fee", 
    lastUsed: "05 Aug, 2023" 
  },
  { 
    id: 2, 
    title: "Parent-Teacher Meeting", 
    message: "The Parent-Teacher Meeting for [CLASSES] will be held on [DATE] from [TIME]. Your presence is mandatory.", 
    category: "Meeting", 
    lastUsed: "10 Aug, 2023" 
  },
  { 
    id: 3, 
    title: "Exam Schedule Announcement", 
    message: "The [EXAM_NAME] for [CLASSES] will commence from [DATE]. The detailed schedule has been uploaded on the school website.", 
    category: "Exam", 
    lastUsed: "01 Nov, 2023" 
  },
  { 
    id: 4, 
    title: "Holiday Announcement", 
    message: "The school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [RESUME_DATE].", 
    category: "Holiday", 
    lastUsed: "12 Sep, 2023" 
  },
  { 
    id: 5, 
    title: "Event Invitation", 
    message: "You are cordially invited to attend the [EVENT_NAME] on [DATE] at [TIME] in [VENUE].", 
    category: "Event", 
    lastUsed: "Never" 
  },
]

// Sample target groups
const targetGroups = [
  "All Students",
  "All Teachers",
  "All Staff",
  "Class 8-A",
  "Class 9-A",
  "Class 9-B",
  "Class 10-A",
  "Class 10-B",
  "Class 11-A (Science)",
  "Class 11-B (Commerce)",
  "Class 12-A (Science)",
  "Parents",
  "Management"
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [searchTerm, setSearchTerm] = useState("")
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [showCreateTemplateDialog, setShowCreateTemplateDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [selectedTargets, setSelectedTargets] = useState<string[]>([])
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [sendNow, setSendNow] = useState(true)
  
  // Filter notification history based on search term
  const filteredNotifications = notificationHistoryData.filter(notification => {
    return (
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.target.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleViewNotification = (notification: any) => {
    setSelectedNotification(notification)
    setShowViewDialog(true)
  }

  const handleDeleteNotification = (notification: any) => {
    setSelectedNotification(notification)
    setShowDeleteDialog(true)
  }

  const handleUseTemplate = (template: any) => {
    setSelectedTemplate(template)
    setNotificationTitle(template.title)
    setNotificationMessage(template.message)
    setActiveTab("create")
  }

  const handleTargetSelection = (target: string) => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(t => t !== target))
    } else {
      setSelectedTargets([...selectedTargets, target])
    }
  }

  const handleScheduleToggle = (value: boolean) => {
    setSendNow(value)
    if (value) {
      setScheduleDate("")
      setScheduleTime("")
    } else {
      // Set default schedule to tomorrow at 9:00 AM
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setScheduleDate(tomorrow.toISOString().split('T')[0])
      setScheduleTime("09:00")
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="create" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Notification
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notification History
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>
        
        {/* Create Notification Tab */}
        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Create New Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notification-title" className="mb-2 block">
                    Notification Title
                  </Label>
                  <Input
                    id="notification-title"
                    placeholder="Enter notification title"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="notification-message" className="mb-2 block">
                    Message
                  </Label>
                  <textarea
                    id="notification-message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter notification message"
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">
                    Target Recipients
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {targetGroups.map(target => (
                      <div key={target} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`target-${target}`} 
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedTargets.includes(target)}
                          onChange={() => handleTargetSelection(target)}
                        />
                        <Label htmlFor={`target-${target}`} className="text-sm font-normal">
                          {target}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">
                    Delivery Options
                  </Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="send-now" 
                        name="delivery-option"
                        className="h-4 w-4 rounded-full border-gray-300"
                        checked={sendNow}
                        onChange={() => handleScheduleToggle(true)}
                      />
                      <Label htmlFor="send-now" className="text-sm font-normal">
                        Send Now
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="schedule" 
                        name="delivery-option"
                        className="h-4 w-4 rounded-full border-gray-300"
                        checked={!sendNow}
                        onChange={() => handleScheduleToggle(false)}
                      />
                      <Label htmlFor="schedule" className="text-sm font-normal">
                        Schedule
                      </Label>
                    </div>
                  </div>
                </div>
                
                {!sendNow && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="schedule-date" className="mb-2 block">
                        Date
                      </Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule-time" className="mb-2 block">
                        Time
                      </Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label className="mb-2 block">
                    Notification Method
                  </Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="method-app" 
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="method-app" className="text-sm font-normal">
                        In-App
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="method-email" 
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="method-email" className="text-sm font-normal">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="method-sms" 
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="method-sms" className="text-sm font-normal">
                        SMS
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Template
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  {sendNow ? (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Notification
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification History Tab */}
        <TabsContent value="history" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Sent On</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent/Read</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>{notification.sentOn}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {notification.target.split(", ").length > 2 ? (
                            <>
                              <Badge variant="outline" className="bg-blue-50">
                                {notification.target.split(", ")[0]}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50">
                                +{notification.target.split(", ").length - 1} more
                              </Badge>
                            </>
                          ) : (
                            notification.target.split(", ").map(target => (
                              <Badge key={target} variant="outline" className="bg-blue-50">
                                {target}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            notification.status === "Sent" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {notification.status === "Sent" ? (
                          <span className="text-sm">
                            {notification.read}/{notification.sentTo} 
                            <span className="text-gray-500">({Math.round((notification.read / notification.sentTo) * 100)}%)</span>
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleViewNotification(notification)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleUseTemplate({
                              title: notification.title,
                              message: notification.message
                            })}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDeleteNotification(notification)}
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
        
        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowCreateTemplateDialog(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notificationTemplates
                    .filter(template => 
                      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      template.category.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50">
                          {template.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleUseTemplate(template)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
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
      </Tabs>

      {/* View Notification Dialog */}
      {selectedNotification && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedNotification.title}</DialogTitle>
              <DialogDescription>
                Sent on {selectedNotification.sentOn}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <Badge
                  className={`${
                    selectedNotification.status === "Sent" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedNotification.status}
                </Badge>
                {selectedNotification.status === "Sent" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Read Rate:</span>
                    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${Math.round((selectedNotification.read / selectedNotification.sentTo) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm">
                      {Math.round((selectedNotification.read / selectedNotification.sentTo) * 100)}%
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <Label className="text-xs text-gray-500">Target Recipients</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNotification.target.split(", ").map((target: string) => (
                    <Badge key={target} variant="outline" className="bg-blue-50">
                      {target}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-500">Message</Label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">
                  {selectedNotification.message}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Sent To</Label>
                  <p className="text-sm font-medium">{selectedNotification.sentTo} recipients</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Read By</Label>
                  <p className="text-sm font-medium">
                    {selectedNotification.status === "Sent" 
                      ? `${selectedNotification.read} recipients` 
                      : "Not sent yet"}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
              <Button 
                onClick={() => {
                  handleUseTemplate({
                    title: selectedNotification.title,
                    message: selectedNotification.message
                  })
                  setShowViewDialog(false)
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Use as Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedNotification && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the notification "{selectedNotification.title}"? This action cannot be undone.
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

      {/* Create Template Dialog */}
      <Dialog open={showCreateTemplateDialog} onOpenChange={setShowCreateTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Notification Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for notifications. Use placeholders like [DATE], [TIME], etc. that can be replaced when using the template.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-title" className="text-right">
                Template Title
              </Label>
              <Input
                id="template-title"
                placeholder="e.g., Fee Payment Reminder"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-category" className="text-right">
                Category
              </Label>
              <Select defaultValue="general">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="fee">Fee</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="template-message" className="text-right pt-2">
                Message
              </Label>
              <div className="col-span-3">
                <textarea
                  id="template-message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter template message with placeholders like [DATE], [TIME], [CLASS], etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available placeholders: [DATE], [TIME], [CLASSES], [EXAM_NAME], [EVENT_NAME], [VENUE], [REASON], [RESUME_DATE]
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateTemplateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateTemplateDialog(false)}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}