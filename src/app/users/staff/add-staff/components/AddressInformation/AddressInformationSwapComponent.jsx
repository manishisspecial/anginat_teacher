import React from 'react'
import Input from '@/components/reusableComponents/InputField/inputField'
import { useAddressInformationFetch } from './AddressInformationFetch'

const AddressInformationSwapComponent = ({ formData, updateFormData }) => {
    const {
        handleInputChange,
        handlePostalCodeChange,
        validatePostalCode
    } = useAddressInformationFetch({ formData, updateFormData })

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className='col-span-1 md:col-span-2 w-full'>
                    <Input
                        actionType='text'
                        label='Address'
                        placeholder='Enter address'
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
                    placeholder='Enter city'
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
                    placeholder='Enter state'
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
                    placeholder='Enter country'
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
                    placeholder='Enter postal code'
                    fullWidth={true}
                    showLabel={true}
                    showSupportingText={false}
                    required={true}
                    className="w-full"
                    value={formData.postalCode || ''}
                    onChange={(value) => handlePostalCodeChange(value)}
                />
            </div>
        </div>
    )
}

export default AddressInformationSwapComponent