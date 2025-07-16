import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Mock parent data for prefilling
const mockParentData = {
    id: "P001",
    firstName: "Rajesh",
    lastName: "Kumar",
    phoneNumber: "9876543210",
    email: "rajesh.kumar@parent.edu",
    dateOfBirth: "1975-03-20",
    qualification: "B.Tech Computer Science",
    motherTongue: "hindi",
    gender: "male",
    profileImage: null,
    studentId: "STU001",
    dateOfJoining: "2024-01-15",
    class: "10",
    subject: "mathematics",
    address: "123 Main Street, Sector 15",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "226001",
    status: "active",
    registrationDate: "2024-01-15",
    lastUpdated: "2024-06-20",
    childName: "Arjun Kumar"
}

export const useEditParentLogic = () => {
    const router = useRouter()
    const params = useParams()
    const parentId = params.parentId || params.id || params['[parentId]'] || params.slug
    
    // State management
    const [activeTab, setActiveTab] = useState('personalInformation')
    const [loading, setLoading] = useState(false)
    const [fetchingData, setFetchingData] = useState(true)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showTypeConfirmDialog, setShowTypeConfirmDialog] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')
    const [error, setError] = useState(null)

    // Default form data structure for parents
    const getDefaultFormData = () => ({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        qualification: "",
        motherTongue: "",
        gender: "",
        profileImage: null,
        studentId: "",
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
    const [originalParentData, setOriginalParentData] = useState(null)

    const [tabValidation, setTabValidation] = useState({
        personalInformation: false,
        childInformation: false,
        addressInformation: false
    })

    // Tab configuration for parents
    const tabs = [
        { key: 'personalInformation', label: 'Personal Information' },
        { key: 'childInformation', label: 'Child Information' },
        { key: 'addressInformation', label: 'Address Information' }
    ]

    const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const isFirstTab = currentTabIndex === 0
    const isLastTab = currentTabIndex === tabs.length - 1

    // Prefill parent data function
    const prefillParentData = (parentData) => {
        if (!parentData) {
            return getDefaultFormData()
        }

        const prefilled = {
            firstName: parentData.firstName || "",
            lastName: parentData.lastName || "",
            phoneNumber: parentData.phoneNumber || "",
            email: parentData.email || "",
            dateOfBirth: parentData.dateOfBirth || "",
            qualification: parentData.qualification || "",
            motherTongue: parentData.motherTongue || "",
            gender: parentData.gender || "",
            profileImage: parentData.profileImage || null,
            studentId: parentData.studentId || "",
            dateOfJoining: parentData.dateOfJoining || "",
            class: parentData.class || "",
            subject: parentData.subject || "",
            address: parentData.address || "",
            city: parentData.city || "",
            state: parentData.state || "",
            country: parentData.country || "",
            postalCode: parentData.postalCode || ""
        }
        
        return prefilled
    }

    // Validation functions for parents
    const validatePersonalInformation = (data) => {
        return !!(data.firstName && data.lastName && data.phoneNumber && 
                 data.email && data.dateOfBirth && data.qualification && 
                 data.motherTongue && data.gender)
    }

    const validateChildInformation = (data) => {
        return !!(data.studentId && data.dateOfJoining && data.class && data.subject)
    }

    const validateAddressInformation = (data) => {
        return !!(data.address && data.city && data.state && data.country && data.postalCode)
    }

    // Fetch parent data on component mount
    useEffect(() => {
        if (parentId && parentId.length > 0) {
            fetchParentData(parentId)
        } else {
            setError(`No parent ID provided. Available params: ${JSON.stringify(params)}`)
            setFetchingData(false)
        }
    }, [parentId, params])

    const fetchParentData = async (id) => {
        try {
            setFetchingData(true)
            setError(null)
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Static mock data
            const parentData = {
                ...mockParentData,
                id: id
            }
            
            setOriginalParentData(parentData)
            
            const prefillData = prefillParentData(parentData)
            setFormData(prefillData)
            
            const validation = {
                personalInformation: validatePersonalInformation(prefillData),
                childInformation: validateChildInformation(prefillData),
                addressInformation: validateAddressInformation(prefillData)
            }
            setTabValidation(validation)
        } catch (error) {
            setError('Failed to fetch parent data: ' + error.message)
        } finally {
            setFetchingData(false)
        }
    }

    const isCurrentTabValid = () => {
        switch (activeTab) {
            case 'personalInformation':
                return validatePersonalInformation(formData)
            case 'childInformation':
                return validateChildInformation(formData)
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
        router.push('/users/parents')
    }

    // Parent operations
    const handleUpdate = async () => {
        if (!isCurrentTabValid()) {
            return
        }

        try {
            setLoading(true)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            console.log('Updating parent data:', formData)
            alert('Parent updated successfully!')
            router.push('/users/parents')
        } catch (error) {
            alert('Failed to update parent: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteParent = () => {
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
                
                alert('Parent deleted successfully!')
                router.push('/users/parents')
            } catch (error) {
                alert('Failed to delete parent: ' + error.message)
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
        originalParentData,
        tabValidation,
        parentId,
        
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
        handleDeleteParent,
        handleDeleteConfirm,
        handleTypeConfirmDelete,
        updateFormData,
        fetchParentData
    }
}