import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import AcademicInformationSwapComponent from './AcademicInformationSwapComponent'

const AcademicInformation = ({ formData, updateFormData, isEditMode = false }) => {
    return (
        <div>
            <Card
                title="Academic Information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <AcademicInformationSwapComponent 
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

export default AcademicInformation