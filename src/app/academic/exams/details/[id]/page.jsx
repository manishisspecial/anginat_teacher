'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ExamDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const examId = params.id

  // Mock exam data - in real app this would come from API
  const examData = {
    id: examId,
    examName: 'Quarterly Examination',
    class: 'X',
    examDate: '15-Jan-2025',
    status: 'In Progress',
    duration: '3 hours',
    totalMarks: 100,
    subjects: ['Mathematics', 'Science', 'English', 'History'],
    description: 'First quarterly examination for Class X students covering all major subjects.',
    instructions: [
      'Students must bring their own stationery',
      'No electronic devices allowed',
      'Arrive 30 minutes before exam time',
      'Valid ID card required'
    ]
  }

  const handleBack = () => {
    router.push('/academic/exams')
  }

  return (
    <PageLayout>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {getIcon('arrow-left')}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Exam Details</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              examData.status === 'In Progress' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {examData.status}
            </span>
          </div>
        </div>

        {/* Exam Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon('document')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Exam Name</p>
                <p className="font-semibold text-gray-900">{examData.examName}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('users')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-semibold text-gray-900">{examData.class}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getIcon('calendar')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Exam Date</p>
                <p className="font-semibold text-gray-900">{examData.examDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                {getIcon('clock')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{examData.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exam Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900 mt-1">{examData.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Marks</p>
                <p className="text-gray-900 mt-1">{examData.totalMarks} marks</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subjects</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {examData.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
            <div className="space-y-3">
              {examData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Exam
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            View Results
          </button>
          <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Delete Exam
          </button>
        </div>
      </div>
    </PageLayout>
  )
} 