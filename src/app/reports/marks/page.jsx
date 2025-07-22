'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function MarksPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [showFilters, setShowFilters] = useState(false)
  const [filterExamName, setFilterExamName] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterSection, setFilterSection] = useState('')

  // Mock data for marks (100 items)
  const marksData = Array.from({ length: 100 }, (_, index) => {
    const examNames = ['Weekly Test', 'Unit Test', 'Quarterly', 'Half Yearly', 'Annually']
    const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
    const sections = ['A', 'B', 'C', 'D']
    const examName = examNames[index % examNames.length]
    const classNum = classes[index % classes.length]
    const section = sections[index % sections.length]
    
    return {
      id: `EX${String(index + 1).padStart(3, '0')}`,
      examName: examName,
      class: classNum,
      section: section,
      status: 'COMPLETED'
    }
  })

  // Apply filters to the data
  const filteredMarks = marksData.filter(mark => {
    // Search filter
    const matchesSearch = mark.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mark.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mark.class.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter filters
    const matchesExamName = !filterExamName || mark.examName === filterExamName
    const matchesClass = !filterClass || mark.class === filterClass
    const matchesSection = !filterSection || mark.section === filterSection
    
    return matchesSearch && matchesExamName && matchesClass && matchesSection
  })

  // Pagination logic
  const totalItems = filteredMarks.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredMarks.slice(startIndex, endIndex)

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
    // Export functionality
    console.log('Exporting selected items:', selectedItems)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedItems([]) // Clear selection when page changes
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
    setSelectedItems([]) // Clear selection
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

  const getStatusBadge = (status) => {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-700 text-white">
        {status}
      </span>
    )
  }

  const handleApplyFilters = () => {
    // Reset to first page when filters are applied
    setCurrentPage(1)
    setSelectedItems([]) // Clear selection
    setShowFilters(false)
  }

  const handleCancelFilters = () => {
    setFilterExamName('')
    setFilterClass('')
    setFilterSection('')
    setCurrentPage(1) // Reset to first page
    setSelectedItems([]) // Clear selection
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

        {/* Marks List Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Header with title and controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Marks List</h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13C0 12.5938 0.3125 12.25 0.75 12.25H2.59375C2.90625 11.25 3.875 10.5 5 10.5C6.09375 10.5 7.0625 11.25 7.375 12.25H15.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H7.375C7.0625 14.7812 6.09375 15.5 5 15.5C3.875 15.5 2.90625 14.7812 2.59375 13.75H0.75C0.3125 13.75 0 13.4375 0 13ZM6 13C6 12.4688 5.53125 12 5 12C4.4375 12 4 12.4688 4 13C4 13.5625 4.4375 14 5 14C5.53125 14 6 13.5625 6 13ZM11 5.5C12.0938 5.5 13.0625 6.25 13.375 7.25H15.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H13.375C13.0625 9.78125 12.0938 10.5 11 10.5C9.875 10.5 8.90625 9.78125 8.59375 8.75H0.75C0.3125 8.75 0 8.4375 0 8C0 7.59375 0.3125 7.25 0.75 7.25H8.59375C8.90625 6.25 9.875 5.5 11 5.5ZM12 8C12 7.46875 11.5312 7 11 7C10.4375 7 10 7.46875 10 8C10 8.5625 10.4375 9 11 9C11.5312 9 12 8.5625 12 8ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H8.375C8.0625 4.78125 7.09375 5.5 6 5.5C4.875 5.5 3.90625 4.78125 3.59375 3.75H0.75C0.3125 3.75 0 3.4375 0 3C0 2.59375 0.3125 2.25 0.75 2.25H3.59375C3.90625 1.25 4.875 0.5 6 0.5C7.09375 0.5 8.0625 1.25 8.375 2.25H15.25ZM5 3C5 3.5625 5.4375 4 6 4C6.53125 4 7 3.5625 7 3C7 2.46875 6.53125 2 6 2C5.4375 2 5 2.46875 5 3Z" fill="#0364F3"/>
                  </svg>
                  Filters
                </button>
                <input
                  type="text"
                  placeholder="Search marks"
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Exam Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Section</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((mark) => (
                    <tr key={mark.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(mark.id)}
                          onChange={() => handleSelectItem(mark.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-900">{mark.id}</td>
                      <td className="py-3 px-4 text-gray-900">{mark.examName}</td>
                      <td className="py-3 px-4 text-gray-900">{mark.class}</td>
                      <td className="py-3 px-4 text-gray-900">{mark.section}</td>
                      <td className="py-3 px-4">{getStatusBadge(mark.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/reports/marks/${mark.id}/edit`)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => router.push(`/reports/marks/${mark.id}/view`)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - Fixed alignment */}
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

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                  <select
                    value={filterExamName}
                    onChange={(e) => setFilterExamName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Weekly Test">Weekly Test</option>
                    <option value="Unit Test">Unit Test</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={handleCancelFilters}
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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