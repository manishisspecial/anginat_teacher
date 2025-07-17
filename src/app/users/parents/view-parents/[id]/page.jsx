"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from '../../add-parents/components/PersonalInformation/PersonalInformation'
import ChildInformation from '../../add-parents/components/ChildInformation/ChildInformation'
import AddressInformation from '../../add-parents/components/AddressInformation/AddressInformation'

const ViewParentPage = ({ params }) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('personalInformation')

    // Mock data for the parent being viewed
    const [parentData] = useState({
        firstName: "First name",
        lastName: "Last name",
        phoneNumber: "123456789",
        email: "example@gmail.com",
        dateOfBirth: "DD-MM-YYYY",
        qualification: "Post Grad",
        motherTongue: "Hindi",
        gender: "Male",
        profileImage: null,
        studentId: "243576",
        dateOfJoining: "DD-MM-YYYY",
        class: "10th",
        subject: "Subject Name",
        address: "Door No.2-4-197/A, Cinema Road, Below Margadarsi Office, Pattiwar Complex,",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        postalCode: "500081"
    })

    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'childInformation', label: 'Child Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const handleBack = () => {
        router.push('/users/parents')
    }

    const renderActiveComponent = () => {
        const commonProps = {
            formData: parentData,
            updateFormData: () => {}, // No-op for read-only
            isReadOnly: true
        }

        switch (activeTab) {
            case 'personalInformation':
                return <PersonalInformation {...commonProps} />
            case 'childInformation':
                return <ChildInformation {...commonProps} />
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

export default ViewParentPage 