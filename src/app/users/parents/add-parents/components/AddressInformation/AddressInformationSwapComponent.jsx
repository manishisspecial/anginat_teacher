import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useAddressInformationFetch } from './AddressInformationFetch'

const AddressInformationSwapComponent = ({ formData, updateFormData, isReadOnly = false }) => {
    const {
        handleInputChange,
        handlePostalCodeChange,
        validatePostalCode
    } = useAddressInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            {isReadOnly ? (
                // Read-only display as plain text
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <div className='col-span-1 md:col-span-2 w-full'>
                        <div className="flex items-center">
                            <label className="text-sm font-medium text-gray-700 w-32">Address:</label>
                            <span className="text-sm text-gray-900 ml-2">{formData.address || ''}</span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">City:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.city || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">State:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.state || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Country:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.country || ''}</span>
                    </div>

                    <div className="flex items-center">
                        <label className="text-sm font-medium text-gray-700 w-32">Postal Code:</label>
                        <span className="text-sm text-gray-900 ml-2">{formData.postalCode || ''}</span>
                    </div>
                </div>
            ) : (
                // Editable form fields
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <div className='col-span-1 md:col-span-2 w-full'>
                        <Input
                            actionType='text'
                            label='Address'
                            placeholder='Enter Address'
                            fullWidth={true}
                            showLabel={true}
                            showSupportingText={false}
                            required={true}
                            className="w-full"
                            value={formData.address || ''}
                            onChange={(value) => handleInputChange('address', value)}
                        />
                    </div>

                    <Input
                        actionType='text'
                        label='City'
                        placeholder='Enter City'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.city || ''}
                        onChange={(value) => handleInputChange('city', value)}
                    />

                    <Input
                        actionType='text'
                        label='State'
                        placeholder='Enter State'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.state || ''}
                        onChange={(value) => handleInputChange('state', value)}
                    />

                    <Input
                        actionType='text'
                        label='Country'
                        placeholder='Enter Country'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.country || ''}
                        onChange={(value) => handleInputChange('country', value)}
                    />

                    <Input
                        actionType='text'
                        label='Postal Code'
                        placeholder='Enter Postal Code'
                        fullWidth={true}
                        showLabel={true}
                        showSupportingText={false}
                        required={true}
                        className="w-full"
                        value={formData.postalCode || ''}
                        onChange={(value) => handlePostalCodeChange(value)}
                    />
                </div>
            )}
        </div>
    )
}

export default AddressInformationSwapComponent