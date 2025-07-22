'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ResultDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const resultId = params.id

  // Mock result data - in real app this would come from API
  const resultData = {
    id: resultId,
    studentName: 'Student name',
    admissionNo: resultId,
    examName: 'Quarterly Examination',
    examDate: '15-Oct-2024',
    totalMarks: 500,
    obtainedMarks: 385,
    percentage: 77,
    grade: 'B',
    result: 'PASS',
    subjects: [
      { name: 'Mathematics', marks: 85, total: 100, percentage: 85 },
      { name: 'Science', marks: 78, total: 100, percentage: 78 },
      { name: 'English', marks: 82, total: 100, percentage: 82 },
      { name: 'History', marks: 75, total: 100, percentage: 75 },
      { name: 'Geography', marks: 65, total: 100, percentage: 65 }
    ]
  }

  const handleBack = () => {
    router.push('/academic/exams/result')
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800'
      case 'B': return 'bg-blue-100 text-blue-800'
      case 'C': return 'bg-yellow-100 text-yellow-800'
      case 'D': return 'bg-orange-100 text-orange-800'
      case 'F': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getResultColor = (result) => {
    return result === 'PASS' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Result Details</h1>
              <p className="text-gray-600">Detailed examination results for {resultData.studentName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(resultData.result)}`}>
              {resultData.result}
            </span>
          </div>
        </div>

        {/* Result Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon('user')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Student Name</p>
                <p className="font-semibold text-gray-900">{resultData.studentName}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('trophy')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Marks</p>
                <p className="text-2xl font-bold text-green-600">{resultData.obtainedMarks}/{resultData.totalMarks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getIcon('chart-bar')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Percentage</p>
                <p className="text-2xl font-bold text-purple-600">{resultData.percentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                {getIcon('academic-cap')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Grade</p>
                <p className="text-2xl font-bold text-orange-600">{resultData.grade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Exam Name</p>
              <p className="font-semibold text-gray-900">{resultData.examName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exam Date</p>
              <p className="font-semibold text-gray-900">{resultData.examDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admission No</p>
              <p className="font-semibold text-gray-900">{resultData.admissionNo}</p>
            </div>
          </div>
        </div>

        {/* Subject-wise Results */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Results</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Marks Obtained</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Marks</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData.subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{subject.name}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.marks}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.total}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.percentage}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade || 'B')}`}>
                          {subject.grade || 'B'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Print Result
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Download PDF
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Share Result
          </button>
        </div>
      </div>
    </PageLayout>
  )
} 