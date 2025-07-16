"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from './components/PersonalInformation/PersonalInformation'
import ExperienceInformation from './components/ExperienceInformation/ExperienceInformation'
import AcademicInformation from './components/AcademicInformation/AcademicInformation'
import AddressInformation from './components/AddressInformation/AddressInformation'

const AddTeachersPage = () => {
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
        totalWorkExperience: "",
        previousSchool: "",
        previousSchoolAddress: "",
        previousSchoolPhone: "",
        teacherId: "",
        dateOfJoining: "",
        class: "",
        subject: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        experienceInformation: false,
        academicInformation: false,
        addressInformation: false
    })

    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'experienceInformation', label: 'Experience Information' },
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
                    formData.qualification &&
                    formData.phoneNumber &&
                    formData.email &&
                    formData.dateOfBirth &&
                    formData.motherTongue &&
                    formData.gender
            case 'experienceInformation':
                return formData.totalWorkExperience &&
                    formData.previousSchool &&
                    formData.previousSchoolAddress &&
                    formData.previousSchoolPhone
            case 'academicInformation':
                return formData.teacherId &&
                    formData.dateOfJoining &&
                    formData.class &&
                    formData.subject
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
        router.push('/users/teachers')
    }

    const handleSubmit = async () => {
        if (!isCurrentTabValid()) return

        try {
            setLoading(true)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Submitting teacher data:', formData)
            alert('Teacher added successfully!')
            router.push('/teachers')
        } catch (error) {
            console.error('Error creating teacher:', error)
            alert('Failed to create teacher. Please try again.')
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
            case 'experienceInformation':
                return <ExperienceInformation {...commonProps} />
            case 'academicInformation':
                return <AcademicInformation {...commonProps} />
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
                        text={loading ? "Creating..." : "Add Teacher"}
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

export default AddTeachersPage