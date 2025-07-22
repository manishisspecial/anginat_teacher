'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function EditMarksPage() {
  const params = useParams()
  const router = useRouter()
  const marksId = params.id

  const [formData, setFormData] = useState({
    id: '',
    examName: '',
    class: '',
    section: '',
    status: '',
    examDate: '',
    totalStudents: '',
    averageScore: ''
  })

  // Mock marks data - in real app this would come from API
  const mockMarksData = {
    id: marksId,
    examName: 'Quarterly Examination',
    class: 'X',
    section: 'A',
    status: 'COMPLETED',
    examDate: '2024-10-15',
    totalStudents: '35',
    averageScore: '78.5'
  }

  useEffect(() => {
    // Simulate loading marks data
    setFormData(mockMarksData)
  }, [marksId])

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
    console.log('Updating marks:', formData)
    // Navigate back to marks list
    router.push('/reports/marks')
  }

  const handleCancel = () => {
    router.push('/reports/marks')
  }

  return (
    <PageLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Marks</h2>
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
                placeholder="Enter ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Exam Name Field */}
            <div>
              <label htmlFor="examName" className="block text-sm font-medium text-gray-700 mb-2">
                Exam Name
              </label>
              <input
                type="text"
                id="examName"
                name="examName"
                value={formData.examName}
                onChange={handleInputChange}
                placeholder="Enter exam name"
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

            {/* Section Field */}
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
              </select>
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
                <option value="COMPLETED">Completed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PENDING">Pending</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Exam Date Field */}
            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-2">
                Exam Date
              </label>
              <input
                type="date"
                id="examDate"
                name="examDate"
                value={formData.examDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Total Students Field */}
            <div>
              <label htmlFor="totalStudents" className="block text-sm font-medium text-gray-700 mb-2">
                Total Students
              </label>
              <input
                type="number"
                id="totalStudents"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleInputChange}
                placeholder="Enter total students"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Average Score Field */}
            <div>
              <label htmlFor="averageScore" className="block text-sm font-medium text-gray-700 mb-2">
                Average Score
              </label>
              <input
                type="number"
                id="averageScore"
                name="averageScore"
                value={formData.averageScore}
                onChange={handleInputChange}
                placeholder="Enter average score"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
} 