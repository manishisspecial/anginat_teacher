import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useAcademicInformationFetch } from './AcademicInformationFetch'

const AcademicInformationSwapComponent = ({ formData, updateFormData, isEditMode = false }) => {
    const {
        academicYearOptions,
        classOptions,
        handleInputChange,
        handleDropdownChange
    } = useAcademicInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Admission No</span>
                    <span className="text-sm text-gray-900">{formData.admissionNo || '1246'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Academic year</span>
                    <span className="text-sm text-gray-900">{formData.academicYear || '2025-2026'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Class</span>
                    <span className="text-sm text-gray-900">{formData.class || '10th'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Section</span>
                    <span className="text-sm text-gray-900">{formData.section || 'A'}</span>
                </div>
            </div>
        </div>
    )
}

export default AcademicInformationSwapComponent