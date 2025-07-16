import React, { useState, useEffect } from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import FileUpload from '@/components/reusableComponents/upload/FileUpload'
import Button from '@/components/reusableComponents/buttons/Button'
import { usePersonalInformationFetch } from './PersonalInformationFetch'

const PersonalInformationSwapComponent = ({ formData, updateFormData }) => {
    const {
        motherTongueOptions,
        genderOptions,
        warningMessage,
        handleInputChange,
        handleDropdownChange,
        handleEmailChange,
        handlePhoneChange,
        handleFileSelect,
        handleFileError,
        validateEmail,
        validatePhoneNumber
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
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6'>
            {/* Profile Image Section - Left Column */}
            <div className="col-span-1 md:col-span-12 lg:col-span-3">
                <div className="w-full h-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        
                        {/* Warning Message */}
                        {warningMessage && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{warningMessage}</p>
                            </div>
                        )}

                        {/* Profile Preview Section */}
                        <div className="w-full max-w-[300px] md:max-w-full rounded overflow-hidden">
                            <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {isLoadingPreview ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                        <span className="text-sm text-gray-500">Loading...</span>
                                    </div>
                                ) : profilePreview ? (
                                    <div className="relative w-full h-full p-2">
                                        <img 
                                            src={profilePreview} 
                                            alt="Profile Preview" 
                                            className="w-full h-full object-cover rounded-md"
                                            onError={() => {
                                                console.error('Failed to load profile:', profilePreview)
                                                setProfilePreview(null)
                                            }}
                                        />
                                        <button
                                            onClick={removeProfile}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                            title="Remove profile picture"
                                        >
                                            ×
                                        </button>
                                        {/* Show profile type indicator */}
                                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                            {formData.profileImage instanceof File ? 'New' : 'Current'}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                        <p className="text-sm">No profile image</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File Upload */}
                        <FileUpload
                            acceptedFileTypes={['.jpg', '.jpeg', '.png', '.gif']}
                            maxFileSize={0.5}
                            multiple={false}
                            uploadText={hasExistingProfile ? "Upload new image to replace current picture" : "Drag and drop image or click to upload"}
                            description="Please ensure the image file is less than 500KB. Supported formats: JPG, PNG, GIF"
                            width="w-full"
                            height="h-20"
                            className="w-full"
                            borderStyle="dashed"
                            onFileSelect={handleProfileSelect}
                            onFileError={handleProfileError}
                        />

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                            <Button 
                                type="Primary"
                                size="Compact"
                                state="Default"
                                text="Update"
                                onClick={() => document.querySelector('input[type="file"]')?.click()}
                            />
                            
                            <Button 
                                type="Secondary"
                                size="Compact"
                                state="Default"
                                text="Delete"
                                onClick={removeProfile}
                                disabled={!profilePreview}
                            />
                        </div>

                        {/* Profile Info */}
                        {profilePreview && formData.profileImage && (
                            <div className="text-xs text-gray-500 space-y-1">
                                {formData.profileImage instanceof File ? (
                                    <>
                                        <p className="font-semibold text-green-600">New File:</p>
                                        <p>Name: {formData.profileImage.name}</p>
                                        <p>Size: {(formData.profileImage.size / 1024).toFixed(1)} KB</p>
                                        <p>Type: {formData.profileImage.type}</p>
                                    </>
                                ) : (
                                    <p className="font-semibold text-blue-600">Current Profile Picture</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Personal Information Form - Right Column */}
            <div className='col-span-1 md:col-span-12 lg:col-span-9 grid grid-rows-1 gap-4 md:gap-8'>
                <div className="w-full">
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
                            onChange={(value) => handlePhoneChange('phoneNumber', value)}
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
                            onChange={(value) => handleEmailChange('email', value)}
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
                </div>
            </div>
        </div>
    )
}

export default PersonalInformationSwapComponent