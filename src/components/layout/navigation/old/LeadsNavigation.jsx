// components/layout/navigation/LeadsNavigation.jsx
import React from 'react'
import { getIcon } from '../../../icons/IconComponents'

/**
 * Tab item styled to match the provided example
 */
const TabItem = ({ text, icon, isActive, onClick, disabled }) => {
    const handleClick = (e) => {
        e.stopPropagation()
        if (!disabled) {
            onClick()
        }
    }

    return (
        <div
            className={`self-stretch px-2 sm:px-4 py-2 ${isActive ? 'bg-blue-600' : 'bg-white'} rounded flex justify-start items-center gap-2 sm:gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} flex-shrink-0`}
            onClick={handleClick}
        >
            <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                {icon}
            </div>
            <div className={`justify-center ${isActive ? 'text-white' : 'text-neutral-900'} text-sm sm:text-base font-normal capitalize leading-normal whitespace-nowrap`}>
                {text}
                {disabled && <span className="text-xs ml-1">(soon)</span>}
            </div>
        </div>
    )
}

export default function LeadsNavigation({ options, onOptionClick }) {
    // Filter out hidden options
    const visibleOptions = options.filter(option => !option.hidden)
    
    // State for active tab (none selected by default)
    const [activeIndex, setActiveIndex] = React.useState(-1)

    const handleTabClick = (option, index) => {
        if (option.disabled) return
        
        setActiveIndex(index)
        onOptionClick(option)
    }

    return (
        <div className="w-full px-3 md:px-6 py-2 md:py-2.5 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] border-t border-neutral-200 inline-flex justify-start items-center gap-2 md:gap-6 overflow-x-auto">
            {visibleOptions.map((option, index) => (
                <TabItem
                    key={option.path}
                    text={option.text}
                    icon={getIconForLeadsOption(option.path)}
                    isActive={activeIndex === index}
                    onClick={() => handleTabClick(option, index)}
                    disabled={option.disabled}
                />
            ))}
        </div>
    )
}

// Helper function to get icons for different leads options
function getIconForLeadsOption(path) {
    // Extract the last segment of the path to determine the icon
    const pathSegments = path.split('/')
    const lastSegment = pathSegments[pathSegments.length - 1]
    
    const iconMap = {
        'leads': 'leads',
        'trash': 'trash',
        'contacts': 'contacts',
        'follow-up': 'followUp',
        'converted': 'converted',
        'pipeline': 'pipeline'
    }
    
    // For the main "/leads" path, use 'leads' icon
    if (path === '/leads') {
        return getIcon('leads')
    }
    
    const iconName = iconMap[lastSegment] || 'leads'
    return getIcon(iconName)
}