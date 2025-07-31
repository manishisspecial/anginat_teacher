'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ExamsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    examName: '',
    class: '',
    examStatus: ''
  })

  // Mock data for exams (100 items) matching the design exactly
  const examsData = Array.from({ length: 100 }, (_, index) => {
    const examNames = ['Quarterly', 'Half Yearly', 'Annual']
    const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    const statuses = ['In Progress', 'Completed']
    
    // First 3 exams are "In Progress", rest are "Completed" as per design
    const status = index < 3 ? 'In Progress' : 'Completed'
    const examName = examNames[index % examNames.length]
    const classNum = classes[index % classes.length]
    
    return {
      id: `E${String(index + 1).padStart(3, '0')}`,
      examName: examName,
      class: classNum,
      examDate: '01-Jan-2025',
      status: status
    }
  })

  // Get unique values for filter dropdowns
  const uniqueExamNames = [...new Set(examsData.map(exam => exam.examName))]
  const uniqueClasses = [...new Set(examsData.map(exam => exam.class))]
  const uniqueStatuses = [...new Set(examsData.map(exam => exam.status))]

  // Filter exams based on search term and filters
  const filteredExams = examsData.filter(exam => {
    // Search filter
    const matchesSearch = 
      exam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Apply filters
    const matchesExamName = !filters.examName || exam.examName === filters.examName
    const matchesClass = !filters.class || exam.class === filters.class
    const matchesStatus = !filters.examStatus || exam.status === filters.examStatus
    
    return matchesSearch && matchesExamName && matchesClass && matchesStatus
  })

  // Pagination logic
  const totalItems = filteredExams.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredExams.slice(startIndex, endIndex)

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1)
    setSelectedItems([])
  }, [filters, searchTerm])

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

  const handleViewExam = (examId) => {
    // Navigate to exam details page
    router.push(`/academic/exams/details/${examId}`)
  }

  const handleApplyFilters = () => {
    setShowFilters(false) // Close filter modal
  }

  const handleClearFilters = () => {
    setFilters({
      examName: '',
      class: '',
      examStatus: ''
    })
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Generate page numbers for desktop
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

  // Generate page numbers for mobile (limited to 5 pages)
  const getMobilePageNumbers = () => {
    const pages = []
    const maxMobilePages = 5
    
    if (totalPages <= maxMobilePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5)
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)
      }
    }
    
    return pages
  }

  // Mobile card component
  const MobileExamCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900">{item.id}</div>
          <div className="text-sm text-gray-500">{item.examName} - Class {item.class}</div>
        </div>
        <input
          type="checkbox"
          checked={selectedItems.includes(item.id)}
          onChange={() => handleSelectItem(item.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <span className="text-gray-500">Date:</span>
          <span className="ml-2 text-gray-900">{item.examDate}</span>
        </div>
        <div>
          <span className="text-gray-500">Status:</span>
          <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            item.status === 'In Progress' 
              ? 'text-yellow-800' 
              : 'text-green-800'
          }`}>
            {item.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => handleViewExam(item.id)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View
        </button>
      </div>
    </div>
  );

  // Mobile pagination component
  const MobilePagination = () => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="mt-6">
        {/* Exam Cards */}
        <div className="space-y-3">
          {currentData.map((item) => (
            <MobileExamCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-500">
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {getMobilePageNumbers().map((page, index) => (
                <button
                  key={`mobile-page-${page}-${index}`}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page === currentPage 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-gray-300 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

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
        {/* Exams List Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6">
            {/* Header with title and controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Exams List</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="px-3 md:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13C0 12.5938 0.3125 12.25 0.75 12.25H2.59375C2.90625 11.25 3.875 10.5 5 10.5C6.09375 10.5 7.0625 11.25 7.375 12.25H15.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H7.375C7.0625 14.7812 6.09375 15.5 5 15.5C3.875 15.5 2.90625 14.7812 2.59375 13.75H0.75C0.3125 13.75 0 13.4375 0 13ZM6 13C6 12.4688 5.53125 12 5 12C4.4375 12 4 12.4688 4 13C4 13.5625 4.4375 14 5 14C5.53125 14 6 13.5625 6 13ZM11 5.5C12.0938 5.5 13.0625 6.25 13.375 7.25H15.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H13.375C13.0625 9.78125 12.0938 10.5 11 10.5C9.875 10.5 8.90625 9.78125 8.59375 8.75H0.75C0.3125 8.75 0 8.4375 0 8C0 7.59375 0.3125 7.25 0.75 7.25H8.59375C8.90625 6.25 9.875 5.5 11 5.5ZM12 8C12 7.46875 11.5312 7 11 7C10.4375 7 10 7.46875 10 8C10 8.5625 10.4375 9 11 9C11.5312 9 12 8.5625 12 8ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H8.375C8.0625 4.78125 7.09375 5.5 6 5.5C4.875 5.5 3.90625 4.78125 3.59375 3.75H0.75C0.3125 3.75 0 3.4375 0 3C0 2.59375 0.3125 2.25 0.75 2.25H3.59375C3.90625 1.25 4.875 0.5 6 0.5C7.09375 0.5 8.0625 1.25 8.375 2.25H15.25ZM5 3C5 3.5625 5.4375 4 6 4C6.53125 4 7 3.5625 7 3C7 2.46875 6.53125 2 6 2C5.4375 2 5 2.46875 5 3Z" fill="#0364F3"/>
                  </svg>
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <input
                  type="text"
                  placeholder="Search by exam"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>

            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
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
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Exam Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Exam Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={`${item.id}-${currentPage}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-900">{item.id}</td>
                      <td className="py-3 px-4 text-gray-900">{item.examName}</td>
                      <td className="py-3 px-4 text-gray-900">{item.class}</td>
                      <td className="py-3 px-4 text-gray-900">{item.examDate}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'In Progress' 
                            ? 'text-yellow-800' 
                            : 'text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleViewExam(item.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards - Visible only on mobile */}
            <div className="md:hidden">
              <MobilePagination />
            </div>

            {/* Desktop Pagination - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-between mt-6">
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
                    key={`desktop-page-${page}-${index}`}
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
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Exam Name Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                  <select
                    value={filters.examName}
                    onChange={(e) => handleFilterChange('examName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="">Select</option>
                    {uniqueExamNames.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Class Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="">Select</option>
                    {uniqueClasses.map(classNum => (
                      <option key={classNum} value={classNum}>{classNum}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Status</label>
                  <select
                    value={filters.examStatus}
                    onChange={(e) => handleFilterChange('examStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="">Select</option>
                    {uniqueStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
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