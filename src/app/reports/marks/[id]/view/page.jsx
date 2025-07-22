'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ViewMarksPage() {
  const params = useParams()
  const router = useRouter()
  const marksId = params.id

  // Mock marks data - in real app this would come from API
  const marksData = {
    id: marksId,
    examName: 'Quarterly Examination',
    class: 'X',
    section: 'A',
    status: 'COMPLETED',
    examDate: '15-Oct-2024',
    totalStudents: 35,
    averageScore: 78.5,
    highestScore: 95,
    lowestScore: 45,
    subjects: [
      { name: 'Mathematics', average: 82, highest: 98, lowest: 52 },
      { name: 'Science', average: 75, highest: 92, lowest: 48 },
      { name: 'English', average: 80, highest: 95, lowest: 55 },
      { name: 'History', average: 76, highest: 90, lowest: 50 }
    ],
    students: [
      { id: 'ST001', name: 'John Doe', total: 85, percentage: 85, grade: 'A' },
      { id: 'ST002', name: 'Jane Smith', total: 78, percentage: 78, grade: 'B' },
      { id: 'ST003', name: 'Mike Johnson', total: 92, percentage: 92, grade: 'A' },
      { id: 'ST004', name: 'Sarah Wilson', total: 65, percentage: 65, grade: 'C' },
      { id: 'ST005', name: 'David Brown', total: 88, percentage: 88, grade: 'A' }
    ]
  }

  const handleBack = () => {
    router.push('/reports/marks')
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
              <h1 className="text-2xl font-bold text-gray-900">Marks Details</h1>
              <p className="text-gray-600">{marksData.examName} - Class {marksData.class}-{marksData.section}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Print Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon('users')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{marksData.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('chart-bar')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-green-600">{marksData.averageScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getIcon('trophy')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Highest Score</p>
                <p className="text-2xl font-bold text-purple-600">{marksData.highestScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                {getIcon('exclamation')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Lowest Score</p>
                <p className="text-2xl font-bold text-orange-600">{marksData.lowestScore}%</p>
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
              <p className="font-semibold text-gray-900">{marksData.examName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Class & Section</p>
              <p className="font-semibold text-gray-900">{marksData.class}-{marksData.section}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exam Date</p>
              <p className="font-semibold text-gray-900">{marksData.examDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-green-600">{marksData.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="font-semibold text-gray-900">{marksData.totalStudents}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="font-semibold text-green-600">{marksData.averageScore}%</p>
            </div>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Average</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Highest</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Lowest</th>
                </tr>
              </thead>
              <tbody>
                {marksData.subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{subject.name}</td>
                    <td className="py-3 px-4 text-gray-900">{subject.average}%</td>
                    <td className="py-3 px-4 text-gray-900">{subject.highest}%</td>
                    <td className="py-3 px-4 text-gray-900">{subject.lowest}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Results */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Results</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Student ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Marks</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.students.map((student, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{student.id}</td>
                      <td className="py-3 px-4 text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-gray-900">{student.total}</td>
                      <td className="py-3 px-4 text-gray-900">{student.percentage}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                          {student.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 