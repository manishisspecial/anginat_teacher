import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Mock teacher data for prefilling
const mockTeacherData = {
    id: "TEACH001",
    firstName: "Priya",
    lastName: "Sharma",
    qualification: "M.Ed in Mathematics",
    phoneNumber: "9876543210",
    email: "priya.sharma@school.edu",
    dateOfBirth: "1985-08-20",
    motherTongue: "hindi",
    gender: "female",
    profileImage: null,
    totalWorkExperience: "8 years",
    previousSchool: "St. Mary's Convent School",
    previousSchoolAddress: "123 Education Street, Delhi",
    previousSchoolPhone: "9876543211",
    teacherId: "TCH2024001",
    dateOfJoining: "2020-06-15",
    class: "10",
    subject: "mathematics",
    address: "456 Teacher Colony, Sector 20",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "226020",
    status: "active",
    joiningDate: "2020-06-15",
    lastUpdated: "2024-06-20"
}

export const useEditTeacherLogic = () => {
    const router = useRouter()
    const params = useParams()
    const teacherId = params.teacherId || params.id || params['[teacherId]'] || params.slug
    
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
        qualification: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        motherTongue: "",
        gender: "",
        profileImage: null,
        totalWorkExperience: "",
        previousSchool: "",
        previousSchoolAddress: "",
        previousSchoolPhone: "",
        teacherId: "",
        dateOfJoining: "",
        class: "",
        subject: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [formData, setFormData] = useState(getDefaultFormData())
    const [originalTeacherData, setOriginalTeacherData] = useState(null)

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        experienceInformation: false,
        academicInformation: false,
        addressInformation: false
    })

    // Tab configuration
    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'experienceInformation', label: 'Experience Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const isFirstTab = currentTabIndex === 0
    const isLastTab = currentTabIndex === tabs.length - 1

    // Prefill teacher data function
    const prefillTeacherData = (teacherData) => {
        if (!teacherData) {
            return getDefaultFormData()
        }

        const prefilled = {
            firstName: teacherData.firstName || "",
            lastName: teacherData.lastName || "",
            qualification: teacherData.qualification || "",
            phoneNumber: teacherData.phoneNumber || "",
            email: teacherData.email || "",
            dateOfBirth: teacherData.dateOfBirth || "",
            motherTongue: teacherData.motherTongue || "",
            gender: teacherData.gender || "",
            profileImage: teacherData.profileImage || null,
            totalWorkExperience: teacherData.totalWorkExperience || "",
            previousSchool: teacherData.previousSchool || "",
            previousSchoolAddress: teacherData.previousSchoolAddress || "",
            previousSchoolPhone: teacherData.previousSchoolPhone || "",
            teacherId: teacherData.teacherId || "",
            dateOfJoining: teacherData.dateOfJoining || "",
            class: teacherData.class || "",
            subject: teacherData.subject || "",
            address: teacherData.address || "",
            city: teacherData.city || "",
            state: teacherData.state || "",
            country: teacherData.country || "",
            postalCode: teacherData.postalCode || ""
        }
        
        return prefilled
    }

    // Validation functions
    const validatePersonalInformation = (data) => {
        return !!(data.firstName && data.lastName && data.qualification && 
                 data.phoneNumber && data.email && data.dateOfBirth && 
                 data.motherTongue && data.gender)
    }

    const validateExperienceInformation = (data) => {
        return !!(data.totalWorkExperience && data.previousSchool && 
                 data.previousSchoolAddress && data.previousSchoolPhone)
    }

    const validateAcademicInformation = (data) => {
        return !!(data.teacherId && data.dateOfJoining && data.class && data.subject)
    }

    const validateAddressInformation = (data) => {
        return !!(data.address && data.city && data.state && data.country && data.postalCode)
    }

    // Fetch teacher data on component mount
    useEffect(() => {
        if (teacherId && teacherId.length > 0) {
            fetchTeacherData(teacherId)
        } else {
            setError(`No teacher ID provided. Available params: ${JSON.stringify(params)}`)
            setFetchingData(false)
        }
    }, [teacherId, params])

    const fetchTeacherData = async (id) => {
        try {
            setFetchingData(true)
            setError(null)
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Static mock data
            const teacherData = {
                ...mockTeacherData,
                id: id
            }
            
            setOriginalTeacherData(teacherData)
            
            const prefillData = prefillTeacherData(teacherData)
            setFormData(prefillData)
            
            const validation = {
                personalInformation: validatePersonalInformation(prefillData),
                experienceInformation: validateExperienceInformation(prefillData),
                academicInformation: validateAcademicInformation(prefillData),
                addressInformation: validateAddressInformation(prefillData)
            }
            setTabValidation(validation)
        } catch (error) {
            setError('Failed to fetch teacher data: ' + error.message)
        } finally {
            setFetchingData(false)
        }
    }

    const isCurrentTabValid = () => {
        switch (activeTab) {
            case 'personalInformation':
                return validatePersonalInformation(formData)
            case 'experienceInformation':
                return validateExperienceInformation(formData)
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
        router.push('/users/teachers')
    }

    // Teacher operations
    const handleUpdate = async () => {
        if (!isCurrentTabValid()) {
            return
        }

        try {
            setLoading(true)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Updating teacher data:', formData)
            alert('Teacher updated successfully!')
            router.push('/users/teachers')
        } catch (error) {
            alert('Failed to update teacher: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteTeacher = () => {
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
                
                alert('Teacher deleted successfully!')
                router.push('/users/teachers')
            } catch (error) {
                alert('Failed to delete teacher: ' + error.message)
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
        originalTeacherData,
        tabValidation,
        teacherId,
        
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
        handleDeleteTeacher,
        handleDeleteConfirm,
        handleTypeConfirmDelete,
        updateFormData,
        fetchTeacherData
    }
}