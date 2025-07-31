import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useAddressInformationFetch } from './AddressInformationFetch'

const AddressInformationSwapComponent = ({ formData, updateFormData, isEditMode = false }) => {
    const {
        handleInputChange,
        handlePostalCodeChange,
        validatePostalCode
    } = useAddressInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                <div className='col-span-1 lg:col-span-2 w-full'>
                    <div className="flex flex-row items-start">
                        <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Address</span>
                        <span className="text-sm text-gray-900">{formData.address || 'Door No.2-4-197/A, Cinema Road,Below Margadarsi Office, Pattiwar Complex'}</span>
                    </div>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">City</span>
                    <span className="text-sm text-gray-900">{formData.city || 'Hyderabad'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">State</span>
                    <span className="text-sm text-gray-900">{formData.state || 'Telangana'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Country</span>
                    <span className="text-sm text-gray-900">{formData.country || 'India'}</span>
                </div>

                <div className="flex flex-row items-start">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Postal Code</span>
                    <span className="text-sm text-gray-900">{formData.postalCode || '500081'}</span>
                </div>
            </div>
        </div>
    )
}

export default AddressInformationSwapComponent