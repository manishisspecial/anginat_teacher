// app/not-found.js
'use client'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    router.push('/dashboard')
  }

  return (
    // <PageLayout
    //   customTitle="Page Not Found"
    //   showIcon={false}
    //   customIcon="error"
    //   customBreadcrumbs={customBreadcrumbs}
    // //   showIcon={true}
    // >
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.529.901-6.172 2.379l1.172 1.172a6 6 0 018-8.485V6.5L12 4l-3 2.5v3.515z" 
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Don&apos;t worry, it happens to the best of us.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              ← Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🏠 Go to Dashboard
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => router.push('/academic/course/courses')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    // </PageLayout>
  )
}