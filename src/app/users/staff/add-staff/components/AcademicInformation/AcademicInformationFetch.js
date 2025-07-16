export const useAcademicInformationFetch = ({ formData, updateFormData }) => {
    
    const designationOptions = [
        { value: 'principal', label: 'Principal' },
        { value: 'vice-principal', label: 'Vice Principal' },
        { value: 'head-teacher', label: 'Head Teacher' },
        { value: 'senior-teacher', label: 'Senior Teacher' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'librarian', label: 'Librarian' },
        { value: 'counselor', label: 'Counselor' },
        { value: 'lab-assistant', label: 'Lab Assistant' },
        { value: 'sports-coordinator', label: 'Sports Coordinator' },
        { value: 'administrative-officer', label: 'Administrative Officer' },
        { value: 'clerk', label: 'Clerk' },
        { value: 'accountant', label: 'Accountant' },
        { value: 'receptionist', label: 'Receptionist' },
        { value: 'security-guard', label: 'Security Guard' },
        { value: 'maintenance-staff', label: 'Maintenance Staff' },
        { value: 'janitor', label: 'Janitor' },
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

    const validateStaffId = (staffId) => {
        // Staff ID should be alphanumeric and at least 3 characters
        const staffIdRegex = /^[A-Za-z0-9]{3,}$/
        return staffIdRegex.test(staffId)
    }

    return {
        designationOptions,
        handleInputChange,
        handleDropdownChange,
        validateStaffId
    }
}