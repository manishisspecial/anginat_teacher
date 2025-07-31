import React, { useState, useEffect } from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import FileUpload from '@/components/reusableComponents/upload/FileUpload'
import Button from '@/components/reusableComponents/buttons/Button'
import { usePersonalInformationFetch } from './PersonalInformationFetch'

const PersonalInformationSwapComponent = ({ formData, updateFormData, isReadOnly = false }) => {
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
        <div className='w-full'>
            {isReadOnly ? (
                // Read-only display as plain text
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">First Name:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.firstName || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Last Name:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.lastName || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Qualification:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.qualification || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Phone:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.phoneNumber || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Email:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.email || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Date of Birth:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.dateOfBirth || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Mother Tongue:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.motherTongue || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Gender:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.gender || ''}</span>
                    </div>
                </div>
            ) : (
                // Editable form fields
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        actionType='text'
                        label='First Name'
                        placeholder='Enter First Name'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.firstName || ''}
                        onChange={(value) => handleInputChange('firstName', value)}
                    />

                    <Input
                        actionType='text'
                        label='Last Name'
                        placeholder='Enter Last Name'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.lastName || ''}
                        onChange={(value) => handleInputChange('lastName', value)}
                    />

                    <Input
                        actionType='text'
                        label='Qualification'
                        placeholder='Enter Qualification'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.qualification || ''}
                        onChange={(value) => handleInputChange('qualification', value)}
                    />

                    <Input
                        actionType='text'
                        label='Phone Number'
                        placeholder='Enter Phone Number'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.phoneNumber || ''}
                        onChange={(value) => handleInputChange('phoneNumber', value)}
                    />

                    <Input
                        actionType='text'
                        label='Email'
                        placeholder='Enter Email'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.email || ''}
                        onChange={(value) => handleInputChange('email', value)}
                    />

                    <Input
                        actionType='date'
                        label='Date of Birth'
                        placeholder='Enter Date of Birth'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.dateOfBirth || ''}
                        onChange={(value) => handleInputChange('dateOfBirth', value)}
                    />

                    <Input
                        actionType='dropdown'
                        label='Mother Tongue'
                        placeholder='Select Mother Tongue'
                        options={motherTongueOptions}
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.motherTongue || ''}
                        onSelect={(option) => handleDropdownChange('motherTongue', option)}
                        onChange={(option) => handleDropdownChange('motherTongue', option)}
                    />

                    <Input
                        actionType='dropdown'
                        label='Gender'
                        placeholder='Select Gender'
                        options={genderOptions}
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.gender || ''}
                        onSelect={(option) => handleDropdownChange('gender', option)}
                        onChange={(option) => handleDropdownChange('gender', option)}
                    />
                </div>
            )}
        </div>
    )
}

export default PersonalInformationSwapComponent