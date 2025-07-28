"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  GraduationCap as ExamIcon,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: GraduationCap, label: "Teachers", path: "/teachers" },
  { icon: BookOpen, label: "Classes", path: "/classes" },
  { icon: CalendarDays, label: "Timetable", path: "/timetable" },
  { icon: ExamIcon, label: "Exams & Marks", path: "/exams" },
  { icon: DollarSign, label: "Fee Management", path: "/fees" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: LogOut, label: "Logout", path: "/logout" },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 h-full",
          isOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and collapse toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-2 text-xl font-bold text-gray-900">Educo</span>}
            </div>
            
            {/* Toggle button - visible only on desktop */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCollapsed(!collapsed)} 
              className="hidden lg:flex"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            
            {/* Close button - visible only on mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className={cn("flex-1 py-6 space-y-1 overflow-y-auto", collapsed ? "px-2" : "px-4")}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link href={item.path} key={index} onClick={handleItemClick}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full transition-all duration-200",
                      collapsed ? "justify-center px-2" : "justify-start px-3 space-x-3",
                      isActive 
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <item.icon className={cn("flex-shrink-0", collapsed ? "w-6 h-6" : "w-5 h-5")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>
          
          {/* User profile section */}
          <div className={cn(
            "p-4 border-t border-gray-100 flex items-center", 
            collapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@school.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  )
}
