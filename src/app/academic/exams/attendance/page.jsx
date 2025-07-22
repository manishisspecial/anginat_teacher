'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'

export default function ExamAttendancePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  // Mock data for exam attendance
  const attendanceData = Array.from({ length: 100 }, (_, index) => {
    const subjects = ['English', 'Hindi', 'Maths', 'Computer', 'Science']
    const studentAttendance = {}
    
    // Generate random attendance for each subject
    subjects.forEach(subject => {
      studentAttendance[subject] = Math.random() > 0.3 ? 'present' : 'absent'
    })
    
    return {
      id: `AD${String(index + 1).padStart(3, '0')}`,
      name: 'Student name',
      attendance: studentAttendance
    }
  })

  const filteredAttendance = attendanceData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalItems = filteredAttendance.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredAttendance.slice(startIndex, endIndex)

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(currentData.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleExport = () => {
    console.log('Exporting attendance data:', selectedItems)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedItems([])
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    setSelectedItems([])
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  const subjects = ['English', 'Hindi', 'Maths', 'Computer', 'Science']

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

        {/* Exam Attendance Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Legend positioned above attendance section */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-700 rounded"></div>
                  <span className="text-sm text-gray-600">A Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-700 rounded"></div>
                  <span className="text-sm text-gray-600">P Present</span>
                </div>
              </div>
            </div>

            {/* Attendance Controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13C0 12.5938 0.3125 12.25 0.75 12.25H2.59375C2.90625 11.25 3.875 10.5 5 10.5C6.09375 10.5 7.0625 11.25 7.375 12.25H15.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H7.375C7.0625 14.7812 6.09375 15.5 5 15.5C3.875 15.5 2.90625 14.7812 2.59375 13.75H0.75C0.3125 13.75 0 13.4375 0 13ZM6 13C6 12.4688 5.53125 12 5 12C4.4375 12 4 12.4688 4 13C4 13.5625 4.4375 14 5 14C5.53125 14 6 13.5625 6 13ZM11 5.5C12.0938 5.5 13.0625 6.25 13.375 7.25H15.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H13.375C13.0625 9.78125 12.0938 10.5 11 10.5C9.875 10.5 8.90625 9.78125 8.59375 8.75H0.75C0.3125 8.75 0 8.4375 0 8C0 7.59375 0.3125 7.25 0.75 7.25H8.59375C8.90625 6.25 9.875 5.5 11 5.5ZM12 8C12 7.46875 11.5312 7 11 7C10.4375 7 10 7.46875 10 8C10 8.5625 10.4375 9 11 9C11.5312 9 12 8.5625 12 8ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H8.375C8.0625 4.78125 7.09375 5.5 6 5.5C4.875 5.5 3.90625 4.78125 3.59375 3.75H0.75C0.3125 3.75 0 3.4375 0 3C0 2.59375 0.3125 2.25 0.75 2.25H3.59375C3.90625 1.25 4.875 0.5 6 0.5C7.09375 0.5 8.0625 1.25 8.375 2.25H15.25ZM5 3C5 3.5625 5.4375 4 6 4C6.53125 4 7 3.5625 7 3C7 2.46875 6.53125 2 6 2C5.4375 2 5 2.46875 5 3Z" fill="#0364F3"/>
                  </svg>
                  Filters
                </button>
                <input
                  type="text"
                  placeholder="Search attendance"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === currentData.length && currentData.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    {subjects.map(subject => (
                      <th key={subject} className="text-left py-3 px-4 font-semibold text-gray-900">{subject}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-900">{item.id}</td>
                      <td className="py-3 px-4 text-gray-900">{item.name}</td>
                      {subjects.map(subject => (
                        <td key={subject} className="py-3 px-4">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${
                            item.attendance[subject] === 'present' 
                              ? 'bg-green-700' 
                              : 'bg-red-700'
                          }`}>
                            {item.attendance[subject] === 'present' ? 'P' : 'A'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : page === '...'
                        ? 'text-gray-500 cursor-default'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
              <select 
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 