'use client'
// components/layout/PageHeader.jsx
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { getPageConfig } from '../utils/breadcrumbUtils'
import { getIcon } from '../icons/IconComponents'

export default function PageHeader({ 
  customTitle, 
  customIcon, 
  customBreadcrumbs, 
  rightContent, 
  showIcon = true,
  customIconBgColor 
}) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Get page configuration
  const pageConfig = useMemo(() => getPageConfig(pathname), [pathname])
  
  // Use custom props or fallback to auto-detected config
  const title = customTitle || pageConfig.title
  const icon = customIcon || getIcon(pageConfig.icon)
  const iconBgColor = customIconBgColor || pageConfig.iconBgColor
  const breadcrumbs = customBreadcrumbs || pageConfig.breadcrumbs

  // Handle navigation for breadcrumb clicks
  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <>
      <div className="info-box flex flex-col px-3 sm:px-6 max-w-screen bg-[#fbfbfd]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full sm:pt-4 py-4">
          <div className="flex align-stretch mb-0">
            {/* Icon Container - only render if showIcon is true */}
            {showIcon && icon && (
              <div 
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[30px] flex items-center justify-center mr-4 sm:mr-6 text-white"
                style={{ backgroundColor: iconBgColor }}
              >
                {icon}
              </div>
            )}
            
            {/* Title and Breadcrumbs */}
            <div className="flex flex-col justify-center gap-1 h-[50px] sm:h-[60px]">
              <div className="text-xl sm:text-2xl lg:text-[28px] font-[700] text-neutral-900">
                {title}
              </div>
              
              {/* Breadcrumbs */}
              <div className="self-stretch inline-flex flex-wrap items-center gap-1">
                {breadcrumbs.map((item, index) => (
                  <div key={`${item.path}-${index}`} className="inline-flex items-center">
                    {/* Add separator (except for first item) */}
                    {index > 0 && (
                      <div className="text-zinc-800 text-xs sm:text-sm font-normal flex items-center">
                        <span className="mx-1">&gt;</span>
                      </div>
                    )}
                    
                    {/* Breadcrumb item */}
                    <div className={`text-xs sm:text-sm font-normal flex items-center`}>
                      {item.active || !item.isBreadcrumb ? (
                        <span className="cursor-default text-zinc-800">{item.label}</span>
                      ) : (
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className="hover:underline transition-colors text-blue-600"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Optional Right Content - passed directly as prop */}
          {rightContent && (
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              {rightContent}
            </div>
          )}
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full max-w-12xl h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200" />
    </>
  )
}