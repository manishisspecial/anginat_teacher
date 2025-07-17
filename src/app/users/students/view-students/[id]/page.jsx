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
            <div className="flex px-6 py-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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

            <div className="p-6">
                {renderActiveComponent()}
            </div>
        </PageLayout>
    )
}

export default ViewStudentPage 