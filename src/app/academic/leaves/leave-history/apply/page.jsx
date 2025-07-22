'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ApplyLeavePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    leaveType: '',
    leaveFromDate: '',
    leaveToDate: '',
    numberOfDays: '',
    appliedOn: '',
    status: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Applying leave:', formData)
    // Navigate back to leave history
    router.push('/academic/leaves/leave-history')
  }

  const handleCancel = () => {
    router.push('/academic/leaves/leave-history')
  }

  return (
    <PageLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Apply Leave</h2>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              {getIcon('close')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Leave Type Field */}
            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Special Leave">Special Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
              </select>
            </div>

            {/* Leave from date Field */}
            <div>
              <label htmlFor="leaveFromDate" className="block text-sm font-medium text-gray-700 mb-2">
                Leave from date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="leaveFromDate"
                  name="leaveFromDate"
                  value={formData.leaveFromDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {getIcon('calendar')}
                </div>
              </div>
            </div>

            {/* Leave to date Field */}
            <div>
              <label htmlFor="leaveToDate" className="block text-sm font-medium text-gray-700 mb-2">
                Leave to date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="leaveToDate"
                  name="leaveToDate"
                  value={formData.leaveToDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {getIcon('calendar')}
                </div>
              </div>
            </div>

            {/* No. of Days Field */}
            <div>
              <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700 mb-2">
                No. of Days
              </label>
              <select
                id="numberOfDays"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
                <option value="6">6 Days</option>
                <option value="7">7 Days</option>
                <option value="8">8 Days</option>
                <option value="9">9 Days</option>
                <option value="10">10 Days</option>
              </select>
            </div>

            {/* Applied On Field */}
            <div>
              <label htmlFor="appliedOn" className="block text-sm font-medium text-gray-700 mb-2">
                Applied On
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="appliedOn"
                  name="appliedOn"
                  value={formData.appliedOn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {getIcon('calendar')}
                </div>
              </div>
            </div>

            {/* Status Field */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Leave
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
} 