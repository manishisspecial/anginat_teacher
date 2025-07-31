'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Topbar from './Topbar'
import ActiveTab from './ActiveTab'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, loading, isInitialized } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(null)
  
  // Define which pages don't require authentication
  const isAuthPage = pathname?.startsWith('/login') || 
                     pathname?.startsWith('/register') || 
                     pathname?.startsWith('/forgot-password')
  
  // Define public pages that don't require authentication
  const isPublicPage = isAuthPage || pathname === '/'

  useEffect(() => {
    // Wait for auth context to be properly initialized
    if (isInitialized) {
      setIsChecking(false)
    }
  }, [isInitialized])

  useEffect(() => {
    // Don't redirect if we're still checking, not initialized, or on public pages
    if (isChecking || !isInitialized || loading) return

    // Handle home page redirect
    if (pathname === '/') {
      const targetPath = isAuthenticated() ? '/dashboard' : '/login'
      setShouldRedirect(targetPath)
      return
    }

    // Set redirect target instead of immediately navigating
    if (!isAuthenticated()) {
      setShouldRedirect('/login')
      return
    }

    // Redirect authenticated users away from auth pages
    if (isAuthenticated() && isAuthPage) {
      setShouldRedirect('/dashboard')
      return
    }
  }, [isAuthenticated, isAuthPage, isPublicPage, pathname, isChecking, loading, isInitialized])

  // Handle redirects in a separate effect to avoid render-time navigation
  useEffect(() => {
    if (shouldRedirect) {
      const timeoutId = setTimeout(() => {
        router.push(shouldRedirect)
        setShouldRedirect(null)
      }, 0)
      
      return () => clearTimeout(timeoutId)
    }
  }, [shouldRedirect, router])

  // Show loading spinner while checking authentication
  if (isChecking || !isInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Render auth pages without navigation
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  // For home page, show loading while redirecting
  if (pathname === '/') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  // All protected pages get Topbar + ActiveTab + children
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <ActiveTab />
      <main className="bg-gray-50">
        {children}
      </main>
    </div>
  )
}