import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import ExperienceInformationSwapComponent from './ExperienceInformationSwapComponent'

const ExperienceInformation = ({ formData, updateFormData, isEditMode = false }) => {
    return (
        <div>
            <Card
                title="Experience Information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <ExperienceInformationSwapComponent 
                        formData={formData}
                        updateFormData={updateFormData}
                        isEditMode={isEditMode}
                    />
                }
                showDescription={false}
            />
        </div>
    )
}

export default ExperienceInformation