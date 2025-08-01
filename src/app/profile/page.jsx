'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import { Edit, Camera, Trash2, User, GraduationCap, Briefcase, MapPin, Lock } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { key: 'personal', label: 'Personal Information', icon: <User className="w-4 h-4" /> },
    { key: 'academic', label: 'Academic Information', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'address', label: 'Address Information', icon: <MapPin className="w-4 h-4" /> },
    { key: 'password', label: 'Password', icon: <Lock className="w-4 h-4" /> }
  ]

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInformationTab />
      case 'academic':
        return <AcademicInformationTab />
      case 'experience':
        return <ExperienceTab />
      case 'address':
        return <AddressInformationTab />
      case 'password':
        return <PasswordTab />
      default:
        return <PersonalInformationTab />
    }
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Top Navigation Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {renderTabContent()}
        </div>
      </div>
    </PageLayout>
  )
}

// Personal Information Tab Component
function PersonalInformationTab() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'First name',
    lastName: 'Last name',
    qualification: 'PhD',
    email: 'example@gmail.com',
    phone: '123456789',
    dateOfBirth: 'DD-MM-YYYY',
    gender: 'Male',
    motherTongue: 'Hindi'
  })

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleUpdate = (updatedData) => {
    setFormData(updatedData)
    setShowEditModal(false)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar - Photo Section */}
      <div className="w-full lg:w-80">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          
          {/* Photo Upload Area */}
          <div className="mb-6">
            <div className="w-32 h-40 mx-auto bg-white rounded-lg mb-6">
              {/* Simple white rectangle for photo placeholder */}
            </div>
            
            {/* Edit Photo Section */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-3 text-left">Edit your photo</h4>
              <div className="flex justify-between space-x-2">
                <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                  Update
                </button>
                <button className="flex-1 px-3 py-1.5 border border-blue-600 text-blue-600 text-xs rounded-md hover:bg-blue-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            <Button
              text="Edit"
              type="Primary"
              size="Compact"
              leadingIcon={<Edit className="w-4 h-4" />}
              onClick={handleEdit}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">First Name:</label>
                <span className="text-sm text-gray-900">{formData.firstName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Qualification:</label>
                <span className="text-sm text-gray-900">{formData.qualification}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Email:</label>
                <span className="text-sm text-gray-900">{formData.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Mother Tongue:</label>
                <span className="text-sm text-gray-900">{formData.motherTongue}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Last Name:</label>
                <span className="text-sm text-gray-900">{formData.lastName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Phone Number:</label>
                <span className="text-sm text-gray-900">{formData.phone}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Date of Birth:</label>
                <span className="text-sm text-gray-900">{formData.dateOfBirth}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-28">Gender:</label>
                <span className="text-sm text-gray-900">{formData.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditPersonalInformationModal
          formData={formData}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

// Academic Information Tab Component
function AcademicInformationTab() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    teacherId: 'First name',
    class: '10th',
    dateOfJoining: 'DD-MM-YYYY',
    subject: 'Subject Name'
  })

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleUpdate = (updatedData) => {
    setFormData(updatedData)
    setShowEditModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Academic Information</h2>
        <Button
          text="Edit"
          type="Primary"
          size="Compact"
          leadingIcon={<Edit className="w-4 h-4" />}
          onClick={handleEdit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32">Teacher ID:</label>
            <span className="text-sm text-gray-900">{formData.teacherId}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32">Class:</label>
            <span className="text-sm text-gray-900">{formData.class}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32">Date of Joining:</label>
            <span className="text-sm text-gray-900">{formData.dateOfJoining}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-32">Subject:</label>
            <span className="text-sm text-gray-900">{formData.subject}</span>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditAcademicInformationModal
          formData={formData}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

// Experience Tab Component
function ExperienceTab() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    totalExperience: '4 yrs',
    previousSchool: 'School Name',
    previousSchoolAddress: 'School Address',
    previousSchoolPhone: '4765890987'
  })

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleUpdate = (updatedData) => {
    setFormData(updatedData)
    setShowEditModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        <Button
          text="Edit"
          type="Primary"
          size="Compact"
          leadingIcon={<Edit className="w-4 h-4" />}
          onClick={handleEdit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-40">Total work experience:</label>
            <span className="text-sm text-gray-900">{formData.totalExperience}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-40">Previous school address:</label>
            <span className="text-sm text-gray-900">{formData.previousSchoolAddress}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-40">Previous school:</label>
            <span className="text-sm text-gray-900">{formData.previousSchool}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-40">Previous school phone:</label>
            <span className="text-sm text-gray-900">{formData.previousSchoolPhone}</span>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditExperienceModal
          formData={formData}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

// Address Information Tab Component
function AddressInformationTab() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    address: 'Door No.2-4-197/A, Cinema Road, Below Margadarsi Office, Pattiwar Complex,',
    city: 'Hyderabad',
    country: 'India',
    state: 'Telangana',
    postalCode: '500081'
  })

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleUpdate = (updatedData) => {
    setFormData(updatedData)
    setShowEditModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Address Information</h2>
        <Button
          text="Edit"
          type="Primary"
          size="Compact"
          leadingIcon={<Edit className="w-4 h-4" />}
          onClick={handleEdit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-4 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 w-32 mt-1">Address:</label>
          <span className="text-sm text-gray-900 flex-1">{formData.address}</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-32">City:</label>
          <span className="text-sm text-gray-900">{formData.city}</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-32">Country:</label>
          <span className="text-sm text-gray-900">{formData.country}</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-32">State:</label>
          <span className="text-sm text-gray-900">{formData.state}</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-32">Postal Code:</label>
          <span className="text-sm text-gray-900">{formData.postalCode}</span>
        </div>
      </div>

      {showEditModal && (
        <EditAddressInformationModal
          formData={formData}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

// Password Tab Component
function PasswordTab() {
  const [showChangeModal, setShowChangeModal] = useState(false)

  const handleChangePassword = () => {
    setShowChangeModal(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Password</h2>
        <Button
          text="Change"
          type="Primary"
          size="Compact"
          onClick={handleChangePassword}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-32">Current Password:</label>
          <span className="text-sm text-gray-900">********</span>
        </div>
      </div>

      {showChangeModal && (
        <ChangePasswordModal
          onClose={() => setShowChangeModal(false)}
        />
      )}
    </div>
  )
}

// Modal Components
function EditPersonalInformationModal({ formData, onUpdate, onClose }) {
  const [data, setData] = useState(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Personal Information</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => setData({...data, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => setData({...data, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <select
                value={data.qualification}
                onChange={(e) => setData({...data, qualification: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="PhD">PhD</option>
                <option value="Masters">Masters</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({...data, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <input
                  type="text"
                  value={data.dateOfBirth}
                  onChange={(e) => setData({...data, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="DD-MM-YYYY"
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
              <select
                value={data.motherTongue}
                onChange={(e) => setData({...data, motherTongue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => setData({...data, gender: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditAcademicInformationModal({ formData, onUpdate, onClose }) {
  const [data, setData] = useState(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Academic Information</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label>
              <input
                type="text"
                value={data.teacherId}
                onChange={(e) => setData({...data, teacherId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
              <div className="relative">
                <input
                  type="text"
                  value={data.dateOfJoining}
                  onChange={(e) => setData({...data, dateOfJoining: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="DD-MM-YYYY"
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={data.class}
                onChange={(e) => setData({...data, class: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={data.subject}
                onChange={(e) => setData({...data, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditExperienceModal({ formData, onUpdate, onClose }) {
  const [data, setData] = useState(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Experience</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Work Experience</label>
              <input
                type="text"
                value={data.totalExperience}
                onChange={(e) => setData({...data, totalExperience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 4 yrs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
              <input
                type="text"
                value={data.previousSchool}
                onChange={(e) => setData({...data, previousSchool: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter previous school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous School Address</label>
              <input
                type="text"
                value={data.previousSchoolAddress}
                onChange={(e) => setData({...data, previousSchoolAddress: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter previous school address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous School Phone</label>
              <input
                type="tel"
                value={data.previousSchoolPhone}
                onChange={(e) => setData({...data, previousSchoolPhone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter previous school phone"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditAddressInformationModal({ formData, onUpdate, onClose }) {
  const [data, setData] = useState(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Address Information</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => setData({...data, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={data.country}
                onChange={(e) => setData({...data, country: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                value={data.state}
                onChange={(e) => setData({...data, state: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={data.city}
                onChange={(e) => setData({...data, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vijayawada">Vijayawada</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={data.postalCode}
                onChange={(e) => setData({...data, postalCode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter postal code"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ChangePasswordModal({ onClose }) {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle password change logic here
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 