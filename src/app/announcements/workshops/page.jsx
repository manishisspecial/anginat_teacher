'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

export default function WorkshopsPage() {
  const [currentMonth, setCurrentMonth] = useState(0) // January
  const [currentYear, setCurrentYear] = useState(2022)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showWorkshopModal, setShowWorkshopModal] = useState(false)

  // Mock data for workshops
  const workshops = [
    { id: 1, title: 'Python Programming Workshop', timings: '9:00 AM - 11:00 AM', date: '15', color: 'bg-blue-100' },
    { id: 2, title: 'Web Development Bootcamp', timings: '2:00 PM - 4:00 PM', date: '15', color: 'bg-green-100' },
    { id: 3, title: 'Data Science Workshop', timings: '10:00 AM - 12:00 PM', date: '20', color: 'bg-purple-100' },
    { id: 4, title: 'Machine Learning Basics', timings: '1:00 PM - 3:00 PM', date: '20', color: 'bg-orange-100' },
    { id: 5, title: 'UI/UX Design Workshop', timings: '9:30 AM - 11:30 AM', date: '25', color: 'bg-pink-100' },
    { id: 6, title: 'Mobile App Development', timings: '2:30 PM - 4:30 PM', date: '25', color: 'bg-indigo-100' },
    { id: 7, title: 'Cybersecurity Workshop', timings: '10:30 AM - 12:30 PM', date: '28', color: 'bg-red-100' },
    { id: 8, title: 'Cloud Computing Basics', timings: '1:30 PM - 3:30 PM', date: '28', color: 'bg-yellow-100' }
  ]

  const upcomingWorkshops = [
    { id: 1, date: '15 Jan 2025', title: 'Python Programming Workshop', timings: '9:00 AM - 11:00 AM', color: 'bg-blue-100' },
    { id: 2, date: '20 Jan 2025', title: 'Data Science Workshop', timings: '10:00 AM - 12:00 PM', color: 'bg-purple-100' },
    { id: 3, date: '25 Jan 2025', title: 'UI/UX Design Workshop', timings: '9:30 AM - 11:30 AM', color: 'bg-pink-100' }
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Calculate calendar data
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Convert to Monday = 0

  // Get today's date
  const today = new Date()
  const isToday = (date) => {
    return date === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear()
  }

  // Get workshops for a specific date
  const getWorkshopsForDate = (date) => {
    return workshops.filter(workshop => workshop.date === String(date))
  }

  // Handle month change
  const handleMonthChange = (e) => {
    const selectedMonthName = e.target.value
    const monthIndex = months.indexOf(selectedMonthName)
    if (monthIndex !== -1) {
      setCurrentMonth(monthIndex)
    }
  }

  const handleDateClick = (date) => {
    const dayWorkshops = getWorkshopsForDate(date)
    if (dayWorkshops.length > 0) {
      setSelectedDate(date)
      setShowWorkshopModal(true)
    }
  }

  const closeWorkshopModal = () => {
    setShowWorkshopModal(false)
    setSelectedDate(null)
  }

  return (
    <PageLayout
      rightContent={<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Export</button>}
    >
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Main card */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            {/* Month row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-lg sm:text-xl font-semibold text-gray-900">
                {months[currentMonth]} {currentYear}
              </div>
              <select
                value={months[currentMonth]}
                onChange={handleMonthChange}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-bold text-black">
                  {day}
                </div>
              ))}
              {Array.from({ length: adjustedFirstDay }, (_, index) => (
                <div key={`empty-${index}`} className="p-1 sm:p-2"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const date = index + 1
                const dayWorkshops = getWorkshopsForDate(date)
                const hasWorkshops = dayWorkshops.length > 0
                return (
                  <div
                    key={date}
                    className={`p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] border border-gray-200 cursor-pointer transition-colors ${
                      isToday(date) ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    } ${hasWorkshops ? 'hover:bg-gray-50' : ''}`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="text-xs sm:text-sm font-bold text-black mb-1">
                      {date}
                    </div>
                    {hasWorkshops && (
                      <div className="space-y-1">
                        {/* Mobile: Show workshop indicators */}
                        <div className="md:hidden">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {dayWorkshops.slice(0, 3).map((workshop, idx) => (
                              <div
                                key={workshop.id}
                                className={`w-2 h-2 rounded-full ${workshop.color.replace('bg-', 'bg-').replace('text-', '')}`}
                                title={`${workshop.title} - ${workshop.timings}`}
                              />
                            ))}
                            {dayWorkshops.length > 3 && (
                              <div className="text-xs text-blue-500 font-bold">
                                +{dayWorkshops.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Desktop: Show full workshop details */}
                        <div className="hidden md:block">
                          {dayWorkshops.slice(0, 2).map(workshop => (
                            <div
                              key={workshop.id}
                              className={`text-xs px-1 sm:px-2 py-1 rounded text-black ${workshop.color} break-words`}
                            >
                              <div className="font-bold text-black text-xs leading-tight">Workshop</div>
                              <div className="text-xs opacity-75 text-black leading-tight">Timings</div>
                            </div>
                          ))}
                          {dayWorkshops.length > 2 && (
                            <div className="text-xs text-blue-500 px-1 sm:px-2 py-1 cursor-pointer">
                              +{dayWorkshops.length - 2} More
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">Upcoming Workshops</h3>
            <div className="space-y-3">
              {upcomingWorkshops.map(workshop => (
                <div key={workshop.id} className={`rounded-lg p-3 text-black ${workshop.color}`}>
                  <div className="text-xs text-black mb-1">
                    {workshop.date}
                  </div>
                  <div className="font-bold text-black text-sm mb-1">
                    {workshop.title}
                  </div>
                  <div className="text-xs opacity-75 text-black">
                    {workshop.timings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Workshop Details Modal */}
      {showWorkshopModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Workshops for {selectedDate} {months[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={closeWorkshopModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {getWorkshopsForDate(selectedDate).map(workshop => (
                  <div key={workshop.id} className={`rounded-lg p-3 ${workshop.color}`}>
                    <div className="font-semibold text-sm text-black mb-1">
                      {workshop.title}
                    </div>
                    <div className="text-xs text-black opacity-75">
                      {workshop.timings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={closeWorkshopModal}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
} 