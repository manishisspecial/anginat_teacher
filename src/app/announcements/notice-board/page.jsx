'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

export default function NoticeBoardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Mock data for notices - matching the design
  const noticesData = [
    { id: 1, category: 'GENERAL', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    { id: 2, category: 'CATEGORY', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    { id: 3, category: 'FEES', title: 'Fees Payment', description: 'We request all the students to pay the fees before the due date.' },
    { id: 4, category: 'EVENTS', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    { id: 5, category: 'MEETINGS', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    { id: 6, category: 'FEES', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    { id: 7, category: 'GENERAL', title: 'List item', description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.' },
    // Add more notices to reach desired count
    ...Array.from({ length: 20 }, (_, index) => ({
      id: index + 8,
      category: ['GENERAL', 'CATEGORY', 'FEES', 'EVENTS', 'MEETINGS'][index % 5],
      title: `Notice ${index + 8}`,
      description: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
    }))
  ]

  const categories = ['GENERAL', 'CATEGORY', 'FEES', 'EVENTS', 'MEETINGS']

  const getCategoryColor = (category) => {
    switch (category) {
      case 'GENERAL': return 'bg-pink-700'
      case 'CATEGORY': return 'bg-purple-700'
      case 'FEES': return 'bg-orange-700'
      case 'EVENTS': return 'bg-green-700'
      case 'MEETINGS': return 'bg-blue-700'
      default: return 'bg-gray-700'
    }
  }

  const filteredNotices = noticesData.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalItems = filteredNotices.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredNotices.slice(startIndex, endIndex)

  const handleExport = () => {
    console.log('Exporting notices')
  }

  const handleApplyFilters = () => {
    setShowFilters(false)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategory('')
    setShowFilters(false)
    setCurrentPage(1)
  }

  const handleLoadMore = () => {
    setItemsPerPage(prev => prev + 10)
  }

  return (
    <PageLayout rightContent={
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Export
        </button>
      </div>
    }>
      <div className="w-full">
        {/* Notice Board Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Header with title and controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
              <h2 className="text-xl font-bold text-gray-900">List Of Notices</h2>
                              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
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
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {currentData.map((notice) => (
                <div key={notice.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium text-white rounded ${getCategoryColor(notice.category)}`}>
                          {notice.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                      <p className="text-gray-600 text-sm">{notice.description}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Read more
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {currentData.length < totalItems && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 max-w-md mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
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

              {/* Modal Content */}
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
} 