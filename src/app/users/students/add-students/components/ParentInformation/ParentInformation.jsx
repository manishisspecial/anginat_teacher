import React from 'react'
import Card from '@/components/reusableComponents/Card/Card7'

import ParentInformationComponent from './ParentInformationComponent'

const BatchDetails = ({ formData, updateFormData }) => {
    return (
        <div>
            <Card
                title="Parent’s information"
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showMenuButton={false}
                swapContent1={<ParentInformationComponent formData={formData} updateFormData={updateFormData} />}
                showDescription={false}
            />
        </div>
    )
}

export default BatchDetails