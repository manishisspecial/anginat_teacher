import { useState } from 'react'

export const usePersonalInformationFetch = ({ formData, updateFormData }) => {
    const [warningMessage, setWarningMessage] = useState("")

    const motherTongueOptions = [
        { value: 'hindi', label: 'Hindi' },
        { value: 'english', label: 'English' },
        { value: 'punjabi', label: 'Punjabi' },
        { value: 'urdu', label: 'Urdu' },
        { value: 'bengali', label: 'Bengali' },
        { value: 'gujarati', label: 'Gujarati' },
        { value: 'marathi', label: 'Marathi' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'telugu', label: 'Telugu' },
        { value: 'kannada', label: 'Kannada' },
        { value: 'malayalam', label: 'Malayalam' },
        { value: 'other', label: 'Other' }
    ]

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ]

    const handleInputChange = (field, value) => {
        updateFormData({
            [field]: value
        })
    }

    const handleDropdownChange = (field, selectedValue) => {
        let finalValue = null

        if (typeof selectedValue === 'string') {
            finalValue = selectedValue
        } else if (selectedValue && selectedValue.value) {
            finalValue = selectedValue.value
        } else if (selectedValue && selectedValue.label) {
            finalValue = selectedValue.label
        }

        if (finalValue) {
            updateFormData({
                [field]: finalValue
            })
        }
    }

    const handleEmailChange = (field, value) => {
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

    const validateImageFile = (file, maxSizeKB = 500) => {
        if (!file) return { isValid: false, message: 'No file selected' }
        
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        
        if (!allowedTypes.includes(file.type)) {
            return { isValid: false, message: 'Invalid file type. Please select JPG, PNG, or GIF.' }
        }
        
        const fileSizeKB = file.size / 1024
        if (fileSizeKB > maxSizeKB) {
            return { isValid: false, message: `File size too large. Please select a file smaller than ${maxSizeKB}KB.` }
        }
        
        return { isValid: true, message: '' }
    }

    const handleFileSelect = (files) => {
        if (files && files.length > 0) {
            const file = files[0]
            const validation = validateImageFile(file, 500)

            if (validation.isValid) {
                setWarningMessage("")
                updateFormData({
                    profileImage: file
                })
            } else {
                setWarningMessage(validation.message)
                updateFormData({
                    profileImage: null
                })
            }
        }
    }

    const handleFileError = (error) => {
        setWarningMessage(error.message || 'File upload failed')
        updateFormData({
            profileImage: null
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/
        return phoneRegex.test(phone)
    }

    return {
        motherTongueOptions,
        genderOptions,
        warningMessage,
        handleInputChange,
        handleDropdownChange,
        handleEmailChange,
        handlePhoneChange,
        handleFileSelect,
        handleFileError,
        validateEmail,
        validatePhoneNumber
    }
}