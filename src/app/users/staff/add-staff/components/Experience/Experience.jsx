import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import ExperienceSwapComponent from './ExperienceSwapComponent'

const Experience = ({ formData, updateFormData, isEditMode = false }) => {
    return (
        <div>
            <Card
                title="Experience"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <ExperienceSwapComponent 
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

export default Experience