'use client'
import React from 'react'
import PageLayout from '@/components/layout/PageLayout'

export default function AnnouncementsPage() {
  return (
    <PageLayout>
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Announcements</h2>
          <p className="text-sm md:text-base text-gray-600">Welcome to the Announcements section. Please select a specific page from the navigation.</p>
        </div>
      </div>
    </PageLayout>
  )
} 