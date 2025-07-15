'use client'
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import TabDropdown from "../TabDropdown"

// Teacher-specific navigation configuration
const TEACHER_NAVIGATION_TABS = [
  {
    id: 'teacher',
    name: 'Dashboard',
    hasDropdown: false,
    hidden: false,
    disabled: false
  },
  {
    id: 'classes',
    name: 'Classes',
    hasDropdown: true,
    hidden: false,
    disabled: false
  },
  {
    id: 'students',
    name: 'Students',
    hasDropdown: true,
    hidden: false,
    disabled: false
  },
  {
    id: 'attendance',
    name: 'Attendance',
    hasDropdown: false,
    hidden: false,
    disabled: false
  },
  {
    id: 'assignments',
    name: 'Assignments',
    hasDropdown: true,
    hidden: false,
    disabled: false
  },
  {
    id: 'grades',
    name: 'Grades',
    hasDropdown: false,
    hidden: false,
    disabled: false
  },
  {
    id: 'schedule',
    name: 'Schedule',
    hasDropdown: false,
    hidden: false,
    disabled: false
  },
  {
    id: 'reports',
    name: 'Reports',
    hasDropdown: true,
    hidden: false,
    disabled: false
  }
]

// Navigation options for dropdown tabs
const getTeacherNavigationOptions = (tabId) => {
  switch (tabId) {
    case 'classes':
      return [
        { name: 'My Classes', path: '/teacher/classes', disabled: false },
        { name: 'Class Schedule', path: '/teacher/classes/schedule', disabled: false },
        { name: 'Class Materials', path: '/teacher/classes/materials', disabled: false }
      ]
    case 'students':
      return [
        { name: 'My Students', path: '/teacher/students', disabled: false },
        { name: 'Student Performance', path: '/teacher/students/performance', disabled: false },
        { name: 'Student Attendance', path: '/teacher/students/attendance', disabled: false }
      ]
    case 'assignments':
      return [
        { name: 'Create Assignment', path: '/teacher/assignments/create', disabled: false },
        { name: 'View Assignments', path: '/teacher/assignments', disabled: false },
        { name: 'Grade Assignments', path: '/teacher/assignments/grade', disabled: false }
      ]
    case 'reports':
      return [
        { name: 'Attendance Report', path: '/teacher/reports/attendance', disabled: false },
        { name: 'Performance Report', path: '/teacher/reports/performance', disabled: false },
        { name: 'Grade Report', path: '/teacher/reports/grades', disabled: false }
      ]
    default:
      return []
  }
}

export default function TeacherNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // State management
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState(null)

  // Filter visible tabs
  const visibleTabs = TEACHER_NAVIGATION_TABS.filter(tab => !tab.hidden)

  // Get current active tab from pathname
  const getCurrentTab = () => {
    // For teacher dashboard - only highlight if exactly on /teacher
    if (pathname === '/teacher') {
      return 'teacher'
    }
    
    // For classes routes - highlight if path starts with /teacher/classes
    if (pathname.startsWith('/teacher/classes')) {
      return 'classes'
    }
    
    // For students routes - highlight if path starts with /teacher/students
    if (pathname.startsWith('/teacher/students')) {
      return 'students'
    }
    
    // For attendance routes - highlight if path starts with /teacher/attendance
    if (pathname.startsWith('/teacher/attendance')) {
      return 'attendance'
    }
    
    // For assignments routes - highlight if path starts with /teacher/assignments
    if (pathname.startsWith('/teacher/assignments')) {
      return 'assignments'
    }
    
    // For grades routes - highlight if path starts with /teacher/grades
    if (pathname.startsWith('/teacher/grades')) {
      return 'grades'
    }
    
    // For schedule routes - highlight if path starts with /teacher/schedule
    if (pathname.startsWith('/teacher/schedule')) {
      return 'schedule'
    }
    
    // For reports routes - highlight if path starts with /teacher/reports
    if (pathname.startsWith('/teacher/reports')) {
      return 'reports'
    }
    
    // If no match found, return null (no tab highlighted)
    return null
  }

  const activeTab = getCurrentTab()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick = event.target.closest('.dropdown-container')
      const isTabClick = event.target.closest('.tab-item')
      const isMobileMenuClick = event.target.closest('.mobile-menu-button')
      const isMobileMenuOption = event.target.closest('.mobile-menu-option')
      
      if (!isDropdownClick && !isTabClick && !isMobileMenuClick && !isMobileMenuOption) {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
        setMobileExpandedDropdown(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when pathname changes (user navigates to new page)
  useEffect(() => {
    setOpenDropdown(null)
    setMobileMenuOpen(false)
    setMobileExpandedDropdown(null)
  }, [pathname])

  // Handle tab click
  const handleTabClick = (tab) => {
    // Don't do anything if tab is disabled
    if (tab.disabled) return
    
    if (tab.hasDropdown) {
      // Toggle dropdown - close if already open, open if closed
      setOpenDropdown(openDropdown === tab.id ? null : tab.id)
    } else {
      // For non-dropdown tabs, close any open dropdown and navigate
      setOpenDropdown(null)
      router.push(`/teacher/${tab.id}`)
    }
    setMobileMenuOpen(false)
  }

  // Handle dropdown navigation
  const handleDropdownNavigation = (option) => {
    if (option.disabled) return
    
    // Close dropdown immediately when option is clicked
    setOpenDropdown(null)
    setMobileMenuOpen(false)
    setMobileExpandedDropdown(null)
    
    // Navigate to the selected option
    router.push(option.path)
  }

  // Get dropdown options
  const getDropdownOptions = (tabId) => {
    return getTeacherNavigationOptions(tabId)
  }

  // Mobile handlers
  const toggleMobileMenu = (e) => {
    e.stopPropagation()
    setMobileMenuOpen(!mobileMenuOpen)
    setOpenDropdown(null)
    setMobileExpandedDropdown(null)
  }

  const handleMobileMenuItemClick = (e, tab) => {
    e.stopPropagation()
    
    if (tab.disabled) return
    
    if (tab.hasDropdown) {
      setMobileExpandedDropdown(mobileExpandedDropdown === tab.id ? null : tab.id)
    } else {
      setMobileMenuOpen(false)
      router.push(`/teacher/${tab.id}`)
    }
  }

  const handleMobileDropdownOptionClick = (e, option) => {
    e.stopPropagation()
    handleDropdownNavigation(option)
  }

  // Get active tab label for mobile - handle null activeTab
  const activeTabLabel = activeTab ? visibleTabs.find(tab => tab.id === activeTab)?.name : "Menu"

  return (
    <div className="relative sticky top-[62px] z-10">
      {/* Desktop view */}
      <div className="hidden md:flex items-center gap-2 lg:gap-6 px-2 lg:px-4 border-b border-gray-200 bg-white shadow-md overflow-x-auto">
        {visibleTabs.map((tab) => (
          <div 
            key={tab.id}
            className={`tab-item py-3 py-4 px-2 relative whitespace-nowrap ${
              tab.disabled 
                ? "cursor-not-allowed text-gray-400" 
                : activeTab === tab.id 
                  ? "text-blue-600 cursor-pointer" 
                  : "text-gray-700 hover:text-gray-900 cursor-pointer"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <div className="flex items-center">
              <span className="font-medium text-sm">{tab.name}</span>
              {tab.hasDropdown && !tab.disabled && (
                <svg 
                  className={`ml-1 w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 ${openDropdown === tab.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {tab.disabled && <span className="text-xs ml-1">(soon)</span>}
            </div>
            {activeTab === tab.id && !tab.disabled && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white shadow-md">
        <div className={`font-medium ${activeTab ? 'text-blue-600' : 'text-gray-700'}`}>
          {activeTabLabel}
        </div>
        <button 
          className="mobile-menu-button p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            {visibleTabs.map((tab) => (
              <div key={tab.id}>
                <div
                  className={`mobile-menu-option flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    tab.disabled 
                      ? "text-gray-400 cursor-not-allowed" 
                      : activeTab === tab.id 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={(e) => handleMobileMenuItemClick(e, tab)}
                >
                  <span className="font-medium text-sm">{tab.name}</span>
                  {tab.hasDropdown && !tab.disabled && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${mobileExpandedDropdown === tab.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {tab.disabled && <span className="text-xs">(soon)</span>}
                </div>
                
                {/* Mobile dropdown options */}
                {tab.hasDropdown && mobileExpandedDropdown === tab.id && !tab.disabled && (
                  <div className="ml-4 space-y-1">
                    {getDropdownOptions(tab.id).map((option, index) => (
                      <div
                        key={index}
                        className={`mobile-menu-option p-3 rounded-md cursor-pointer ${
                          option.disabled 
                            ? "text-gray-400 cursor-not-allowed" 
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={(e) => handleMobileDropdownOptionClick(e, option)}
                      >
                        <span className="text-sm">{option.name}</span>
                        {option.disabled && <span className="text-xs ml-1">(soon)</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop dropdowns */}
      {visibleTabs.map((tab) => (
        tab.hasDropdown && openDropdown === tab.id && !tab.disabled && (
          <TabDropdown
            key={tab.id}
            options={getDropdownOptions(tab.id)}
            onOptionClick={handleDropdownNavigation}
            className="dropdown-container"
          />
        )
      ))}
    </div>
  )
} 