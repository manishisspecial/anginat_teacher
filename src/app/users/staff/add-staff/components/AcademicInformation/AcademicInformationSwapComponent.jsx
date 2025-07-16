import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useAcademicInformationFetch } from './AcademicInformationFetch'

const AcademicInformationSwapComponent = ({ formData, updateFormData }) => {
    const {
        designationOptions,
        handleInputChange,
        handleDropdownChange,
        validateStaffId
    } = useAcademicInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <Input
                    actionType='text'
                    label='Staff ID'
                    placeholder='Enter admission number'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.staffId || ''}
                    onChange={(value) => handleInputChange('staffId', value)}
                />

                <Input
                    actionType='date'
                    label='Date of Joining'
                    placeholder='DD MM YYYY'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.dateOfJoining || ''}
                    onChange={(value) => handleInputChange('dateOfJoining', value)}
                />

                <div className='col-span-1 md:col-span-2 w-full'>
                    <Input
                        actionType='dropdown'
                        label='Designation'
                        placeholder='Select'
                        options={designationOptions}
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.designation || ''}
                        onSelect={(option) => handleDropdownChange('designation', option)}
                        onChange={(option) => handleDropdownChange('designation', option)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AcademicInformationSwapComponent