"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from './components/PersonalInformation/PersonalInformation'
import ParentInformation from './components/ParentInformation/ParentInformation'
import AcademicInformation from './components/AcademicInformation/AcademicInformation'
import AddressInformation from './components/AddressInformation/AddressInformation'

const AddStudentsPage = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('personalInformation')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        caste: "",
        bloodGroup: "",
        motherTongue: "",
        gender: "",
        profileImage: null,
        fatherName: "",
        motherName: "",
        contactNumber: "",
        motherOccupation: "",
        fatherEmail: "",
        admissionNo: "",
        academicYear: "",
        class: "",
        section: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        parentInformation: false,
        academicInformation: false,
        addressInformation: false
    })

    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'parentInformation', label: 'Parent Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const isFirstTab = currentTabIndex === 0
    const isLastTab = currentTabIndex === tabs.length - 1

    const isCurrentTabValid = () => {
        switch (activeTab) {
            case 'personalInformation':
                return formData.firstName &&
                    formData.lastName &&
                    formData.rollNumber &&
                    formData.phoneNumber &&
                    formData.email &&
                    formData.dateOfBirth &&
                    formData.caste &&
                    formData.bloodGroup &&
                    formData.motherTongue &&
                    formData.gender
            case 'parentInformation':
                return formData.fatherName &&
                    formData.motherName &&
                    formData.contactNumber &&
                    formData.motherOccupation &&
                    formData.fatherEmail
            case 'academicInformation':
                return formData.admissionNo &&
                    formData.academicYear &&
                    formData.class &&
                    formData.section
            case 'addressInformation':
                return formData.address &&
                    formData.city &&
                    formData.state &&
                    formData.country &&
                    formData.postalCode
            default:
                return false
        }
    }

    const handleNext = () => {
        if (isCurrentTabValid()) {
            setTabValidation(prev => ({
                ...prev,
                [activeTab]: true
            }))

            if (!isLastTab) {
                const nextTab = tabs[currentTabIndex + 1]
                setActiveTab(nextTab.key)
            }
        }
    }

    const handlePrevious = () => {
        if (!isFirstTab) {
            const prevTab = tabs[currentTabIndex - 1]
            setActiveTab(prevTab.key)
        }
    }

    const handleCancel = () => {
        router.push('/users/students')
    }

    const handleSubmit = async () => {
        if (!isCurrentTabValid()) return

        try {
            setLoading(true)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Submitting student data:', formData)
            alert('Student added successfully!')
            router.push('/students')
        } catch (error) {
            console.error('Error creating student:', error)
            alert('Failed to create student. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const updateFormData = (updates) => {
        setFormData(prev => ({
            ...prev,
            ...updates
        }))
    }

    const renderActiveComponent = () => {
        const commonProps = {
            formData,
            updateFormData,
            isEditMode: false // Set to false for view-only mode
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
        return null // No buttons in view-only mode
    }

    return (
        <PageLayout 
            customPadding='p-0' 
            rightContent={<RightComponent />}
            customTitle="Student Details"
            customBreadcrumbs={[
                { label: 'Home', path: '/', isBreadcrumb: true },
                { label: 'Users', path: '/users', isBreadcrumb: true },
                { label: 'Add student', path: '/users/students/add-students', isBreadcrumb: false, active: true }
            ]}
        >
            {/* Tabs */}
            <div className="flex px-6 py-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeTab === tab.key 
                                ? 'bg-blue-600 text-white' 
                                : 'text-black hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-12xl h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200" />

            {/* Main Content with Profile and Form */}
            <div className="p-6">
                {activeTab === 'personalInformation' ? (
                    // Two-column layout with Profile for Personal Information
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Profile Section - Left Side */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gray-0 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        {/* <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg> */}
                                    </div>
                                    {/* <p className="text-sm text-gray-500">No profile image</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Form Section - Right Side */}
                        <div className="lg:col-span-3">
                            {renderActiveComponent()}
                        </div>
                    </div>
                ) : (
                    // Full-width layout for other tabs (no Profile section)
                    <div className="w-full">
                        {renderActiveComponent()}
                    </div>
                )}
            </div>
        </PageLayout>
    )
}

export default AddStudentsPage