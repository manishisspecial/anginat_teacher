'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ClassAttendancePage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState({})

  // Mock class data
  const classData = {
    id: classId,
    class: 'X',
    section: 'A',
    totalStudents: 32,
    subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography']
  }

  // Mock student data
  const students = Array.from({ length: classData.totalStudents }, (_, index) => ({
    id: `S${String(index + 1).padStart(3, '0')}`,
    name: `Student ${index + 1}`,
    rollNo: index + 1,
    attendance: Math.random() > 0.2 ? 'present' : 'absent' // Random attendance for demo
  }))

  // Mock attendance data for the selected date
  const getAttendanceForDate = (date) => {
    return students.map(student => ({
      ...student,
      status: attendanceData[`${student.id}-${date}`] || student.attendance
    }))
  }

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [`${studentId}-${selectedDate}`]: status
    }))
  }

  const handleSaveAttendance = () => {
    console.log('Saving attendance for date:', selectedDate, attendanceData)
    // In real app, this would save to API
    alert('Attendance saved successfully!')
  }

  const handleBack = () => {
    router.push('/academic/classes')
  }

  const currentAttendance = getAttendanceForDate(selectedDate)
  const presentCount = currentAttendance.filter(s => s.status === 'present').length
  const absentCount = currentAttendance.filter(s => s.status === 'absent').length

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
              <h1 className="text-2xl font-bold text-gray-900">Class {classData.class}-{classData.section} Attendance</h1>
              <p className="text-gray-600">Manage student attendance for this class</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {classData.totalStudents} Students
            </span>
          </div>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('users')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Present Today</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                {getIcon('user-minus')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon('calendar')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((presentCount / classData.totalStudents) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getIcon('book-open')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{classData.totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveAttendance}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Attendance
              </button>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13C0 12.5938 0.3125 12.25 0.75 12.25H2.59375C2.90625 11.25 3.875 10.5 5 10.5C6.09375 10.5 7.0625 11.25 7.375 12.25H15.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H7.375C7.0625 14.7812 6.09375 15.5 5 15.5C3.875 15.5 2.90625 14.7812 2.59375 13.75H0.75C0.3125 13.75 0 13.4375 0 13ZM6 13C6 12.4688 5.53125 12 5 12C4.4375 12 4 12.4688 4 13C4 13.5625 4.4375 14 5 14C5.53125 14 6 13.5625 6 13ZM11 5.5C12.0938 5.5 13.0625 6.25 13.375 7.25H15.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H13.375C13.0625 9.78125 12.0938 10.5 11 10.5C9.875 10.5 8.90625 9.78125 8.59375 8.75H0.75C0.3125 8.75 0 8.4375 0 8C0 7.59375 0.3125 7.25 0.75 7.25H8.59375C8.90625 6.25 9.875 5.5 11 5.5ZM12 8C12 7.46875 11.5312 7 11 7C10.4375 7 10 7.46875 10 8C10 8.5625 10.4375 9 11 9C11.5312 9 12 8.5625 12 8ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H8.375C8.0625 4.78125 7.09375 5.5 6 5.5C4.875 5.5 3.90625 4.78125 3.59375 3.75H0.75C0.3125 3.75 0 3.4375 0 3C0 2.59375 0.3125 2.25 0.75 2.25H3.59375C3.90625 1.25 4.875 0.5 6 0.5C7.09375 0.5 8.0625 1.25 8.375 2.25H15.25ZM5 3C5 3.5625 5.4375 4 6 4C6.53125 4 7 3.5625 7 3C7 2.46875 6.53125 2 6 2C5.4375 2 5 2.46875 5 3Z" fill="#0364F3"/>
                  </svg>
                  Filters
                </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Attendance</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Roll No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Student Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAttendance.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{student.rollNo}</td>
                      <td className="py-3 px-4 text-gray-900">{student.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'present' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status === 'present' ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              student.status === 'present'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              student.status === 'absent'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                            }`}
                          >
                            Absent
                          </button>
                        </div>
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