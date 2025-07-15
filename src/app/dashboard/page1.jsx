// app/dashboard/page.jsx
'use client'
import PageLayout from '@/components/layout/PageLayout'

export default function DashboardPage() {
  // Dashboard doesn't need custom breadcrumbs since it's handled automatically
  
  return (
    <PageLayout>
      <div className="">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-blue-100">Ready to continue your learning journey? You have 3 courses in progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">12</h3>
                <p className="text-sm text-gray-500">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">8</h3>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">3</h3>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">85%</h3>
                <p className="text-sm text-gray-500">Avg. Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Continue Learning</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    R
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">React Fundamentals</h4>
                    <p className="text-sm text-gray-500">Lesson 8 of 24</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Continue
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">JavaScript Advanced</h4>
                    <p className="text-sm text-gray-500">Lesson 15 of 32</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Continue
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    N
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">Node.js Backend</h4>
                    <p className="text-sm text-gray-500">Lesson 18 of 30</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">React Component Project</h4>
                    <p className="text-sm text-gray-500">Due: Tomorrow, 11:59 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Due Soon
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">JavaScript Quiz</h4>
                    <p className="text-sm text-gray-500">Due: June 25, 2025</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Upcoming
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Node.js Final Project</h4>
                    <p className="text-sm text-gray-500">Due: July 5, 2025</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    Later
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}