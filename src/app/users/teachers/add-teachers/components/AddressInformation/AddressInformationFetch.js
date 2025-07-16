export const useAddressInformationFetch = ({ formData, updateFormData }) => {
    
    const handleInputChange = (field, value) => {
        updateFormData({
            [field]: value
        })
    }

    const handlePostalCodeChange = (value) => {
        // Only allow numeric input for postal code
        const numericValue = value.replace(/\D/g, '')
        updateFormData({
            postalCode: numericValue
        })
    }

    const validatePostalCode = (postalCode) => {
        const postalCodeRegex = /^[0-9]{6}$/
        return postalCodeRegex.test(postalCode)
    }

    return {
        handleInputChange,
        handlePostalCodeChange,
        validatePostalCode
    }
}