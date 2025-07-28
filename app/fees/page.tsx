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
  PlusCircle, Search, Download, Send, 
  Filter, Calendar, DollarSign, CheckCircle2, 
  XCircle, AlertCircle, BarChart3, PieChart
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell
} from "recharts"

// Sample fee structure data
const feeStructureData = [
  { 
    id: 1, 
    className: "Class 8-A", 
    tuitionFee: 25000, 
    libraryFee: 2000, 
    sportsFee: 3000, 
    computerFee: 5000, 
    examFee: 2500, 
    totalFee: 37500 
  },
  { 
    id: 2, 
    className: "Class 9-A", 
    tuitionFee: 27000, 
    libraryFee: 2000, 
    sportsFee: 3000, 
    computerFee: 5000, 
    examFee: 2500, 
    totalFee: 39500 
  },
  { 
    id: 3, 
    className: "Class 9-B", 
    tuitionFee: 27000, 
    libraryFee: 2000, 
    sportsFee: 3000, 
    computerFee: 5000, 
    examFee: 2500, 
    totalFee: 39500 
  },
  { 
    id: 4, 
    className: "Class 10-A", 
    tuitionFee: 30000, 
    libraryFee: 2500, 
    sportsFee: 3500, 
    computerFee: 6000, 
    examFee: 3000, 
    totalFee: 45000 
  },
  { 
    id: 5, 
    className: "Class 10-B", 
    tuitionFee: 30000, 
    libraryFee: 2500, 
    sportsFee: 3500, 
    computerFee: 6000, 
    examFee: 3000, 
    totalFee: 45000 
  },
  { 
    id: 6, 
    className: "Class 11-A (Science)", 
    tuitionFee: 35000, 
    libraryFee: 3000, 
    sportsFee: 4000, 
    computerFee: 7000, 
    examFee: 3500, 
    totalFee: 52500 
  },
  { 
    id: 7, 
    className: "Class 11-B (Commerce)", 
    tuitionFee: 32000, 
    libraryFee: 3000, 
    sportsFee: 4000, 
    computerFee: 6000, 
    examFee: 3500, 
    totalFee: 48500 
  },
  { 
    id: 8, 
    className: "Class 12-A (Science)", 
    tuitionFee: 38000, 
    libraryFee: 3000, 
    sportsFee: 4000, 
    computerFee: 7000, 
    examFee: 4000, 
    totalFee: 56000 
  },
]

// Sample payment status data
const paymentStatusData = [
  { 
    id: 1, 
    studentName: "John Smith", 
    rollNumber: "R001", 
    className: "Class 10-A", 
    feeAmount: 45000, 
    paidAmount: 45000, 
    dueAmount: 0, 
    status: "Paid", 
    lastPaymentDate: "15 Jul, 2023" 
  },
  { 
    id: 2, 
    studentName: "Emily Johnson", 
    rollNumber: "R002", 
    className: "Class 10-A", 
    feeAmount: 45000, 
    paidAmount: 30000, 
    dueAmount: 15000, 
    status: "Partial", 
    lastPaymentDate: "10 Aug, 2023" 
  },
  { 
    id: 3, 
    studentName: "David Williams", 
    rollNumber: "R003", 
    className: "Class 9-A", 
    feeAmount: 39500, 
    paidAmount: 39500, 
    dueAmount: 0, 
    status: "Paid", 
    lastPaymentDate: "05 Jul, 2023" 
  },
  { 
    id: 4, 
    studentName: "Sarah Brown", 
    rollNumber: "R004", 
    className: "Class 9-A", 
    feeAmount: 39500, 
    paidAmount: 0, 
    dueAmount: 39500, 
    status: "Unpaid", 
    lastPaymentDate: "--" 
  },
  { 
    id: 5, 
    studentName: "Michael Davis", 
    rollNumber: "R005", 
    className: "Class 8-A", 
    feeAmount: 37500, 
    paidAmount: 37500, 
    dueAmount: 0, 
    status: "Paid", 
    lastPaymentDate: "20 Jul, 2023" 
  },
  { 
    id: 6, 
    studentName: "Jessica Miller", 
    rollNumber: "R006", 
    className: "Class 11-A (Science)", 
    feeAmount: 52500, 
    paidAmount: 25000, 
    dueAmount: 27500, 
    status: "Partial", 
    lastPaymentDate: "12 Aug, 2023" 
  },
  { 
    id: 7, 
    studentName: "Daniel Wilson", 
    rollNumber: "R007", 
    className: "Class 11-B (Commerce)", 
    feeAmount: 48500, 
    paidAmount: 48500, 
    dueAmount: 0, 
    status: "Paid", 
    lastPaymentDate: "08 Jul, 2023" 
  },
  { 
    id: 8, 
    studentName: "Olivia Moore", 
    rollNumber: "R008", 
    className: "Class 12-A (Science)", 
    feeAmount: 56000, 
    paidAmount: 40000, 
    dueAmount: 16000, 
    status: "Partial", 
    lastPaymentDate: "25 Jul, 2023" 
  },
  { 
    id: 9, 
    studentName: "James Taylor", 
    rollNumber: "R009", 
    className: "Class 10-B", 
    feeAmount: 45000, 
    paidAmount: 0, 
    dueAmount: 45000, 
    status: "Unpaid", 
    lastPaymentDate: "--" 
  },
  { 
    id: 10, 
    studentName: "Sophia Anderson", 
    rollNumber: "R010", 
    className: "Class 9-B", 
    feeAmount: 39500, 
    paidAmount: 39500, 
    dueAmount: 0, 
    status: "Paid", 
    lastPaymentDate: "18 Jul, 2023" 
  },
]

// Sample UPI transaction data
const upiTransactionData = [
  { 
    id: "TXN001", 
    studentName: "John Smith", 
    amount: 15000, 
    transactionDate: "15 Jul, 2023", 
    upiId: "john.smith@okbank", 
    status: "Success", 
    reference: "REF123456" 
  },
  { 
    id: "TXN002", 
    studentName: "Emily Johnson", 
    amount: 10000, 
    transactionDate: "10 Aug, 2023", 
    upiId: "emily.j@yesbank", 
    status: "Success", 
    reference: "REF234567" 
  },
  { 
    id: "TXN003", 
    studentName: "David Williams", 
    amount: 39500, 
    transactionDate: "05 Jul, 2023", 
    upiId: "david.w@okbank", 
    status: "Success", 
    reference: "REF345678" 
  },
  { 
    id: "TXN004", 
    studentName: "Michael Davis", 
    amount: 37500, 
    transactionDate: "20 Jul, 2023", 
    upiId: "michael.d@yesbank", 
    status: "Success", 
    reference: "REF456789" 
  },
  { 
    id: "TXN005", 
    studentName: "Jessica Miller", 
    amount: 25000, 
    transactionDate: "12 Aug, 2023", 
    upiId: "jessica.m@okbank", 
    status: "Success", 
    reference: "REF567890" 
  },
  { 
    id: "TXN006", 
    studentName: "Daniel Wilson", 
    amount: 48500, 
    transactionDate: "08 Jul, 2023", 
    upiId: "daniel.w@yesbank", 
    status: "Success", 
    reference: "REF678901" 
  },
  { 
    id: "TXN007", 
    studentName: "Olivia Moore", 
    amount: 40000, 
    transactionDate: "25 Jul, 2023", 
    upiId: "olivia.m@okbank", 
    status: "Success", 
    reference: "REF789012" 
  },
  { 
    id: "TXN008", 
    studentName: "Sophia Anderson", 
    amount: 39500, 
    transactionDate: "18 Jul, 2023", 
    upiId: "sophia.a@yesbank", 
    status: "Success", 
    reference: "REF890123" 
  },
  { 
    id: "TXN009", 
    studentName: "James Taylor", 
    amount: 20000, 
    transactionDate: "22 Aug, 2023", 
    upiId: "james.t@okbank", 
    status: "Failed", 
    reference: "REF901234" 
  },
  { 
    id: "TXN010", 
    studentName: "Emma Wilson", 
    amount: 35000, 
    transactionDate: "30 Jul, 2023", 
    upiId: "emma.w@yesbank", 
    status: "Success", 
    reference: "REF012345" 
  },
]

// Sample monthly collection data for chart
const monthlyCollectionData = [
  { month: "Jan", amount: 320000 },
  { month: "Feb", amount: 280000 },
  { month: "Mar", amount: 250000 },
  { month: "Apr", amount: 300000 },
  { month: "May", amount: 270000 },
  { month: "Jun", amount: 290000 },
  { month: "Jul", amount: 350000 },
  { month: "Aug", amount: 380000 },
  { month: "Sep", amount: 0 },
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
]

// Sample fee status data for pie chart
const feeStatusData = [
  { name: "Paid", value: 60, color: "#4ade80" },
  { name: "Partial", value: 25, color: "#facc15" },
  { name: "Unpaid", value: 15, color: "#f87171" },
]

// Sample classes for filter
const classes = [
  "All Classes",
  "Class 8-A",
  "Class 9-A",
  "Class 9-B",
  "Class 10-A",
  "Class 10-B",
  "Class 11-A (Science)",
  "Class 11-B (Commerce)",
  "Class 12-A (Science)"
]

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState("fee-structure")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showReminderDialog, setShowReminderDialog] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [showEditFeeDialog, setShowEditFeeDialog] = useState(false)
  const [selectedFeeStructure, setSelectedFeeStructure] = useState<any>(null)
  
  // Filter payment status data based on search term, class and status
  const filteredPaymentData = paymentStatusData.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClass = 
      selectedClass === "All Classes" || payment.className === selectedClass
    
    const matchesStatus = 
      selectedStatus === "All" || payment.status === selectedStatus
    
    return matchesSearch && matchesClass && matchesStatus
  })

  const handleSelectStudent = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }  
  }

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === filteredPaymentData.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredPaymentData.map(student => student.id))
    }
  }

  const handleEditFeeStructure = (feeStructure: any) => {
    setSelectedFeeStructure(feeStructure)
    setShowEditFeeDialog(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Fee Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="fee-structure" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Fee Structure
          </TabsTrigger>
          <TabsTrigger value="payment-status" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Payment Status
          </TabsTrigger>
          <TabsTrigger value="upi-log" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            UPI Log
          </TabsTrigger>
        </TabsList>
        
        {/* Fee Structure Tab */}
        <TabsContent value="fee-structure" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search class..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Fee Structure
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-right">Tuition Fee</TableHead>
                    <TableHead className="text-right">Library Fee</TableHead>
                    <TableHead className="text-right">Sports Fee</TableHead>
                    <TableHead className="text-right">Computer Fee</TableHead>
                    <TableHead className="text-right">Exam Fee</TableHead>
                    <TableHead className="text-right">Total Fee</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructureData
                    .filter(fee => fee.className.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.className}</TableCell>
                      <TableCell className="text-right">₹{fee.tuitionFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{fee.libraryFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{fee.sportsFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{fee.computerFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{fee.examFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">₹{fee.totalFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleEditFeeStructure(fee)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Status Tab */}
        <TabsContent value="payment-status" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Fee Collection
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹28,50,000</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Collected Amount
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹17,10,000</div>
                <p className="text-xs text-muted-foreground">
                  60% of total fee
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Amount
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹11,40,000</div>
                <p className="text-xs text-muted-foreground">
                  40% of total fee
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Students with Due
                </CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">
                  40% of total students
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Monthly Collection Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `₹${value / 1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        name="Collection Amount"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Fee Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="70%">
                    <RechartsPieChart>
                      <Pie
                        data={feeStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {feeStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, '']}
                        labelFormatter={(label) => `${label}`}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-6">
                    {feeStatusData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="h-3 w-3 rounded-full mr-2"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm">{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search student..."
                  className="pl-10 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="h-9"
                disabled={selectedStudents.length === 0}
                onClick={() => setShowReminderDialog(true)}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
              <Button 
                variant="outline" 
                className="h-9"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedStudents.length === filteredPaymentData.length && filteredPaymentData.length > 0}
                        onChange={handleSelectAllStudents}
                      />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-right">Fee Amount</TableHead>
                    <TableHead className="text-right">Paid Amount</TableHead>
                    <TableHead className="text-right">Due Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaymentData.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedStudents.includes(payment.id)}
                          onChange={() => handleSelectStudent(payment.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.studentName}</p>
                          <p className="text-sm text-gray-500">{payment.rollNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{payment.className}</TableCell>
                      <TableCell className="text-right">₹{payment.feeAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{payment.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">
                        {payment.dueAmount > 0 ? `₹${payment.dueAmount.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            payment.status === "Paid" 
                              ? "bg-green-100 text-green-800" 
                              : payment.status === "Partial" 
                                ? "bg-amber-100 text-amber-800" 
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.lastPaymentDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* UPI Log Tab */}
        <TabsContent value="upi-log" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="h-9"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>UPI ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upiTransactionData
                    .filter(transaction => 
                      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.studentName}</TableCell>
                      <TableCell className="text-right">₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>{transaction.transactionDate}</TableCell>
                      <TableCell>{transaction.upiId}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            transaction.status === "Success" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Send Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Fee Reminder</DialogTitle>
            <DialogDescription>
              Send payment reminder to {selectedStudents.length} selected student{selectedStudents.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder-subject" className="text-right">
                Subject
              </Label>
              <Input
                id="reminder-subject"
                defaultValue="Fee Payment Reminder"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="reminder-message" className="text-right pt-2">
                Message
              </Label>
              <div className="col-span-3">
                <textarea
                  id="reminder-message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="This is a reminder that your school fee payment is due. Please make the payment at your earliest convenience to avoid any late fees. If you have already made the payment, please ignore this message."
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder-method" className="text-right">
                Send via
              </Label>
              <Select defaultValue="both">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="both">Both Email & SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowReminderDialog(false)}
            >
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Fee Structure Dialog */}
      {selectedFeeStructure && (
        <Dialog open={showEditFeeDialog} onOpenChange={setShowEditFeeDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Fee Structure</DialogTitle>
              <DialogDescription>
                Update fee structure for {selectedFeeStructure.className}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tuition-fee" className="text-right">
                  Tuition Fee
                </Label>
                <Input
                  id="tuition-fee"
                  type="number"
                  defaultValue={selectedFeeStructure.tuitionFee}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="library-fee" className="text-right">
                  Library Fee
                </Label>
                <Input
                  id="library-fee"
                  type="number"
                  defaultValue={selectedFeeStructure.libraryFee}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sports-fee" className="text-right">
                  Sports Fee
                </Label>
                <Input
                  id="sports-fee"
                  type="number"
                  defaultValue={selectedFeeStructure.sportsFee}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="computer-fee" className="text-right">
                  Computer Fee
                </Label>
                <Input
                  id="computer-fee"
                  type="number"
                  defaultValue={selectedFeeStructure.computerFee}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exam-fee" className="text-right">
                  Exam Fee
                </Label>
                <Input
                  id="exam-fee"
                  type="number"
                  defaultValue={selectedFeeStructure.examFee}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditFeeDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => setShowEditFeeDialog(false)}
              >
                Update Fee Structure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}