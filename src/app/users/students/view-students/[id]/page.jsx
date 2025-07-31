"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from '../../add-students/components/PersonalInformation/PersonalInformation'
import ParentInformation from '../../add-students/components/ParentInformation/ParentInformation'
import AcademicInformation from '../../add-students/components/AcademicInformation/AcademicInformation'
import AddressInformation from '../../add-students/components/AddressInformation/AddressInformation'

const ViewStudentPage = ({ params }) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('personalInformation')

    // Mock data for the student being viewed
    const [studentData] = useState({
        firstName: "First name",
        lastName: "Last name",
        phoneNumber: "123456789",
        email: "example@gmail.com",
        dateOfBirth: "DD-MM-YYYY",
        qualification: "Post Grad",
        motherTongue: "Hindi",
        gender: "Male",
        profileImage: null,
        parentName: "Parent Name",
        parentPhone: "9876543210",
        parentEmail: "parent@example.com",
        parentOccupation: "Engineer",
        admissionNo: "AD101",
        rollNo: "1",
        class: "10th",
        section: "A",
        dateOfJoining: "DD-MM-YYYY",
        address: "Door No.2-4-197/A, Cinema Road, Below Margadarsi Office, Pattiwar Complex,",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        postalCode: "500081"
    })

    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'parentInformation', label: 'Parent Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const handleBack = () => {
        router.push('/users/students')
    }

    const renderActiveComponent = () => {
        const commonProps = {
            formData: studentData,
            updateFormData: () => {}, // No-op for read-only
            isReadOnly: true
        }

        switch (activeTab) {
            case 'personalInformation':
                return <PersonalInformation {...commonProps} />
            case 'parentInformation':
                return <ParentInformation {...commonProps} />
            case 'academicInformation':
                return <AcademicInformation {...commonProps} />
            case 'addressInformation':
                return <AddressInformation {...commonProps} />
            default:
                return <PersonalInformation {...commonProps} />
        }
    }

    const RightComponent = () => {
        return (
            <div className="flex flex-row gap-4">
                <Button
                    text="Back"
                    type="Secondary"
                    onClick={handleBack}
                />
            </div>
        )
    }

    return (
        <PageLayout customPadding='p-0' rightContent={<RightComponent />}>
            {/* Tabs - Mobile responsive */}
            <div className="flex flex-wrap px-4 sm:px-6 py-3 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                            activeTab === tab.key 
                                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-12xl h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200" />

            <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Left Sidebar - Profile Section - Only show for Personal Information */}
                    {activeTab === 'personalInformation' && (
                        <div className="w-full lg:w-80">
                            <div className="bg-white rounded-lg shadow p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
                                <div className="space-y-2">
                                    {/* Empty content area as shown in the design */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Main Content */}
                    <div className={`${activeTab === 'personalInformation' ? 'flex-1' : 'w-full'}`}>
                        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                            {renderActiveComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default ViewStudentPage 