import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useExperienceInformationFetch } from './ExperienceInformationFetch'

const ExperienceInformationSwapComponent = ({ formData, updateFormData }) => {
    const {
        handleInputChange,
        handlePhoneChange,
        validatePhoneNumber,
        validateWorkExperience
    } = useExperienceInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <Input
                    actionType='text'
                    label='Total Work Experience'
                    placeholder='Enter Total Work Experience (e.g., 5 years)'
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
                    label='Previous School'
                    placeholder='Enter Previous School Name'
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
                    label='Previous School Address'
                    placeholder='Enter Previous School Address'
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
                    label='Previous School Phone'
                    placeholder='Enter Previous School Phone Number'
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

export default ExperienceInformationSwapComponent