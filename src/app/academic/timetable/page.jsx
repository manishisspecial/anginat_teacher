'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function TimeTablePage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filterClass, setFilterClass] = useState('')
  const [filterSection, setFilterSection] = useState('')

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const timeSlots = 6

  // Break information cards
  const breaksData = [
    { type: 'MORNING BREAK', time: '09:00 AM - 10:30 AM', color: 'bg-red-100', labelColor: 'bg-red-500' },
    { type: 'LUNCH', time: '09:00 AM - 10:30 AM', color: 'bg-green-100', labelColor: 'bg-green-500' },
    { type: 'TEA BREAK', time: '09:00 AM - 10:30 AM', color: 'bg-orange-100', labelColor: 'bg-orange-500' }
  ]

  // Generate mock timetable data with proper light colors matching the design
  const generateTimetableData = () => {
    const data = []
    const colors = [
      'bg-pink-100',
      'bg-blue-100', 
      'bg-green-100',
      'bg-orange-100',
      'bg-purple-100',
      'bg-yellow-100'
    ]
    
    // Define specific free period locations to match design
    const freePeriods = [
      { day: 0, slot: 3 }, // Monday, 4th row
      { day: 2, slot: 1 }, // Wednesday, 2nd row
      { day: 3, slot: 3 }, // Thursday, 4th row
      { day: 4, slot: 2 }, // Friday, 3rd row
      { day: 5, slot: 4 }  // Saturday, 5th row
    ]
    
    for (let day = 0; day < days.length; day++) {
      const dayData = []
      for (let slot = 0; slot < timeSlots; slot++) {
        const isFreePeriod = freePeriods.some(fp => fp.day === day && fp.slot === slot)
        const colorIndex = (day + slot) % colors.length
        dayData.push({
          type: isFreePeriod ? 'Free Period' : 'Class & Section',
          time: '9:00 AM - 10:30 AM',
          subject: isFreePeriod ? '' : 'Subject',
          isFreePeriod,
          color: colors[colorIndex]
        })
      }
      data.push(dayData)
    }
    return data
  }

  const timetableData = generateTimetableData()

  const handleExport = () => {
    // Export functionality
    console.log('Exporting timetable')
  }

  const handleApplyFilters = () => {
    // Apply filter logic here
    console.log('Applying filters:', { class: filterClass, section: filterSection })
    setShowFilters(false)
  }

  const handleCancelFilters = () => {
    setFilterClass('')
    setFilterSection('')
    setShowFilters(false)
  }

  return (
    <PageLayout rightContent={
      <button
        onClick={handleExport}
        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Export
      </button>
    }>
      <div className="w-full">
        
        {/* Break Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {breaksData.map((breakItem, index) => (
            <div key={index} className={`${breakItem.color} rounded-lg p-4 border border-gray-200`}>
              <div className={`${breakItem.labelColor} text-white text-xs font-bold px-2 py-1 rounded inline-block mb-2`}>
                {breakItem.type}
              </div>
              <div className="text-sm font-bold text-gray-900">{breakItem.time}</div>
            </div>
          ))}
        </div>

        {/* Time Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Time Table</h2>
            <button 
              onClick={() => setShowFilters(true)}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 13C0 12.5938 0.3125 12.25 0.75 12.25H2.59375C2.90625 11.25 3.875 10.5 5 10.5C6.09375 10.5 7.0625 11.25 7.375 12.25H15.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H7.375C7.0625 14.7812 6.09375 15.5 5 15.5C3.875 15.5 2.90625 14.7812 2.59375 13.75H0.75C0.3125 13.75 0 13.4375 0 13ZM6 13C6 12.4688 5.53125 12 5 12C4.4375 12 4 12.4688 4 13C4 13.5625 4.4375 14 5 14C5.53125 14 6 13.5625 6 13ZM11 5.5C12.0938 5.5 13.0625 6.25 13.375 7.25H15.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H13.375C13.0625 9.78125 12.0938 10.5 11 10.5C9.875 10.5 8.90625 9.78125 8.59375 8.75H0.75C0.3125 8.75 0 8.4375 0 8C0 7.59375 0.3125 7.25 0.75 7.25H8.59375C8.90625 6.25 9.875 5.5 11 5.5ZM12 8C12 7.46875 11.5312 7 11 7C10.4375 7 10 7.46875 10 8C10 8.5625 10.4375 9 11 9C11.5312 9 12 8.5625 12 8ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H8.375C8.0625 4.78125 7.09375 5.5 6 5.5C4.875 5.5 3.90625 4.78125 3.59375 3.75H0.75C0.3125 3.75 0 3.4375 0 3C0 2.59375 0.3125 2.25 0.75 2.25H3.59375C3.90625 1.25 4.875 0.5 6 0.5C7.09375 0.5 8.0625 1.25 8.375 2.25H15.25ZM5 3C5 3.5625 5.4375 4 6 4C6.53125 4 7 3.5625 7 3C7 2.46875 6.53125 2 6 2C5.4375 2 5 2.46875 5 3Z" fill="#0364F3"/>
              </svg>
              Filters
            </button>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-6 min-w-[1000px]">
              {/* Header Row - Days */}
              {days.map((day, dayIndex) => (
                <div key={day} className="font-bold text-gray-900 p-4 bg-gray-50 rounded-lg text-left text-base">
                  {day}
                </div>
              ))}

              {/* Time Slots - 6 rows */}
              {Array.from({ length: timeSlots }, (_, slotIndex) => (
                <React.Fragment key={slotIndex}>
                  {days.map((day, dayIndex) => {
                    const cellData = timetableData[dayIndex][slotIndex]
                    
                    return (
                      <div key={`${day}-${slotIndex}`} className={`${cellData.color} rounded-lg p-4 border border-gray-200 shadow-sm`}>
                        <div className="text-sm font-bold mb-2 text-gray-900">
                          {cellData.type}
                        </div>
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.35 13.57C14.21 13.81 13.96 13.94 13.7 13.94C13.57 13.94 13.44 13.91 13.32 13.83L10.22 11.98C9.45 11.52 8.88 10.51 8.88 9.62V5.52C8.88 5.11 9.22 4.77 9.63 4.77C10.04 4.77 10.38 5.11 10.38 5.52V9.62C10.38 9.98 10.68 10.51 10.99 10.69L14.09 12.54C14.45 12.75 14.57 13.21 14.35 13.57Z" fill="#151515"/>
                          </svg>
                          <span className="text-gray-900">{cellData.time}</span>
                        </div>
                        {cellData.subject && (
                          <div className="text-xs text-gray-900">
                            {cellData.subject}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-blue-600">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600 w-6 h-6 rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Class</label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="I">Class I</option>
                    <option value="II">Class II</option>
                    <option value="III">Class III</option>
                    <option value="IV">Class IV</option>
                    <option value="V">Class V</option>
                    <option value="VI">Class VI</option>
                    <option value="VII">Class VII</option>
                    <option value="VIII">Class VIII</option>
                    <option value="IX">Class IX</option>
                    <option value="X">Class X</option>
                    <option value="XI">Class XI</option>
                    <option value="XII">Class XII</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Section</label>
                  <select
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                    <option value="E">Section E</option>
                    <option value="F">Section F</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Apply
                </button>
                <button
                  onClick={handleCancelFilters}
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
} 