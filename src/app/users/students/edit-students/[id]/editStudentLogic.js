import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Mock student data for prefilling
const mockStudentData = {
    id: "STU001",
    firstName: "Rajesh",
    lastName: "Kumar",
    rollNumber: "2024001",
    phoneNumber: "9876543210",
    email: "rajesh.kumar@student.edu",
    dateOfBirth: "2006-05-15",
    caste: "General",
    bloodGroup: "B+",
    motherTongue: "hindi",
    gender: "male",
    profileImage: null,
    fatherName: "Suresh Kumar",
    motherName: "Priya Kumar",
    contactNumber: "9876543211",
    motherOccupation: "Teacher",
    fatherEmail: "suresh.kumar@email.com",
    admissionNo: "ADM2024001",
    academicYear: "2024-2025",
    class: "10",
    section: "A",
    address: "123 Main Street, Sector 15",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "226001",
    status: "active",
    admissionDate: "2024-01-15",
    lastUpdated: "2024-06-20"
}

export const useEditStudentLogic = () => {
    const router = useRouter()
    const params = useParams()
    const studentId = params.studentId || params.id || params['[studentId]'] || params.slug
    
    // State management
    const [activeTab, setActiveTab] = useState('personalInformation')
    const [loading, setLoading] = useState(false)
    const [fetchingData, setFetchingData] = useState(true)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showTypeConfirmDialog, setShowTypeConfirmDialog] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')
    const [error, setError] = useState(null)

    // Default form data structure
    const getDefaultFormData = () => ({
        firstName: "",
        lastName: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        caste: "",
        bloodGroup: "",
        motherTongue: "",
        gender: "",
        profileImage: null,
        fatherName: "",
        motherName: "",
        contactNumber: "",
        motherOccupation: "",
        fatherEmail: "",
        admissionNo: "",
        academicYear: "",
        class: "",
        section: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [formData, setFormData] = useState(getDefaultFormData())
    const [originalStudentData, setOriginalStudentData] = useState(null)

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        parentInformation: false,
        academicInformation: false,
        addressInformation: false
    })

    // Tab configuration
    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'parentInformation', label: 'Parent Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const isFirstTab = currentTabIndex === 0
    const isLastTab = currentTabIndex === tabs.length - 1

    // Prefill student data function
    const prefillStudentData = (studentData) => {
        if (!studentData) {
            return getDefaultFormData()
        }

        const prefilled = {
            firstName: studentData.firstName || "",
            lastName: studentData.lastName || "",
            rollNumber: studentData.rollNumber || "",
            phoneNumber: studentData.phoneNumber || "",
            email: studentData.email || "",
            dateOfBirth: studentData.dateOfBirth || "",
            caste: studentData.caste || "",
            bloodGroup: studentData.bloodGroup || "",
            motherTongue: studentData.motherTongue || "",
            gender: studentData.gender || "",
            profileImage: studentData.profileImage || null,
            fatherName: studentData.fatherName || "",
            motherName: studentData.motherName || "",
            contactNumber: studentData.contactNumber || "",
            motherOccupation: studentData.motherOccupation || "",
            fatherEmail: studentData.fatherEmail || "",
            admissionNo: studentData.admissionNo || "",
            academicYear: studentData.academicYear || "",
            class: studentData.class || "",
            section: studentData.section || "",
            address: studentData.address || "",
            city: studentData.city || "",
            state: studentData.state || "",
            country: studentData.country || "",
            postalCode: studentData.postalCode || ""
        }
        
        return prefilled
    }

    // Validation functions
    const validatePersonalInformation = (data) => {
        return !!(data.firstName && data.lastName && data.rollNumber && 
                 data.phoneNumber && data.email && data.dateOfBirth && 
                 data.caste && data.bloodGroup && data.motherTongue && data.gender)
    }

    const validateParentInformation = (data) => {
        return !!(data.fatherName && data.motherName && data.contactNumber && 
                 data.motherOccupation && data.fatherEmail)
    }

    const validateAcademicInformation = (data) => {
        return !!(data.admissionNo && data.academicYear && data.class && data.section)
    }

    const validateAddressInformation = (data) => {
        return !!(data.address && data.city && data.state && data.country && data.postalCode)
    }

    // Fetch student data on component mount
    useEffect(() => {
        if (studentId && studentId.length > 0) {
            fetchStudentData(studentId)
        } else {
            setError(`No student ID provided. Available params: ${JSON.stringify(params)}`)
            setFetchingData(false)
        }
    }, [studentId, params])

    const fetchStudentData = async (id) => {
        try {
            setFetchingData(true)
            setError(null)
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Static mock data
            const studentData = {
                ...mockStudentData,
                id: id
            }
            
            setOriginalStudentData(studentData)
            
            const prefillData = prefillStudentData(studentData)
            setFormData(prefillData)
            
            const validation = {
                personalInformation: validatePersonalInformation(prefillData),
                parentInformation: validateParentInformation(prefillData),
                academicInformation: validateAcademicInformation(prefillData),
                addressInformation: validateAddressInformation(prefillData)
            }
            setTabValidation(validation)
        } catch (error) {
            setError('Failed to fetch student data: ' + error.message)
        } finally {
            setFetchingData(false)
        }
    }

    const isCurrentTabValid = () => {
        switch (activeTab) {
            case 'personalInformation':
                return validatePersonalInformation(formData)
            case 'parentInformation':
                return validateParentInformation(formData)
            case 'academicInformation':
                return validateAcademicInformation(formData)
            case 'addressInformation':
                return validateAddressInformation(formData)
            default:
                return false
        }
    }

    // Navigation handlers
    const handleNext = () => {
        if (isCurrentTabValid()) {
            setTabValidation(prev => ({
                ...prev,
                [activeTab]: true
            }))

            if (!isLastTab) {
                const nextTab = tabs[currentTabIndex + 1]
                setActiveTab(nextTab.key)
            }
        }
    }

    const handlePrevious = () => {
        if (!isFirstTab) {
            const prevTab = tabs[currentTabIndex - 1]
            setActiveTab(prevTab.key)
        }
    }

    const handleCancel = () => {
        router.push('/users/students')
    }

    // Student operations
    const handleUpdate = async () => {
        if (!isCurrentTabValid()) {
            return
        }

        try {
            setLoading(true)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Updating student data:', formData)
            alert('Student updated successfully!')
            router.push('/users/students')
        } catch (error) {
            alert('Failed to update student: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteStudent = () => {
        setShowDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        setShowDeleteDialog(false)
        setShowTypeConfirmDialog(true)
    }

    const handleTypeConfirmDelete = async () => {
        if (deleteConfirmText.toLowerCase() === 'delete') {
            try {
                setLoading(true)
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                alert('Student deleted successfully!')
                router.push('/users/students')
            } catch (error) {
                alert('Failed to delete student: ' + error.message)
            } finally {
                setLoading(false)
                setShowTypeConfirmDialog(false)
                setDeleteConfirmText('')
            }
        } else {
            alert('Please type "delete" to confirm deletion.')
        }
    }

    // Form data handlers
    const updateFormData = (updates) => {
        setFormData(prev => ({
            ...prev,
            ...updates
        }))
    }

    // Return all state and handlers
    return {
        // State
        activeTab,
        setActiveTab,
        loading,
        fetchingData,
        showDeleteDialog,
        setShowDeleteDialog,
        showTypeConfirmDialog,
        setShowTypeConfirmDialog,
        deleteConfirmText,
        setDeleteConfirmText,
        error,
        formData,
        originalStudentData,
        tabValidation,
        studentId,
        
        // Configuration
        tabs,
        currentTabIndex,
        isFirstTab,
        isLastTab,
        
        // Validation
        isCurrentTabValid,
        
        // Handlers
        handleNext,
        handlePrevious,
        handleCancel,
        handleUpdate,
        handleDeleteStudent,
        handleDeleteConfirm,
        handleTypeConfirmDelete,
        updateFormData,
        fetchStudentData
    }
}