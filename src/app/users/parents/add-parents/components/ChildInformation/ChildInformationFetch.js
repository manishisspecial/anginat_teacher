export const useChildInformationFetch = ({ formData, updateFormData }) => {
    
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

    const subjectOptions = [
        { value: 'mathematics', label: 'Mathematics' },
        { value: 'science', label: 'Science' },
        { value: 'english', label: 'English' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'social_science', label: 'Social Science' },
        { value: 'physics', label: 'Physics' },
        { value: 'chemistry', label: 'Chemistry' },
        { value: 'biology', label: 'Biology' },
        { value: 'computer_science', label: 'Computer Science' },
        { value: 'physical_education', label: 'Physical Education' },
        { value: 'art', label: 'Art' },
        { value: 'music', label: 'Music' },
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
        classOptions,
        subjectOptions,
        handleInputChange,
        handleDropdownChange
    }
}