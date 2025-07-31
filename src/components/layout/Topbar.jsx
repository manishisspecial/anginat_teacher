'use client'
// app/components/Topbar.jsx
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Topbar() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // State for notifications
  const [notifications, setNotifications] = useState([])
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("")

  // Refs for handling clicks outside
  const dropdownRef = useRef(null)
  const notificationsRef = useRef(null)

  // Sample notifications
  const SAMPLE_NOTIFICATIONS = [
    // Add your notifications here
  ]

  // Load notifications on component mount
  useEffect(() => {
    setNotifications(SAMPLE_NOTIFICATIONS)
  }, [])

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Navigation handlers
  const handleLogout = () => {
    logout() // This will redirect to login automatically
    setShowDropdown(false)
  }

  const handleProfileClick = () => {
    router.push('/profile')
    setShowDropdown(false)
  }

  // Toggle functions
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    if (showNotifications) setShowNotifications(false)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showDropdown) setShowDropdown(false)
  }

  // Search handlers
  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Implement search functionality here
      console.log('Searching for:', searchQuery)
      // You can navigate to a search results page or show a modal
      // For now, we'll just log the search query
    }
  }

  // Utility functions
  const getUserInitials = () => {
    if (!user) return "AN"
    
    // Get initials from username first, then email
    if (user.username) {
      if (user.username.length >= 2) {
        return user.username.substring(0, 2).toUpperCase()
      } else {
        return user.username.toUpperCase()
      }
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return "AN"
  }

  const getDisplayName = () => {
    if (!user) return "Teacher"
    
    // Use username first, then fall back to email prefix
    if (user.username) {
      return user.username
    } else if (user.email) {
      return user.email.split("@")[0]
    }
    return "Teacher"
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Don't render topbar if user is not authenticated
  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="flex flex-col items-start gap-2.5 px-2 sm:px-4 md:px-6 py-3 relative bg-white border-b border-gray-300 top-0 sticky z-50 h-[62px]">
      <div className="flex w-full justify-between flex-[0_0_auto] items-center relative">
        {/* Logo section */}
        <div className="inline-flex gap-2 md:gap-[68px] flex-[0_0_auto] items-center relative">
          <div
            className="relative w-[100px] sm:w-[130px] h-8 rounded cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <div className="w-full h-full bg-blue-200 rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs sm:text-sm">ANGINAT</span>
            </div>
          </div>
        </div>

        {/* Search bar - enabled */}
        <div className="hidden md:flex w-full max-w-[385px] justify-around gap-1 px-4 py-2 self-stretch bg-white rounded-[100px] border border-gray-300 hover:border-gray-400 transition-colors">
          <input
            type="text"
            placeholder="Search courses, users, reports..."
            className="relative flex-1 text-gray-700 text-sm bg-white outline-none"
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div 
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            onClick={handleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Mobile search icon - enabled */}
        <div className="md:hidden">
          <div 
            className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          {/* Mobile search input */}
          {showMobileSearch && (
            <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search courses, users, reports..."
                  className="flex-1 text-gray-700 text-sm bg-white outline-none"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User section */}
        <div className="inline-flex gap-2 sm:gap-6 flex-[0_0_auto] items-center relative">
          {/* Notification bell */}
          <div
            className="relative w-8 h-8 bg-blue-100 rounded flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
            onClick={toggleNotifications}
            ref={notificationsRef}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {unreadCount > 0 && (
              <div className="absolute w-4 h-4 top-0 right-0 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {unreadCount}
              </div>
            )}

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-10 w-72 sm:w-80 bg-white rounded-md shadow-lg z-50 py-2 border border-gray-200 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              </div>
            )}
          </div>

          {/* User profile with dropdown */}
          <div className="flex gap-2 items-center relative" ref={dropdownRef}>
            {/* Avatar - simplified version that always shows initials */}
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
                {getUserInitials()}
              </div>
            </div>

            {/* Username and dropdown */}
            <div className="relative">
              <div
                className="inline-flex gap-1 items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="hidden sm:block font-medium text-sm text-gray-800">
                  {getDisplayName()}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      router.push('/profile/change-password')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                  >
                    Fees Payment
                  </button>
                  <button
                    onClick={() => {
                      router.push('/profile/certificates')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Certificates
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                  >
                    Referrals
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}