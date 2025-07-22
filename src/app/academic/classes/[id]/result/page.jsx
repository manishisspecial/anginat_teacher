'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ClassResultPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id
  const [selectedExam, setSelectedExam] = useState('quarterly')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Mock class data
  const classData = {
    id: classId,
    class: 'X',
    section: 'A',
    totalStudents: 32,
    subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography']
  }

  // Mock exam data
  const exams = [
    { id: 'quarterly', name: 'Quarterly Examination', date: '15-Oct-2024' },
    { id: 'half-yearly', name: 'Half Yearly Examination', date: '15-Dec-2024' },
    { id: 'annual', name: 'Annual Examination', date: '15-Mar-2025' }
  ]

  // Mock student result data
  const students = Array.from({ length: classData.totalStudents }, (_, index) => ({
    id: `S${String(index + 1).padStart(3, '0')}`,
    name: `Student ${index + 1}`,
    rollNo: index + 1,
    results: {
      quarterly: {
        Mathematics: 85 + Math.floor(Math.random() * 15),
        Science: 80 + Math.floor(Math.random() * 20),
        English: 75 + Math.floor(Math.random() * 25),
        History: 70 + Math.floor(Math.random() * 30),
        Geography: 78 + Math.floor(Math.random() * 22)
      },
      'half-yearly': {
        Mathematics: 82 + Math.floor(Math.random() * 18),
        Science: 78 + Math.floor(Math.random() * 22),
        English: 80 + Math.floor(Math.random() * 20),
        History: 75 + Math.floor(Math.random() * 25),
        Geography: 76 + Math.floor(Math.random() * 24)
      },
      annual: {
        Mathematics: 88 + Math.floor(Math.random() * 12),
        Science: 85 + Math.floor(Math.random() * 15),
        English: 82 + Math.floor(Math.random() * 18),
        History: 78 + Math.floor(Math.random() * 22),
        Geography: 80 + Math.floor(Math.random() * 20)
      }
    }
  }))

  const getStudentResults = (studentId) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return {}
    return student.results[selectedExam] || {}
  }

  const calculateTotalMarks = (results) => {
    return Object.values(results).reduce((sum, mark) => sum + mark, 0)
  }

  const calculatePercentage = (totalMarks) => {
    return Math.round((totalMarks / (classData.subjects.length * 100)) * 100)
  }

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    return 'D'
  }

  const handleBack = () => {
    router.push('/academic/classes')
  }

  const currentExam = exams.find(exam => exam.id === selectedExam)
  const filteredStudents = students.map(student => {
    const results = getStudentResults(student.id)
    const totalMarks = calculateTotalMarks(results)
    const percentage = calculatePercentage(totalMarks)
    const grade = getGrade(percentage)
    
    return {
      ...student,
      results,
      totalMarks,
      percentage,
      grade
    }
  })

  // Calculate class statistics
  const classStats = {
    averagePercentage: Math.round(
      filteredStudents.reduce((sum, student) => sum + student.percentage, 0) / filteredStudents.length
    ),
    highestPercentage: Math.max(...filteredStudents.map(s => s.percentage)),
    lowestPercentage: Math.min(...filteredStudents.map(s => s.percentage)),
    totalStudents: filteredStudents.length
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
              <h1 className="text-2xl font-bold text-gray-900">Class {classData.class}-{classData.section} Results</h1>
              <p className="text-gray-600">View and manage student examination results</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {classData.totalStudents} Students
            </span>
          </div>
        </div>

        {/* Class Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('chart-bar')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Class Average</p>
                <p className="text-2xl font-bold text-green-600">{classStats.averagePercentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon('trophy')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Highest Score</p>
                <p className="text-2xl font-bold text-blue-600">{classStats.highestPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                {getIcon('trending-down')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Lowest Score</p>
                <p className="text-2xl font-bold text-orange-600">{classStats.lowestPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getIcon('users')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{classStats.totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam and Subject Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {classData.subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              <p>Exam Date: {currentExam?.date}</p>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Results</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Roll No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Student Name</th>
                    {selectedSubject === 'all' && classData.subjects.map(subject => (
                      <th key={subject} className="text-left py-3 px-4 font-semibold text-gray-900">{subject}</th>
                    ))}
                    {selectedSubject !== 'all' && (
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">{selectedSubject}</th>
                    )}
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{student.rollNo}</td>
                      <td className="py-3 px-4 text-gray-900">{student.name}</td>
                      
                      {selectedSubject === 'all' ? (
                        classData.subjects.map(subject => (
                          <td key={subject} className="py-3 px-4 text-gray-900">
                            {student.results[subject] || '-'}
                          </td>
                        ))
                      ) : (
                        <td className="py-3 px-4 text-gray-900">
                          {student.results[selectedSubject] || '-'}
                        </td>
                      )}
                      
                      <td className="py-3 px-4 text-gray-900 font-medium">{student.totalMarks}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          student.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.grade === 'A+' || student.grade === 'A' ? 'bg-green-100 text-green-800' :
                          student.grade === 'B+' || student.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Results
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Print Results
          </button>
        </div>
      </div>
    </PageLayout>
  )
} 