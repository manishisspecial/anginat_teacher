'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function AddAssignmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: '',
    class: '',
    subject: '',
    date: '',
    submissionDate: '',
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
    console.log('Adding assignment:', formData)
    // Navigate back to assignments list
    router.push('/academic/assignments')
  }

  const handleCancel = () => {
    router.push('/academic/assignments')
  }

  return (
    <PageLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Assignment</h2>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              {getIcon('close')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Field */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                placeholder="Enter id"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Class Field */}
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
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

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            {/* Date Field */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {getIcon('calendar')}
                </div>
              </div>
            </div>

            {/* Submission Date Field */}
            <div>
              <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700 mb-2">
                Submission Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="submissionDate"
                  name="submissionDate"
                  value={formData.submissionDate}
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
                <option value="COMPLETED">COMPLETED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
} 