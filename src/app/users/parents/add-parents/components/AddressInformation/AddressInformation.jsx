import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'
import AddressInformationSwapComponent from './AddressInformationSwapComponent'

const AddressInformation = ({ formData, updateFormData, isEditMode = false, isReadOnly = false }) => {
    return (
        <div>
            <Card
                title="Address Information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={
                    <AddressInformationSwapComponent 
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

export default AddressInformation