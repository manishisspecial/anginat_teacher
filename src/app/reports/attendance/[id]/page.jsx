'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { getIcon } from '@/components/icons/IconComponents'

export default function ViewAttendancePage() {
  const params = useParams()
  const router = useRouter()
  const attendanceId = params.id

  // Mock attendance data - in real app this would come from API
  const attendanceData = {
    id: attendanceId,
    class: 'X',
    section: 'A',
    students: 35,
    present: 28,
    absent: 5,
    halfDay: 2,
    date: '15-Jan-2025',
    teacher: 'John Doe',
    subjects: [
      { name: 'Mathematics', present: 30, absent: 3, halfDay: 2 },
      { name: 'Science', present: 32, absent: 2, halfDay: 1 },
      { name: 'English', present: 29, absent: 4, halfDay: 2 },
      { name: 'History', present: 31, absent: 2, halfDay: 2 }
    ]
  }

  const handleBack = () => {
    router.push('/reports/attendance')
  }

  const getAttendancePercentage = (present, total) => {
    return Math.round((present / total) * 100)
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
              <h1 className="text-2xl font-bold text-gray-900">Attendance Details</h1>
              <p className="text-gray-600">Class {attendanceData.class}-{attendanceData.section} - {attendanceData.date}</p>
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
                <p className="text-2xl font-bold text-blue-600">{attendanceData.students}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {getIcon('check-circle')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-bold text-green-600">{attendanceData.present}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                {getIcon('x-circle')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-bold text-red-600">{attendanceData.absent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                {getIcon('clock')}
              </div>
              <div>
                <p className="text-sm text-gray-500">Half Day</p>
                <p className="text-2xl font-bold text-yellow-600">{attendanceData.halfDay}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-semibold text-gray-900">{attendanceData.class}-{attendanceData.section}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">{attendanceData.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teacher</p>
              <p className="font-semibold text-gray-900">{attendanceData.teacher}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <p className="font-semibold text-green-600">{getAttendancePercentage(attendanceData.present, attendanceData.students)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent Rate</p>
              <p className="font-semibold text-red-600">{getAttendancePercentage(attendanceData.absent, attendanceData.students)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Half Day Rate</p>
              <p className="font-semibold text-yellow-600">{getAttendancePercentage(attendanceData.halfDay, attendanceData.students)}%</p>
            </div>
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Half Day</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{subject.name}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.present}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.absent}</td>
                      <td className="py-3 px-4 text-gray-900">{subject.halfDay}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getAttendancePercentage(subject.present, attendanceData.students) >= 80
                            ? 'bg-green-100 text-green-800'
                            : getAttendancePercentage(subject.present, attendanceData.students) >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {getAttendancePercentage(subject.present, attendanceData.students)}%
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