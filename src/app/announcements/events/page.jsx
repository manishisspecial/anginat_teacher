'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

export default function EventsPage() {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [currentMonth, setCurrentMonth] = useState(0) // January 2022
  const [currentYear, setCurrentYear] = useState(2022)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Mock events data matching the design
  const events = [
    { id: 1, title: 'Event Name', date: 1, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 2, title: 'Event Name', date: 1, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 3, title: 'Event Name', date: 1, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 4, title: 'Event Name', date: 1, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 5, title: 'Event Name', date: 4, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 6, title: 'Event Name', date: 4, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 7, title: 'Event Name', date: 4, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 8, title: 'Event Name', date: 4, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 9, title: 'Event Name', date: 5, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 10, title: 'Event Name', date: 5, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 11, title: 'Event Name', date: 5, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 12, title: 'Event Name', date: 5, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 13, title: 'Event Name', date: 11, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 14, title: 'Event Name', date: 11, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 15, title: 'Event Name', date: 11, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 16, title: 'Event Name', date: 11, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 17, title: 'Event Name', date: 12, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 18, title: 'Event Name', date: 12, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 19, title: 'Event Name', date: 12, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 20, title: 'Event Name', date: 12, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 21, title: 'Event Name', date: 13, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 22, title: 'Event Name', date: 13, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 23, title: 'Event Name', date: 13, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 24, title: 'Event Name', date: 13, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 25, title: 'Event Name', date: 25, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 26, title: 'Event Name', date: 25, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 27, title: 'Event Name', date: 25, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 28, title: 'Event Name', date: 25, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 29, title: 'Event Name', date: 26, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 30, title: 'Event Name', date: 26, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 31, title: 'Event Name', date: 26, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 32, title: 'Event Name', date: 26, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 33, title: 'Event Name', date: 27, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 34, title: 'Event Name', date: 27, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 35, title: 'Event Name', date: 27, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 36, title: 'Event Name', date: 27, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 37, title: 'Event Name', date: 29, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 38, title: 'Event Name', date: 29, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' },
    { id: 39, title: 'Event Name', date: 29, month: currentMonth, color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 40, title: 'Event Name', date: 29, month: currentMonth, color: 'bg-blue-100 text-blue-800', timings: 'Timings' }
  ]

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date)
  }

  const handleMonthChange = (e) => {
    const monthIndex = months.indexOf(e.target.value)
    if (monthIndex !== -1) {
      setCurrentMonth(monthIndex)
    }
  }

  const today = new Date()
  const isToday = (date) => {
    return date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const handleDateClick = (date) => {
    const dayEvents = getEventsForDate(date)
    if (dayEvents.length > 0) {
      setSelectedDate(date)
      setShowEventModal(true)
    }
  }

  const closeEventModal = () => {
    setShowEventModal(false)
    setSelectedDate(null)
  }

  // Today's events for sidebar
  const todaysEvents = [
    { id: 1, title: 'Event Name', date: '11 Jan 2025', color: 'bg-pink-100 text-pink-800', timings: 'Timings' },
    { id: 2, title: 'Event Name', date: '11 Jan 2025', color: 'bg-green-100 text-green-800', timings: 'Timings' },
    { id: 3, title: 'Event Name', date: '11 Jan 2025', color: 'bg-orange-100 text-orange-800', timings: 'Timings' }
  ]

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
              {Array.from({ length: firstDayOfMonth }, (_, index) => (
                <div key={`empty-${index}`} className="p-1 sm:p-2"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const date = index + 1
                const dayEvents = getEventsForDate(date)
                const hasEvents = dayEvents.length > 0
                return (
                  <div
                    key={date}
                    className={`p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] border border-gray-200 cursor-pointer transition-colors ${
                      isToday(date) ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    } ${hasEvents ? 'hover:bg-gray-50' : ''}`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="text-xs sm:text-sm font-bold text-black mb-1">
                      {date}
                    </div>
                    {hasEvents && (
                      <div className="space-y-1">
                        {/* Mobile: Show event indicators */}
                        <div className="md:hidden">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={event.id}
                                className={`w-2 h-2 rounded-full ${event.color.replace('bg-', 'bg-').replace('text-', '')}`}
                                title={`${event.title} - ${event.timings}`}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-blue-500 font-bold">
                                +{dayEvents.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Desktop: Show full event details */}
                        <div className="hidden md:block">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-1 sm:px-2 py-1 rounded text-black ${event.color} break-words`}
                            >
                              <div className="font-bold text-black text-xs leading-tight">Event</div>
                              <div className="text-xs opacity-75 text-black leading-tight">Timings</div>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-blue-500 px-1 sm:px-2 py-1 cursor-pointer">
                              +{dayEvents.length - 2} More
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
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">Today's Events</h3>
            <div className="space-y-3">
              {todaysEvents.map(event => (
                <div key={event.id} className={`rounded-lg p-3 text-black ${event.color}`}>
                  <div className="text-xs text-black mb-1">
                    {event.date}
                  </div>
                  <div className="font-bold text-black text-sm mb-1">
                    {event.title}
                  </div>
                  <div className="text-xs opacity-75 text-black">
                    {event.timings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Event Details Modal */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Events for {selectedDate} {months[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={closeEventModal}
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
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className={`rounded-lg p-3 ${event.color}`}>
                    <div className="font-semibold text-sm text-black mb-1">
                      {event.title}
                    </div>
                    <div className="text-xs text-black opacity-75">
                      {event.timings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={closeEventModal}
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