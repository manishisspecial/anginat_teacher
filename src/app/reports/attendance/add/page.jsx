'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function AddAttendancePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: '',
    class: '',
    section: '',
    numberOfStudents: '',
    present: '',
    absent: '',
    halfDay: ''
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
    console.log('Adding attendance:', formData)
    // Navigate back to attendance list
    router.push('/reports/attendance')
  }

  const handleCancel = () => {
    router.push('/reports/attendance')
  }

  return (
    <PageLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Attendance</h2>
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

            {/* No. of students Field */}
            <div>
              <label htmlFor="numberOfStudents" className="block text-sm font-medium text-gray-700 mb-2">
                No. of students
              </label>
              <input
                type="number"
                id="numberOfStudents"
                name="numberOfStudents"
                value={formData.numberOfStudents}
                onChange={handleInputChange}
                placeholder="Enter no. of students"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Present Field */}
            <div>
              <label htmlFor="present" className="block text-sm font-medium text-gray-700 mb-2">
                Present
              </label>
              <input
                type="number"
                id="present"
                name="present"
                value={formData.present}
                onChange={handleInputChange}
                placeholder="Enter no. of present students"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Absent Field */}
            <div>
              <label htmlFor="absent" className="block text-sm font-medium text-gray-700 mb-2">
                Absent
              </label>
              <input
                type="number"
                id="absent"
                name="absent"
                value={formData.absent}
                onChange={handleInputChange}
                placeholder="Enter no. of absent students"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Half Day Field */}
            <div>
              <label htmlFor="halfDay" className="block text-sm font-medium text-gray-700 mb-2">
                Half Day
              </label>
              <input
                type="number"
                id="halfDay"
                name="halfDay"
                value={formData.halfDay}
                onChange={handleInputChange}
                placeholder="Enter no. of half day students"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add attendance
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
} 