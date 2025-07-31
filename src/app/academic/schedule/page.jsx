'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function SchedulePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Mock data for schedule (100 items) - ensuring data for all filter options
  const scheduleData = Array.from({ length: 100 }, (_, index) => {
    const types = ['Class', 'Exam', 'Meeting', 'Break']
    const statuses = ['ACTIVE', 'INACTIVE']
    
    // Ensure even distribution of types and statuses
    const type = types[index % types.length]
    const status = statuses[index % statuses.length]
    
    // Create more varied data
    const timeSlots = [
      { start: '08:00 am', end: '09:00 am' },
      { start: '09:00 am', end: '10:00 am' },
      { start: '10:00 am', end: '11:00 am' },
      { start: '11:00 am', end: '12:00 pm' },
      { start: '12:00 pm', end: '01:00 pm' },
      { start: '01:00 pm', end: '02:00 pm' },
      { start: '02:00 pm', end: '03:00 pm' },
      { start: '03:00 pm', end: '04:00 pm' },
      { start: '04:00 pm', end: '05:00 pm' },
      { start: '05:00 pm', end: '06:00 pm' }
    ]
    
    const timeSlot = timeSlots[index % timeSlots.length]
    
    return {
      id: `S${String(index + 1).padStart(3, '0')}`,
      type: type,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      status: status
    }
  })

  // Apply filters to the data
  const filteredSchedule = scheduleData.filter(item => {
    // Search filter
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Type filter
    const matchesType = !filterType || item.type === filterType
    
    // Status filter
    const matchesStatus = !filterStatus || item.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Debug logging for filters
  console.log('Filter Debug:', {
    searchTerm,
    filterType,
    filterStatus,
    totalItems: scheduleData.length,
    filteredItems: filteredSchedule.length,
    filteredData: filteredSchedule.slice(0, 5) // Show first 5 items
  })

  // Pagination logic
  const totalItems = filteredSchedule.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredSchedule.slice(startIndex, endIndex)

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
    const isActive = status === 'ACTIVE'
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-700 text-white' 
          : 'bg-red-700 text-white'
      }`}>
        {status}
      </span>
    )
  }

  const handleApplyFilters = () => {
    // Reset to first page when filters are applied
    setCurrentPage(1)
    setSelectedItems([]) // Clear selection
    setShowFilters(false)
    
    // Log the applied filters
    console.log('Filters Applied:', {
      filterType,
      filterStatus,
      filteredCount: filteredSchedule.length
    })
  }

  const handleCancelFilters = () => {
    setFilterType('')
    setFilterStatus('')
    setCurrentPage(1) // Reset to first page
    setSelectedItems([]) // Clear selection
    setShowFilters(false)
  }

  // Mobile card component
  const MobileScheduleCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900">{item.id}</div>
          <div className="text-sm text-gray-500">{item.type}</div>
        </div>
        <input
          type="checkbox"
          checked={selectedItems.includes(item.id)}
          onChange={() => handleSelectItem(item.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Start Time:</span>
          <span className="ml-2 text-gray-900">{item.startTime}</span>
        </div>
        <div>
          <span className="text-gray-500">End Time:</span>
          <span className="ml-2 text-gray-900">{item.endTime}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Status:</span>
          <span className="ml-2">{getStatusBadge(item.status)}</span>
        </div>
      </div>
    </div>
  );

  // Helper for mobile page numbers
  function getMobilePageNumbers(currentPage, totalPages) {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }

  // Mobile pagination component
  const MobilePagination = () => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="mt-6">
        {/* Schedule Cards */}
        <div className="space-y-3">
          {currentData.map((item) => (
            <MobileScheduleCard key={item.id} item={item} />
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
              {getMobilePageNumbers(currentPage, totalPages).map((page) => (
                <button
                  key={page}
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
        {/* Schedule Classes List Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {/* Header with title and controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Schedule Classes List</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <button 
                onClick={() => setShowFilters(true)}
                className="px-3 md:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {getIcon('filter')}
                <span className="hidden sm:inline">Filters</span>
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              />
            </div>
          </div>

          {/* Desktop Table - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            {currentData.length > 0 ? (
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
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Start time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">End time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
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
                      <td className="py-3 px-4 text-gray-900">{item.type}</td>
                      <td className="py-3 px-4 text-gray-900">{item.startTime}</td>
                      <td className="py-3 px-4 text-gray-900">{item.endTime}</td>
                      <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg font-medium mb-2">No data found</div>
                <div className="text-gray-400 text-sm">
                  {filterType || filterStatus ? 
                    `No results match your current filters. Try adjusting your search criteria.` :
                    `No schedule data available.`
                  }
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cards - Visible only on mobile */}
          <div className="md:hidden">
            {currentData.length > 0 ? (
              <MobilePagination />
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg font-medium mb-2">No data found</div>
                <div className="text-gray-400 text-sm">
                  {filterType || filterStatus ? 
                    `No results match your current filters. Try adjusting your search criteria.` :
                    `No schedule data available.`
                  }
                </div>
              </div>
            )}
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

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base ${
                      filterType ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Class">Class</option>
                    <option value="Exam">Exam</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Break">Break</option>
                  </select>
                  {filterType && (
                    <div className="mt-2 text-sm text-blue-600">
                      Selected: {filterType}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base ${
                      filterStatus ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {filterStatus && (
                    <div className="mt-2 text-sm text-blue-600">
                      Selected: {filterStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
                <button
                  onClick={handleApplyFilters}
                  className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Apply
                </button>
                <button
                  onClick={handleCancelFilters}
                  className="w-full sm:flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 