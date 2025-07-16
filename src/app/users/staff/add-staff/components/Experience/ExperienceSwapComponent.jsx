import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useExperienceFetch } from './ExperienceFetch'

const ExperienceSwapComponent = ({ formData, updateFormData }) => {
    const {
        handleInputChange,
        handlePhoneChange,
        validatePhoneNumber,
        validateWorkExperience
    } = useExperienceFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <Input
                    actionType='text'
                    label='Total work experience'
                    placeholder='Enter experience'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.totalWorkExperience || ''}
                    onChange={(value) => handleInputChange('totalWorkExperience', value)}
                />

                <Input
                    actionType='text'
                    label='Previous school'
                    placeholder='Enter school name'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.previousSchool || ''}
                    onChange={(value) => handleInputChange('previousSchool', value)}
                />

                <Input
                    actionType='text'
                    label='Previous school address'
                    placeholder='Enter address'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.previousSchoolAddress || ''}
                    onChange={(value) => handleInputChange('previousSchoolAddress', value)}
                />

                <Input
                    actionType='text'
                    label='Previous school phone'
                    placeholder='Enter phone number'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.previousSchoolPhone || ''}
                    onChange={(value) => handlePhoneChange('previousSchoolPhone', value)}
                />
            </div>
        </div>
    )
}

export default ExperienceSwapComponent