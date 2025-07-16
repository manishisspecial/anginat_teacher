"use client";
import React from 'react'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from '../../add-students/components/PersonalInformation/PersonalInformation'
import ParentInformation from '../../add-students/components/ParentInformation/ParentInformation'
import AcademicInformation from '../../add-students/components/AcademicInformation/AcademicInformation'
import AddressInformation from '../../add-students/components/AddressInformation/AddressInformation'
import ConfirmationDialog from './components/ConfirmationDialog'
import { useEditStudentLogic } from './editStudentLogic'

const EditStudentPage = () => {
    const {
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
        studentId,

        // Configuration
        tabs,
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
    } = useEditStudentLogic()

    // Render active component
    const renderActiveComponent = () => {
        const commonProps = {
            formData,
            updateFormData,
            isEditMode: true
        }

        switch (activeTab) {
            case 'personalInformation':
                return <PersonalInformation {...commonProps} />
            case 'parentInformation':
                return <ParentInformation {...commonProps} />
            case 'academicInformation':
                return <AcademicInformation {...commonProps} />
            case 'addressInformation':
                return <AddressInformation {...commonProps} />
            default:
                return <PersonalInformation {...commonProps} />
        }
    }

    // Right header component
    const RightComponent = () => {
        const isNextDisabled = !isCurrentTabValid()

        return (
            <div className="flex flex-row gap-4">
                <Button
                    text="Delete Student"
                    type="Secondary"
                    onClick={handleDeleteStudent}
                    disabled={loading}
                />

                <Button
                    text="Cancel"
                    type="Secondary"
                    onClick={handleCancel}
                    disabled={loading}
                />

                {!isFirstTab && (
                    <Button
                        text="Previous"
                        type="Secondary"
                        onClick={handlePrevious}
                        disabled={loading}
                    />
                )}

                {!isLastTab ? (
                    <Button
                        text="Next"
                        type="Primary"
                        onClick={handleNext}
                        state={isNextDisabled ? "Disabled" : "Hover"}
                    />
                ) : (
                    <Button
                        text={loading ? "Updating..." : "Update Student"}
                        type="Primary"
                        onClick={handleUpdate}
                        state={loading ? "Disabled" : "Hover"}
                    />
                )}
            </div>
        )
    }

    // Loading state
    if (fetchingData) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <div className="ml-4">
                        <p>Loading student data...</p>
                        <p className="text-sm text-gray-500">Student ID: {studentId}</p>
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Student</h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <p className="text-sm text-gray-400 mb-4">Student ID: {studentId}</p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                text="Retry"
                                type="Primary"
                                onClick={() => fetchStudentData(studentId)}
                            />
                            <Button
                                text="Go Back"
                                type="Secondary"
                                onClick={handleCancel}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Main UI
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white mt-2">
                <div className="flex justify-between items-center px-6 py-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Editing Student - {originalStudentData?.firstName} {originalStudentData?.lastName}
                        </h1>
                        {originalStudentData && (
                            <p className="text-sm text-gray-500 mt-1">
                                Roll No: {originalStudentData.rollNumber} • 
                                Class: {originalStudentData.class}-{originalStudentData.section} • 
                                Status: {originalStudentData.status}
                            </p>
                        )}
                    </div>
                    <RightComponent/>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200" />

                {/* Tab Navigation */}
                <div className="flex justify-between items-center px-6 py-3">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.key}
                                text={tab.label}
                                type="Tertiary"
                                size="Compact"
                                state={activeTab === tab.key ? 'Hover' : 'Disabled'}
                                onClick={() => setActiveTab(tab.key)}
                            />
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200" />
            </div>

            {/* Main Content */}
            <div className="p-6">
                {/* Student Info Banner */}
                {originalStudentData && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-blue-800 mb-2">Student Information</h3>
                                <p className="text-blue-700 font-medium">
                                    {originalStudentData.firstName} {originalStudentData.lastName}
                                </p>
                                <div className="text-blue-600 text-sm mt-1 flex gap-4">
                                    <span>Roll: {originalStudentData.rollNumber}</span>
                                    <span>Class: {originalStudentData.class}-{originalStudentData.section}</span>
                                    <span>Admission: {originalStudentData.admissionNo}</span>
                                </div>
                                <p className="text-blue-600 text-sm mt-1">
                                    Last updated: {new Date(originalStudentData.lastUpdated).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${originalStudentData.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {originalStudentData.status}
                                </span>
                                <p className="text-xs text-blue-600 mt-1">
                                    Admission Date: {new Date(originalStudentData.admissionDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Tab Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                        {renderActiveComponent()}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialogs */}
            <ConfirmationDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Student"
                message="Are you sure you want to delete this student? This action cannot be undone."
                type="delete"
            />

            <ConfirmationDialog
                isOpen={showTypeConfirmDialog}
                onClose={() => {
                    setShowTypeConfirmDialog(false)
                    setDeleteConfirmText('')
                }}
                onConfirm={handleTypeConfirmDelete}
                title="Type to Confirm"
                message={
                    <div>
                        <p className="mb-4">Please type "delete" to confirm the deletion of this student:</p>
                        <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Type 'delete' here"
                        />
                    </div>
                }
                type="delete"
            />
        </div>
    )
}

export default EditStudentPage