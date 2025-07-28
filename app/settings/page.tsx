"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { 
  Building, Calendar, ToggleLeft, Lock, 
  Upload, Phone, Mail, Globe, MapPin, 
  Save, Eye, EyeOff, Palette, Check
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Sample color themes
const colorThemes = [
  { id: "blue", name: "Blue (Default)", primary: "#3b82f6", secondary: "#60a5fa" },
  { id: "green", name: "Green", primary: "#10b981", secondary: "#34d399" },
  { id: "purple", name: "Purple", primary: "#8b5cf6", secondary: "#a78bfa" },
  { id: "red", name: "Red", primary: "#ef4444", secondary: "#f87171" },
  { id: "orange", name: "Orange", primary: "#f97316", secondary: "#fb923c" },
  { id: "teal", name: "Teal", primary: "#14b8a6", secondary: "#2dd4bf" },
  { id: "indigo", name: "Indigo", primary: "#6366f1", secondary: "#818cf8" },
  { id: "pink", name: "Pink", primary: "#ec4899", secondary: "#f472b6" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("school-info")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("blue")
  
  // School info state
  const [schoolName, setSchoolName] = useState("Bright Future International School")
  const [schoolAddress, setSchoolAddress] = useState("123 Education Street, Knowledge City, 560001")
  const [schoolPhone, setSchoolPhone] = useState("+91 9876543210")
  const [schoolEmail, setSchoolEmail] = useState("info@brightfutureschool.edu")
  const [schoolWebsite, setSchoolWebsite] = useState("www.brightfutureschool.edu")
  
  // Academic year state
  const [currentAcademicYear, setCurrentAcademicYear] = useState("2023-2024")
  const [academicYearStart, setAcademicYearStart] = useState("2023-04-01")
  const [academicYearEnd, setAcademicYearEnd] = useState("2024-03-31")
  
  // Feature toggles state
  const [feesEnabled, setFeesEnabled] = useState(true)
  const [marksEnabled, setMarksEnabled] = useState(true)
  const [attendanceEnabled, setAttendanceEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [onlineClassesEnabled, setOnlineClassesEnabled] = useState(false)
  const [libraryEnabled, setLibraryEnabled] = useState(true)
  const [transportEnabled, setTransportEnabled] = useState(false)
  const [hostelEnabled, setHostelEnabled] = useState(false)
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSaveSchoolInfo = () => {
    // In a real app, this would save to backend
    console.log("School info saved")
  }

  const handleSaveAcademicYear = () => {
    // In a real app, this would save to backend
    console.log("Academic year settings saved")
  }

  const handleSaveFeatureToggles = () => {
    // In a real app, this would save to backend
    console.log("Feature toggles saved")
  }

  const handleChangePassword = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match")
      return
    }
    
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    
    // In a real app, this would verify current password and update to new password
    console.log("Password changed successfully")
    
    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    // In a real app, this would apply the theme to the application
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="school-info" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            School Info
          </TabsTrigger>
          <TabsTrigger value="academic-year" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Academic Year
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center">
            <ToggleLeft className="mr-2 h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        {/* School Info Tab */}
        <TabsContent value="school-info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">School Information</CardTitle>
              <CardDescription>
                Update your school's basic information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="school-name" className="mb-2 block">
                    School Name
                  </Label>
                  <Input
                    id="school-name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="school-logo" className="mb-2 block">
                      School Logo
                    </Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center">
                        <img 
                          src="/placeholder-logo.png" 
                          alt="School Logo" 
                          className="max-h-16 max-w-16"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23d1d5db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 22V12C2 10.9 2.9 10 4 10H20C21.1 10 22 10.9 22 12V22H2Z'%3E%3C/path%3E%3Cpath d='M12 7V2'%3E%3C/path%3E%3Cpath d='M6 7V2H18V7'%3E%3C/path%3E%3Cpath d='M12 22V16'%3E%3C/path%3E%3Cpath d='M9 16H15'%3E%3C/path%3E%3C/svg%3E"
                          }}
                        />
                      </div>
                      <Button variant="outline" className="h-9">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 200x200px. Max file size: 2MB.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="school-favicon" className="mb-2 block">
                      Favicon
                    </Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <img 
                          src="/placeholder-favicon.png" 
                          alt="Favicon" 
                          className="max-h-8 max-w-8"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23d1d5db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 22V12C2 10.9 2.9 10 4 10H20C21.1 10 22 10.9 22 12V22H2Z'%3E%3C/path%3E%3Cpath d='M12 7V2'%3E%3C/path%3E%3Cpath d='M6 7V2H18V7'%3E%3C/path%3E%3Cpath d='M12 22V16'%3E%3C/path%3E%3Cpath d='M9 16H15'%3E%3C/path%3E%3C/svg%3E"
                          }}
                        />
                      </div>
                      <Button variant="outline" className="h-9">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 32x32px. Max file size: 1MB.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="school-address" className="mb-2 block">
                    Address
                  </Label>
                  <div className="flex">
                    <MapPin className="mr-2 h-4 w-4 mt-3 text-gray-500" />
                    <textarea
                      id="school-address"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="school-phone" className="mb-2 block">
                      Phone Number
                    </Label>
                    <div className="flex">
                      <Phone className="mr-2 h-4 w-4 mt-2.5 text-gray-500" />
                      <Input
                        id="school-phone"
                        value={schoolPhone}
                        onChange={(e) => setSchoolPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="school-email" className="mb-2 block">
                      Email Address
                    </Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 mt-2.5 text-gray-500" />
                      <Input
                        id="school-email"
                        type="email"
                        value={schoolEmail}
                        onChange={(e) => setSchoolEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="school-website" className="mb-2 block">
                      Website
                    </Label>
                    <div className="flex">
                      <Globe className="mr-2 h-4 w-4 mt-2.5 text-gray-500" />
                      <Input
                        id="school-website"
                        value={schoolWebsite}
                        onChange={(e) => setSchoolWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">
                    Theme Color
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {colorThemes.map(theme => (
                      <div 
                        key={theme.id} 
                        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer border ${selectedTheme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                        onClick={() => handleThemeChange(theme.id)}
                      >
                        <div 
                          className="h-6 w-6 rounded-full" 
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{theme.name}</p>
                        </div>
                        {selectedTheme === theme.id && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleSaveSchoolInfo}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Academic Year Tab */}
        <TabsContent value="academic-year" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Academic Year Settings</CardTitle>
              <CardDescription>
                Configure the current academic year and related settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-academic-year" className="mb-2 block">
                    Current Academic Year
                  </Label>
                  <Select value={currentAcademicYear} onValueChange={setCurrentAcademicYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="academic-year-start" className="mb-2 block">
                      Academic Year Start Date
                    </Label>
                    <Input
                      id="academic-year-start"
                      type="date"
                      value={academicYearStart}
                      onChange={(e) => setAcademicYearStart(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="academic-year-end" className="mb-2 block">
                      Academic Year End Date
                    </Label>
                    <Input
                      id="academic-year-end"
                      type="date"
                      value={academicYearEnd}
                      onChange={(e) => setAcademicYearEnd(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="term-structure" className="mb-2 block">
                    Term Structure
                  </Label>
                  <Select defaultValue="semester">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semester">Semester System (2 Terms)</SelectItem>
                      <SelectItem value="trimester">Trimester System (3 Terms)</SelectItem>
                      <SelectItem value="quarter">Quarter System (4 Terms)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="weekend-structure" className="mb-2 block">
                      Weekend Structure
                    </Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday Only</SelectItem>
                        <SelectItem value="saturday-sunday">Saturday & Sunday</SelectItem>
                        <SelectItem value="friday-saturday">Friday & Saturday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="class-duration" className="mb-2 block">
                      Default Class Duration
                    </Label>
                    <Select defaultValue="45">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Minutes</SelectItem>
                        <SelectItem value="40">40 Minutes</SelectItem>
                        <SelectItem value="45">45 Minutes</SelectItem>
                        <SelectItem value="60">60 Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">
                    Grading System
                  </Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Based</SelectItem>
                      <SelectItem value="gpa-4">GPA (4.0 Scale)</SelectItem>
                      <SelectItem value="gpa-10">GPA (10.0 Scale)</SelectItem>
                      <SelectItem value="letter">Letter Grades (A, B, C, D, F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleSaveAcademicYear}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Features Tab */}
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Feature Toggles</CardTitle>
              <CardDescription>
                Enable or disable specific features of the school management system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Fee Management</h3>
                          <p className="text-sm text-gray-500">Enable fee collection and tracking</p>
                        </div>
                        <Switch 
                          checked={feesEnabled} 
                          onCheckedChange={setFeesEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Examination & Marks</h3>
                          <p className="text-sm text-gray-500">Enable exam scheduling and marks entry</p>
                        </div>
                        <Switch 
                          checked={marksEnabled} 
                          onCheckedChange={setMarksEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Attendance Tracking</h3>
                          <p className="text-sm text-gray-500">Enable student and staff attendance</p>
                        </div>
                        <Switch 
                          checked={attendanceEnabled} 
                          onCheckedChange={setAttendanceEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Notifications</h3>
                          <p className="text-sm text-gray-500">Enable in-app and email notifications</p>
                        </div>
                        <Switch 
                          checked={notificationsEnabled} 
                          onCheckedChange={setNotificationsEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Online Classes</h3>
                          <p className="text-sm text-gray-500">Enable virtual classroom integration</p>
                        </div>
                        <Switch 
                          checked={onlineClassesEnabled} 
                          onCheckedChange={setOnlineClassesEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Library Management</h3>
                          <p className="text-sm text-gray-500">Enable library book tracking</p>
                        </div>
                        <Switch 
                          checked={libraryEnabled} 
                          onCheckedChange={setLibraryEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Transport Management</h3>
                          <p className="text-sm text-gray-500">Enable bus routes and tracking</p>
                        </div>
                        <Switch 
                          checked={transportEnabled} 
                          onCheckedChange={setTransportEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Hostel Management</h3>
                          <p className="text-sm text-gray-500">Enable hostel room allocation</p>
                        </div>
                        <Switch 
                          checked={hostelEnabled} 
                          onCheckedChange={setHostelEnabled} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleSaveFeatureToggles}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium">Change Admin Password</h3>
                <Separator className="my-2" />
                
                <div>
                  <Label htmlFor="current-password" className="mb-2 block">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="new-password" className="mb-2 block">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="confirm-password" className="mb-2 block">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleChangePassword}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
                
                <h3 className="text-md font-medium mt-6">Login Security</h3>
                <Separator className="my-2" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-gray-500">Get notified of new logins to your account</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}