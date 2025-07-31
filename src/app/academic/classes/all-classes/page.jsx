'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function AllClassesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Mock data for class list - matching the design exactly
  const classListData = Array.from({ length: 100 }, (_, index) => {
    const classNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    const sections = ['A', 'B', 'C', 'D']
    const students = [20, 25, 30, 35, 40]
    const subjects = [5, 6, 7, 8]
    
    return {
      id: 'C1', // All IDs are C1 as per design
      class: classNumbers[index % classNumbers.length],
      section: sections[index % sections.length],
      students: 30, // All have 30 students as per design
      subjects: 6, // All have 6 subjects as per design
      startTime: '09:00 am',
      endTime: '03:00 pm'
    }
  })

  const filteredClasses = classListData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.section.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalItems = filteredClasses.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredClasses.slice(startIndex, endIndex)

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
  const MobileClassCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900">{item.id}</div>
          <div className="text-sm text-gray-500">Class {item.class} - Section {item.section}</div>
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
          <span className="text-gray-500">Students:</span>
          <span className="ml-2 text-gray-900">{item.students}</span>
        </div>
        <div>
          <span className="text-gray-500">Subjects:</span>
          <span className="ml-2 text-gray-900">{item.subjects}</span>
        </div>
        <div>
          <span className="text-gray-500">Start:</span>
          <span className="ml-2 text-gray-900">{item.startTime}</span>
        </div>
        <div>
          <span className="text-gray-500">End:</span>
          <span className="ml-2 text-gray-900">{item.endTime}</span>
        </div>
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
        {/* Class Cards */}
        <div className="space-y-3">
          {currentData.map((item) => (
            <MobileClassCard key={item.id} item={item} />
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
        {/* Classes List Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6">
            {/* Header with title and controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Classes List</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                <button className="px-3 md:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                  {getIcon('filter')}
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <input
                  type="text"
                  placeholder="Search class"
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
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Section</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">No of students</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">No of subjects</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Start time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">End time</th>
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
                      <td className="py-3 px-4 text-gray-900">{item.class}</td>
                      <td className="py-3 px-4 text-gray-900">{item.section}</td>
                      <td className="py-3 px-4 text-gray-900">{item.students}</td>
                      <td className="py-3 px-4 text-gray-900">{item.subjects}</td>
                      <td className="py-3 px-4 text-gray-900">{item.startTime}</td>
                      <td className="py-3 px-4 text-gray-900">{item.endTime}</td>
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
      </div>
    </PageLayout>
  )
} 