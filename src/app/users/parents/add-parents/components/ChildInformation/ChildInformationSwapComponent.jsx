import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useChildInformationFetch } from './ChildInformationFetch'

const ChildInformationSwapComponent = ({ formData, updateFormData, isReadOnly = false }) => {
    const {
        classOptions,
        subjectOptions,
        handleInputChange,
        handleDropdownChange
    } = useChildInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            {isReadOnly ? (
                // Read-only display as plain text
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Student ID:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.studentId || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Date of Joining:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.dateOfJoining || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Class:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.class || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Subject:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.subject || ''}</span>
                    </div>
                </div>
            ) : (
                // Editable form fields
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        actionType='text'
                        label='Student ID'
                        placeholder='Enter Admission Number'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.studentId || ''}
                        onChange={(value) => handleInputChange('studentId', value)}
                    />

                    <Input
                        actionType='date'
                        label='Date of Joining'
                        placeholder='DD/MM/YYYY'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.dateOfJoining || ''}
                        onChange={(value) => handleInputChange('dateOfJoining', value)}
                    />

                    <Input
                        actionType='dropdown'
                        label='Class'
                        placeholder='Select'
                        options={classOptions}
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.class || ''}
                        onSelect={(option) => handleDropdownChange('class', option)}
                        onChange={(option) => handleDropdownChange('class', option)}
                    />

                    <Input
                        actionType='dropdown'
                        label='Subject'
                        placeholder='Select'
                        options={subjectOptions}
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.subject || ''}
                        onSelect={(option) => handleDropdownChange('subject', option)}
                        onChange={(option) => handleDropdownChange('subject', option)}
                    />
                </div>
            )}
        </div>
    )
}

export default ChildInformationSwapComponent