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
    
    // For leads routes - highlight if path starts with /leads
    if (pathname.startsWith('/leads')) {
      return 'leads'
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
    
    // Close dropdown immediately when option is clicked
    setOpenDropdown(null)
    setMobileMenuOpen(false)
    setMobileExpandedDropdown(null)
    
    // Navigate to the selected option
    router.push(option.path)
  }

  // Get dropdown options using unified system
  const getDropdownOptions = (tabId) => {
    return getNavigationOptions(tabId)
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
      router.push(`/${tab.id}`)
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
          className="mobile-menu-button text-gray-700 focus:outline-none"
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
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
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
                    {getDropdownOptions(tab.id).filter(option => !option.hidden).map((option) => (
                      <div 
                        key={option.path}
                        className={`px-8 py-2.5 text-gray-600 border-b border-gray-100 ${
                          option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-100'
                        }`}
                        onClick={(e) => handleMobileDropdownOptionClick(e, option)}
                      >
                        {option.text}
                        {option.disabled && <span className="text-xs ml-1">(soon)</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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