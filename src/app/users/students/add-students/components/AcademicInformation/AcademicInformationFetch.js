export const useAcademicInformationFetch = ({ formData, updateFormData }) => {
    
    const academicYearOptions = [
        { value: '2021-2022', label: '2021-2022' },
        { value: '2022-2023', label: '2022-2023' },
        { value: '2023-2024', label: '2023-2024' },
        { value: '2024-2025', label: '2024-2025' },
        { value: '2025-2026', label: '2025-2026' },
    ]

    const classOptions = [
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
        { value: '5', label: 'Class 5' },
        { value: '6', label: 'Class 6' },
        { value: '7', label: 'Class 7' },
        { value: '8', label: 'Class 8' },
        { value: '9', label: 'Class 9' },
        { value: '10', label: 'Class 10' },
        { value: '11', label: 'Class 11' },
        { value: '12', label: 'Class 12' },
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

    return {
        academicYearOptions,
        classOptions,
        handleInputChange,
        handleDropdownChange
    }
}