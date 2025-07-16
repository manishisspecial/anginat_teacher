"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from './components/PersonalInformation/PersonalInformation'
import AcademicInformation from './components/AcademicInformation/AcademicInformation'
import Experience from './components/Experience/Experience'
import AddressInformation from './components/AddressInformation/AddressInformation'

const AddStaffPage = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('personalInformation')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        qualification: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        motherTongue: "",
        gender: "",
        profileImage: null,
        staffId: "",
        dateOfJoining: "",
        designation: "",
        totalWorkExperience: "",
        previousSchool: "",
        previousSchoolAddress: "",
        previousSchoolPhone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        academicInformation: false,
        experience: false,
        addressInformation: false
    })

    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'experience', label: 'Experience' },
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
                    formData.qualification &&
                    formData.phoneNumber &&
                    formData.email &&
                    formData.dateOfBirth &&
                    formData.motherTongue &&
                    formData.gender
            case 'academicInformation':
                return formData.staffId &&
                    formData.dateOfJoining &&
                    formData.designation
            case 'experience':
                return formData.totalWorkExperience &&
                    formData.previousSchool &&
                    formData.previousSchoolAddress &&
                    formData.previousSchoolPhone
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
        router.push('/users/staff')
    }

    const handleSubmit = async () => {
        if (!isCurrentTabValid()) return

        try {
            setLoading(true)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Submitting staff data:', formData)
            alert('Staff member added successfully!')
            router.push('/users/staff')
        } catch (error) {
            console.error('Error creating staff:', error)
            alert('Failed to create staff member. Please try again.')
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
            updateFormData
        }

        switch (activeTab) {
            case 'personalInformation':
                return <PersonalInformation {...commonProps} />
            case 'academicInformation':
                return <AcademicInformation {...commonProps} />
            case 'experience':
                return <Experience {...commonProps} />
            case 'addressInformation':
                return <AddressInformation {...commonProps} />
            default:
                return <PersonalInformation {...commonProps} />
        }
    }

    const RightComponent = () => {
        const isNextDisabled = !isCurrentTabValid()

        return (
            <div className="flex flex-row gap-4">
                <Button
                    text="Cancel"
                    type="Secondary"
                    onClick={handleCancel}
                    disabled={loading}
                />

                {!isFirstTab && (
                    <Button
                        text="Previous"
                        type="Secondary"
                        onClick={handlePrevious}
                        disabled={loading}
                    />
                )}

                {!isLastTab ? (
                    <Button
                        text="Next"
                        type="Primary"
                        onClick={handleNext}
                        state={isNextDisabled ? "Disabled" : "Hover"}
                    />
                ) : (
                    <Button
                        text={loading ? "Creating..." : "Add Staff"}
                        type="Primary"
                        onClick={handleSubmit}
                        state={isNextDisabled ? "Disabled" : "Hover"}
                    />
                )}
            </div>
        )
    }

    return (
        <PageLayout customPadding='p-0' rightContent={<RightComponent />}>
            <div className="flex px-6 py-3">
                {tabs.map((tab) => (
                    <Button
                        key={tab.key}
                        text={tab.label}
                        type="Tertiary"
                        size="Compact"
                        state={activeTab === tab.key ? 'Hover' : 'Disabled'}
                        onClick={() => setActiveTab(tab.key)}
                    />
                ))}
            </div>

            <div className="w-full max-w-12xl h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200" />

            <div className="p-6">
                {renderActiveComponent()}
            </div>
        </PageLayout>
    )
}

export default AddStaffPage