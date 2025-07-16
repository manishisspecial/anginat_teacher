import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import ChildInformationSwapComponent from './ChildInformationSwapComponent'

const ChildInformation = ({ formData, updateFormData, isEditMode = false }) => {
    return (
        <div>
            <Card
                title="Child Information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <ChildInformationSwapComponent 
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

export default ChildInformation