import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import PersonalInformationSwapComponent from './PersonalInformationSwapComponent'

const PersonalInformation = ({ formData, updateFormData, isEditMode = false, isReadOnly = false }) => {
    return (
        <div>
            <Card
                title="Personal Information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <PersonalInformationSwapComponent 
                        formData={formData}
                        updateFormData={updateFormData}
                        isEditMode={isEditMode}
                        isReadOnly={isReadOnly}
                    />
                }
                showDescription={false}
            />
        </div>
    )
}

export default PersonalInformation