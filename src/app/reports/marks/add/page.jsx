'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function AddStudentMarksPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    admissionNo: '',
    name: '',
    subjects: [
      { name: '', marks: '' }
    ]
  })

  const [calculatedValues, setCalculatedValues] = useState({
    total: 0,
    percent: 0,
    grade: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects]
    updatedSubjects[index][field] = value
    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }))
    
    // Recalculate totals
    calculateTotals(updatedSubjects)
  }

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', marks: '' }]
    }))
  }

  const removeSubject = (index) => {
    if (formData.subjects.length > 1) {
      const updatedSubjects = formData.subjects.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        subjects: updatedSubjects
      }))
      calculateTotals(updatedSubjects)
    }
  }

  const calculateTotals = (subjects) => {
    const totalMarks = subjects.reduce((sum, subject) => {
      const marks = parseInt(subject.marks) || 0
      return sum + marks
    }, 0)
    
    const totalSubjects = subjects.length
    const percent = totalSubjects > 0 ? Math.round((totalMarks / (totalSubjects * 100)) * 100) : 0
    
    let grade = ''
    if (percent >= 90) grade = 'A+'
    else if (percent >= 80) grade = 'A'
    else if (percent >= 70) grade = 'B+'
    else if (percent >= 60) grade = 'B'
    else if (percent >= 50) grade = 'C'
    else if (percent >= 40) grade = 'D'
    else grade = 'F'
    
    setCalculatedValues({
      total: totalMarks,
      percent: percent,
      grade: grade
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.admissionNo || !formData.name) {
      alert('Please fill in all required fields')
      return
    }
    
    if (formData.subjects.some(subject => !subject.name || !subject.marks)) {
      alert('Please fill in all subject names and marks')
      return
    }
    
    // Handle form submission
    console.log('Adding student marks:', {
      ...formData,
      calculatedValues
    })
    
    // Navigate back to marks list
    router.push('/reports/marks')
  }

  const handleCancel = () => {
    router.push('/reports/marks')
  }

  return (
    <PageLayout>
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Student Marks</h2>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="admissionNo" className="block text-sm font-medium text-gray-700 mb-2">
                  Admission No.
                </label>
                <input
                  type="text"
                  id="admissionNo"
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleInputChange}
                  placeholder="Enter admission no."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Subject Marks */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Subject Marks</h3>
              
              {formData.subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject {index + 1}
                    </label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      placeholder="Enter subject 1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marks Subject {index + 1}
                    </label>
                    <input
                      type="number"
                      value={subject.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      placeholder="Enter subject 1 marks"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Add Subject Button */}
              <button
                type="button"
                onClick={addSubject}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Subject
              </button>
            </div>

            {/* Calculated Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total
                </label>
                <input
                  type="text"
                  value={calculatedValues.total}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percent
                </label>
                <input
                  type="text"
                  value={calculatedValues.percent}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  value={calculatedValues.grade}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add student marks
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  )
} 