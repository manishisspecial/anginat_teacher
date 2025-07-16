export const useExperienceInformationFetch = ({ formData, updateFormData }) => {
    
    const handleInputChange = (field, value) => {
        updateFormData({
            [field]: value
        })
    }

    const handlePhoneChange = (field, value) => {
        // Only allow numeric input
        const numericValue = value.replace(/\D/g, '')
        updateFormData({
            [field]: numericValue
        })
    }

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/
        return phoneRegex.test(phone)
    }

    const validateWorkExperience = (experience) => {
        // Allow formats like "2 years", "5", "2.5 years", etc.
        const experienceRegex = /^\d+(\.\d+)?\s*(year|years|yr|yrs)?$/i
        return experienceRegex.test(experience.trim())
    }

    return {
        handleInputChange,
        handlePhoneChange,
        validatePhoneNumber,
        validateWorkExperience
    }
}