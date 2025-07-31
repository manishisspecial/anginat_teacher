
import React, { useState, useEffect } from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import FileUpload from '@/components/reusableComponents/upload/FileUpload'
import Button from '@/components/reusableComponents/buttons/Button'
import { usePersonalInformationFetch } from './PersonalInformationFetch'

const PersonalInformationSwapComponent = ({ formData, updateFormData, isEditMode = false, isReadOnly = false }) => {
    const {
        motherTongueOptions,
        genderOptions,
        warningMessage,
        handleInputChange,
        handleDropdownChange,
        handleFileSelect,
        handleFileError
    } = usePersonalInformationFetch({ formData, updateFormData })

    const [profilePreview, setProfilePreview] = useState(null)
    const [isLoadingPreview, setIsLoadingPreview] = useState(false)

    // Generate profile preview when file changes
    useEffect(() => {
        if (formData.profileImage) {
            if (formData.profileImage instanceof File) {
                // New file selected - create preview
                setIsLoadingPreview(true)
                const reader = new FileReader()
                reader.onload = (e) => {
                    setProfilePreview(e.target.result)
                    setIsLoadingPreview(false)
                }
                reader.onerror = () => {
                    setIsLoadingPreview(false)
                    setProfilePreview(null)
                }
                reader.readAsDataURL(formData.profileImage)
            } else if (typeof formData.profileImage === 'string' && formData.profileImage.length > 0) {
                // Existing profile URL from server
                setProfilePreview(formData.profileImage)
                setIsLoadingPreview(false)
            }
        } else {
            setProfilePreview(null)
            setIsLoadingPreview(false)
        }
    }, [formData.profileImage])

    const handleProfileSelect = (files) => {
        handleFileSelect(files)
    }

    const handleProfileError = (error) => {
        setProfilePreview(null)
        handleFileError(error)
    }

    const removeProfile = () => {
        setProfilePreview(null)
        updateFormData({ profileImage: null })
    }

    // Check if we have an existing profile URL
    const hasExistingProfile = formData.profileImage && typeof formData.profileImage === 'string'

        return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                {/* Left Column */}
                <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">First Name</span>
                        <span className="text-sm text-gray-900">{formData.firstName || 'First name'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Roll Number</span>
                        <span className="text-sm text-gray-900">{formData.rollNumber || '123456789'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Email</span>
                        <span className="text-sm text-gray-900">{formData.email || 'example@gmail.com'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Caste</span>
                        <span className="text-sm text-gray-900">{formData.caste || 'General'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Mother Tongue</span>
                        <span className="text-sm text-gray-900">{formData.motherTongue || 'Hindi'}</span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Last Name</span>
                        <span className="text-sm text-gray-900">{formData.lastName || 'Last name'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Phone</span>
                        <span className="text-sm text-gray-900">{formData.phoneNumber || '123456789'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Date of Birth</span>
                        <span className="text-sm text-gray-900">{formData.dateOfBirth || 'DD-MM-YYYY'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Blood Group</span>
                        <span className="text-sm text-gray-900">{formData.bloodGroup || 'B+'}</span>
                    </div>
                    
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Gender</span>
                        <span className="text-sm text-gray-900">{formData.gender || 'Male'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInformationSwapComponent