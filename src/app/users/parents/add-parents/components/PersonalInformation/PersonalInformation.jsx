import React from 'react'
import PersonalInformationSwapComponent from './PersonalInformationSwapComponent'

const PersonalInformation = ({ formData, updateFormData, isEditMode = false, isReadOnly = false }) => {
    return (
        <div className="flex gap-6">
            {/* Left Section - Profile Card */}
            <div className="w-80">
                <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
                    <div className="space-y-2">
                        {/* Empty content area as shown in the design */}
                    </div>
                </div>
            </div>

            {/* Right Section - Personal Information Card */}
            <div className="flex-1">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <PersonalInformationSwapComponent 
                        formData={formData}
                        updateFormData={updateFormData}
                        isEditMode={isEditMode}
                        isReadOnly={isReadOnly}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalInformation