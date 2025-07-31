'use client'
// components/layout/ActiveTab.jsx
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import TabDropdown from "./TabDropdown"
import UnifiedNavigation from "./navigation/UnifiedNavigation"
import { 
  NAVIGATION_TABS, 
  getNavigationType, 
  getNavigationOptions, 
  shouldShowNavigation 
} from '../config/routeConfig'

export default function ActiveTab() {
  const router = useRouter()
  const pathname = usePathname()

  // State management
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState(null)

  // Filter visible tabs
  const visibleTabs = NAVIGATION_TABS.filter(tab => !tab.hidden)

  // Get current active tab from pathname
  const getCurrentTab = () => {
    // For dashboard - only highlight if exactly on /dashboard
    if (pathname === '/dashboard') {
      return 'dashboard'
    }
    
    // For academic routes - highlight if path starts with /academic
    if (pathname.startsWith('/academic')) {
      return 'academic'
    }
    
    // For Chat routes - highlight if path starts with /chat
    if (pathname.startsWith('/chat')) {
      return 'chat'
    }
    
    // For users routes - highlight if path starts with /users
    if (pathname.startsWith('/users')) {
      return 'users'
    }
    
    // For reports routes - highlight if path starts with /reports
    if (pathname.startsWith('/reports')) {
      return 'reports'
    }
    
    // For announcements routes - highlight if path starts with /announcements
    if (pathname.startsWith('/announcements')) {
      return 'announcements'
    }
    
    // For accounts routes - highlight if path starts with /accounts
    if (pathname.startsWith('/accounts')) {
      return 'accounts'
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

  // Additional effect to ensure mobile menu is closed on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false)
      setMobileExpandedDropdown(null)
    }
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

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
      router.push(`/${tab.id}`)
    }
    setMobileMenuOpen(false)
  }

  // Handle dropdown navigation - Unified for all navigation types
  const handleDropdownNavigation = (option) => {
    if (option.disabled) return
    
    console.log('handleDropdownNavigation called with:', option)
    
    // Close dropdown immediately when option is clicked
    setOpenDropdown(null)
    setMobileMenuOpen(false)
    setMobileExpandedDropdown(null)
    
    // Navigate immediately without delay
    console.log('Navigating to:', option.path)
    
    // Use Next.js router for proper client-side navigation
    router.push(option.path)
  }

  // Get dropdown options using unified system
  const getDropdownOptions = (tabId) => {
    const options = getNavigationOptions(tabId)
    console.log(`getDropdownOptions for ${tabId}:`, options)
    return options
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
    console.log('Mobile menu item clicked:', tab)
    
    if (tab.disabled) return
    
    if (tab.hasDropdown) {
      console.log('Expanding dropdown for:', tab.id)
      // Toggle the dropdown expansion without closing the mobile menu
      setMobileExpandedDropdown(mobileExpandedDropdown === tab.id ? null : tab.id)
      // Don't close the mobile menu when expanding dropdowns
    } else {
      console.log('Navigating for non-dropdown item:', tab.id)
      // Only close mobile menu for non-dropdown items
      setMobileMenuOpen(false)
      // Navigate to the appropriate route based on tab ID using proper navigation
      let targetPath = '/dashboard'
      switch (tab.id) {
        case 'dashboard':
          targetPath = '/dashboard'
          break
        case 'users':
          // Get the first available users option
          const usersOptions = getNavigationOptions('users')
          targetPath = usersOptions.length > 0 ? usersOptions[0].path : '/users/students'
          break
        case 'academic':
          // Get the first available academic option
          const academicOptions = getNavigationOptions('academic')
          targetPath = academicOptions.length > 0 ? academicOptions[0].path : '/academic/classes'
          break
        case 'reports':
          // Get the first available reports option
          const reportsOptions = getNavigationOptions('reports')
          targetPath = reportsOptions.length > 0 ? reportsOptions[0].path : '/reports/attendance'
          break
        case 'announcements':
          targetPath = '/announcements'
          break
        case 'chat':
          targetPath = '/chat'
          break
        default:
          targetPath = '/dashboard'
      }
      console.log('Navigating to:', targetPath)
      // Navigate immediately without delay
      router.push(targetPath)
    }
  }

  const handleMobileDropdownOptionClick = (e, option) => {
    console.log('handleMobileDropdownOptionClick called with:', option)
    
    // Validate the option
    if (!option || !option.path) {
      console.error('Invalid option or missing path:', option)
      return
    }
    
    console.log('About to navigate to:', option.path)
    
    // Close mobile menu and dropdowns immediately
    setMobileMenuOpen(false)
    setMobileExpandedDropdown(null)
    setOpenDropdown(null)
    
    // Navigate immediately
    console.log('Calling router.push with:', option.path)
    router.push(option.path)
    console.log('Navigation called successfully')
  }

  // Get active tab label for mobile - handle null activeTab
  const activeTabLabel = activeTab ? visibleTabs.find(tab => tab.id === activeTab)?.name : "Menu"

  return (
    <div className="relative sticky top-[62px] z-10">
      {/* Desktop view */}
      <div className="hidden sm:flex items-center gap-1 sm:gap-2 lg:gap-6 px-2 lg:px-4 border-b border-gray-200 bg-white shadow-md overflow-x-auto">
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
              <span className="font-medium text-xs sm:text-sm">{tab.name}</span>
              {tab.hasDropdown && !tab.disabled && (
                <svg 
                  className={`ml-1 w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 transition-transform duration-300 ${openDropdown === tab.id ? 'rotate-180' : ''}`} 
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
      <div className="sm:hidden flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white shadow-md relative">
        <div className={`font-medium ${activeTab ? 'text-blue-600' : 'text-gray-700'}`}>
          {activeTabLabel}
        </div>
        <button 
          className="mobile-menu-button text-gray-700 focus:outline-none p-2"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen 
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            }
          </svg>
        </button>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] sm:hidden" onClick={(e) => {
              // Only close if clicking on the backdrop itself, not on menu items or dropdown options
              if (e.target === e.currentTarget) {
                console.log('Backdrop clicked - closing mobile menu')
                setMobileMenuOpen(false)
                setMobileExpandedDropdown(null)
              }
            }} />
            <div className="fixed sm:absolute top-[62px] left-0 right-0 bg-white shadow-md z-[9999] border-b border-gray-200 max-h-[80vh] overflow-y-auto">
              {visibleTabs.map((tab) => (
                <div key={tab.id}>
                  <div 
                    className={`mobile-menu-option px-4 py-3 flex justify-between items-center border-b border-gray-100 ${
                      tab.disabled 
                        ? "cursor-not-allowed text-gray-400 bg-gray-50" 
                        : activeTab === tab.id 
                          ? "bg-gray-100 text-blue-600 cursor-pointer" 
                          : "text-gray-700 cursor-pointer"
                    }`}
                    onClick={(e) => handleMobileMenuItemClick(e, tab)}
                  >
                    <span>{tab.name}</span>
                    {tab.hasDropdown && !tab.disabled && (
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${mobileExpandedDropdown === tab.id ? 'rotate-90' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {tab.disabled && <span className="text-xs ml-1">(soon)</span>}
                  </div>
                  
                  {/* Mobile dropdown options using unified navigation */}
                  {tab.hasDropdown && !tab.disabled && mobileExpandedDropdown === tab.id && (
                    <div className="bg-gray-50 border-t border-gray-100">
                      {(() => {
                        const options = getDropdownOptions(tab.id).filter(option => !option.hidden)
                        console.log(`Mobile dropdown options for ${tab.id}:`, options)
                        return options.map((option) => (
                          <div
                            key={option.path}
                            className={`w-full text-left px-8 py-2.5 text-gray-600 border-b border-gray-100 ${
                              option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-100'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              console.log('Mobile dropdown div mousedown:', option)
                              handleMobileDropdownOptionClick(e, option)
                            }}
                            onTouchEnd={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              console.log('Mobile dropdown div touchend:', option)
                              handleMobileDropdownOptionClick(e, option)
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              console.log('Mobile dropdown div clicked:', option)
                              handleMobileDropdownOptionClick(e, option)
                            }}
                          >
                            {option.text}
                            {option.disabled && <span className="text-xs ml-1">(soon)</span>}
                          </div>
                        ))
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>


      {/* Desktop dropdown - Unified Navigation */}
      {openDropdown && getDropdownOptions(openDropdown).length > 0 && (
        <TabDropdown isOpen={true} tabId={openDropdown}>
          <UnifiedNavigation 
            options={getDropdownOptions(openDropdown)}
            onOptionClick={handleDropdownNavigation}
          />
        </TabDropdown>
      )}
    </div>
  )
}