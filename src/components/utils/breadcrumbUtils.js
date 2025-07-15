// utils/breadcrumbUtils.js

import { ROUTE_CONFIG } from '../config/routeConfig'

/**
 * Generate breadcrumbs from pathname
 * @param {string} pathname - The current pathname
 * @returns {Array} Array of breadcrumb objects
 */
export const generateBreadcrumbs = (pathname) => {
  // Check if we have exact route config
  if (ROUTE_CONFIG[pathname]) {
    return ROUTE_CONFIG[pathname].breadcrumbs
  }
  
  // Generate default breadcrumbs for unknown routes
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true }
  ]
  
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = formatSegmentLabel(segment)
    
    breadcrumbs.push({
      label,
      path: currentPath,
      active: isLast, // Only the last breadcrumb should be active (current page)
      isBreadcrumb: true // Default to true for auto-generated breadcrumbs
    })
  })
  
  return breadcrumbs
}

/**
 * Format a URL segment into a readable label
 * @param {string} segment - URL segment
 * @returns {string} Formatted label
 */
const formatSegmentLabel = (segment) => {
  // Handle special cases
  const specialCases = {
    'addcourses': 'Add Course',
    'timetable': 'Time Table',
    'change-password': 'Change Password'
  }
  
  if (specialCases[segment]) {
    return specialCases[segment]
  }
  
  // Default formatting: capitalize first letter
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

/**
 * Get page configuration from pathname
 * @param {string} pathname - The current pathname
 * @returns {Object} Page configuration object
 */
export const getPageConfig = (pathname) => {
  // Check if we have exact route config
  if (ROUTE_CONFIG[pathname]) {
    return ROUTE_CONFIG[pathname]
  }
  
  // Generate default config for unknown routes
  const pathSegments = pathname.split('/').filter(Boolean)
  const title = pathSegments[pathSegments.length - 1] || 'Dashboard'
  const formattedTitle = formatSegmentLabel(title)
  
  return {
    title: formattedTitle,
    icon: 'default',
    iconBgColor: '#0364F3',
    breadcrumbs: generateBreadcrumbs(pathname)
  }
}