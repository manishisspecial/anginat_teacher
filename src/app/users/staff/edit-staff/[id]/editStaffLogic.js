import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Mock staff data for prefilling
const mockStaffData = {
    id: "STAFF001",
    firstName: "Meera",
    lastName: "Patel",
    qualification: "MBA in Administration",
    phoneNumber: "9876543210",
    email: "meera.patel@school.edu",
    dateOfBirth: "1988-03-12",
    motherTongue: "gujarati",
    gender: "female",
    profileImage: null,
    staffId: "STF2024001",
    dateOfJoining: "2022-01-10",
    designation: "administrative-officer",
    totalWorkExperience: "6 years",
    previousSchool: "Green Valley Public School",
    previousSchoolAddress: "789 Admin Lane, Mumbai",
    previousSchoolPhone: "9876543212",
    address: "321 Staff Quarter, Block C",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "226025",
    status: "active",
    joiningDate: "2022-01-10",
    lastUpdated: "2024-06-20"
}

export const useEditStaffLogic = () => {
    const router = useRouter()
    const params = useParams()
    const staffId = params.staffId || params.id || params['[staffId]'] || params.slug
    
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
        staffId: "",
        dateOfJoining: "",
        designation: "",
        totalWorkExperience: "",
        previousSchool: "",
        previousSchoolAddress: "",
        previousSchoolPhone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })

    const [formData, setFormData] = useState(getDefaultFormData())
    const [originalStaffData, setOriginalStaffData] = useState(null)

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        academicInformation: false,
        experience: false,
        addressInformation: false
    })

    // Tab configuration
    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'academicInformation', label: 'Academic Information' },
        { key: 'experience', label: 'Experience' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const isFirstTab = currentTabIndex === 0
    const isLastTab = currentTabIndex === tabs.length - 1

    // Prefill staff data function
    const prefillStaffData = (staffData) => {
        if (!staffData) {
            return getDefaultFormData()
        }

        const prefilled = {
            firstName: staffData.firstName || "",
            lastName: staffData.lastName || "",
            qualification: staffData.qualification || "",
            phoneNumber: staffData.phoneNumber || "",
            email: staffData.email || "",
            dateOfBirth: staffData.dateOfBirth || "",
            motherTongue: staffData.motherTongue || "",
            gender: staffData.gender || "",
            profileImage: staffData.profileImage || null,
            staffId: staffData.staffId || "",
            dateOfJoining: staffData.dateOfJoining || "",
            designation: staffData.designation || "",
            totalWorkExperience: staffData.totalWorkExperience || "",
            previousSchool: staffData.previousSchool || "",
            previousSchoolAddress: staffData.previousSchoolAddress || "",
            previousSchoolPhone: staffData.previousSchoolPhone || "",
            address: staffData.address || "",
            city: staffData.city || "",
            state: staffData.state || "",
            country: staffData.country || "",
            postalCode: staffData.postalCode || ""
        }
        
        return prefilled
    }

    // Validation functions
    const validatePersonalInformation = (data) => {
        return !!(data.firstName && data.lastName && data.qualification && 
                 data.phoneNumber && data.email && data.dateOfBirth && 
                 data.motherTongue && data.gender)
    }

    const validateAcademicInformation = (data) => {
        return !!(data.staffId && data.dateOfJoining && data.designation)
    }

    const validateExperience = (data) => {
        return !!(data.totalWorkExperience && data.previousSchool && 
                 data.previousSchoolAddress && data.previousSchoolPhone)
    }

    const validateAddressInformation = (data) => {
        return !!(data.address && data.city && data.state && data.country && data.postalCode)
    }

    // Fetch staff data on component mount
    useEffect(() => {
        if (staffId && staffId.length > 0) {
            fetchStaffData(staffId)
        } else {
            setError(`No staff ID provided. Available params: ${JSON.stringify(params)}`)
            setFetchingData(false)
        }
    }, [staffId, params])

    const fetchStaffData = async (id) => {
        try {
            setFetchingData(true)
            setError(null)
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Static mock data
            const staffData = {
                ...mockStaffData,
                id: id
            }
            
            setOriginalStaffData(staffData)
            
            const prefillData = prefillStaffData(staffData)
            setFormData(prefillData)
            
            const validation = {
                personalInformation: validatePersonalInformation(prefillData),
                academicInformation: validateAcademicInformation(prefillData),
                experience: validateExperience(prefillData),
                addressInformation: validateAddressInformation(prefillData)
            }
            setTabValidation(validation)
        } catch (error) {
            setError('Failed to fetch staff data: ' + error.message)
        } finally {
            setFetchingData(false)
        }
    }

    const isCurrentTabValid = () => {
        switch (activeTab) {
            case 'personalInformation':
                return validatePersonalInformation(formData)
            case 'academicInformation':
                return validateAcademicInformation(formData)
            case 'experience':
                return validateExperience(formData)
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
        router.push('/users/staff')
    }

    // Staff operations
    const handleUpdate = async () => {
        if (!isCurrentTabValid()) {
            return
        }

        try {
            setLoading(true)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Updating staff data:', formData)
            alert('Staff member updated successfully!')
            router.push('/users/staff')
        } catch (error) {
            alert('Failed to update staff member: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteStaff = () => {
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
                
                alert('Staff member deleted successfully!')
                router.push('/users/staff')
            } catch (error) {
                alert('Failed to delete staff member: ' + error.message)
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
        originalStaffData,
        tabValidation,
        staffId,
        
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
        handleDeleteStaff,
        handleDeleteConfirm,
        handleTypeConfirmDelete,
        updateFormData,
        fetchStaffData
    }
}