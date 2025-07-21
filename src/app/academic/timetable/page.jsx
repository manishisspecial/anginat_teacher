'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function TimeTablePage() {
  const [selectedDay, setSelectedDay] = useState(0)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const timeSlots = 6

  // Generate mock timetable data with better color coordination
  const generateTimetableData = () => {
    const data = []
    const colors = [
      'bg-pink-100 text-pink-800',
      'bg-blue-100 text-blue-800', 
      'bg-green-100 text-green-800',
      'bg-orange-100 text-orange-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800'
    ]
    
    for (let day = 0; day < days.length; day++) {
      const dayData = []
      for (let slot = 0; slot < timeSlots; slot++) {
        const isFreePeriod = Math.random() > 0.8 // 20% chance of free period
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

  const getCellBackground = (cellData) => {
    if (cellData.isFreePeriod) return 'bg-orange-100 text-orange-800'
    return cellData.color
  }

  const handleExport = () => {
    // Export functionality
    console.log('Exporting timetable')
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Time Table</h2>
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              {getIcon('filter')}
              Filters
            </button>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-4 min-w-[800px]">
              {/* Header Row */}
              <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">
                Time
              </div>
              {days.map((day, dayIndex) => (
                <div key={day} className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">
                  {day}
                </div>
              ))}

              {/* Time Slots */}
              {Array.from({ length: timeSlots }, (_, slotIndex) => (
                <React.Fragment key={slotIndex}>
                  <div className="font-medium text-gray-700 p-3 bg-gray-50 rounded-lg text-center">
                    Slot {slotIndex + 1}
                  </div>
                  {days.map((day, dayIndex) => {
                    const cellData = timetableData[dayIndex][slotIndex]
                    const cellBg = getCellBackground(cellData)
                    
                    return (
                      <div key={`${day}-${slotIndex}`} className={`${cellBg} rounded-lg p-3 border border-gray-200`}>
                        <div className="text-sm font-medium mb-1">
                          {cellData.type}
                        </div>
                        <div className="flex items-center gap-1 text-xs mb-1">
                          <span className="w-3 h-3">🕐</span>
                          <span>{cellData.time}</span>
                        </div>
                        {cellData.subject && (
                          <div className="text-xs">
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
      </div>
    </PageLayout>
  )
} 