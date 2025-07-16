import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'

const ParentInformationComponent = ({ formData = {}, updateFormData = () => {}, errors = {}, readOnly = false, isEditMode = false }) => {
    
    const handleInputChange = (field, value) => {
        if (!readOnly) {
            updateFormData({ [field]: value });
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Father Name</span>
                        <span className="text-sm text-gray-900">{formData.fatherName || 'Father name'}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Contact Number</span>
                        <span className="text-sm text-gray-900">{formData.contactNumber || '123456789'}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Mother Occupation</span>
                        <span className="text-sm text-gray-900">{formData.motherOccupation || 'Housewife'}</span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Mother Name</span>
                        <span className="text-sm text-gray-900">{formData.motherName || 'Mother name'}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Father Occupation</span>
                        <span className="text-sm text-gray-900">{formData.fatherOccupation || 'Teacher'}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">Father's email</span>
                        <span className="text-sm text-gray-900">{formData.fatherEmail || 'example@gmail.com'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentInformationComponent