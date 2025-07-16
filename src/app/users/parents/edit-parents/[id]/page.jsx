"use client";
import React from 'react'
import Button from '@/components/reusableComponents/buttons/Button'
import PersonalInformation from '../../add-parents/components/PersonalInformation/PersonalInformation'
import ChildInformation from '../../add-parents/components/ChildInformation/ChildInformation'
import AddressInformation from '../../add-parents/components/AddressInformation/AddressInformation'
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useEditParentLogic } from './editParentLogic'

const EditParentPage = () => {
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
        originalParentData,
        parentId,

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
        handleDeleteParent,
        handleDeleteConfirm,
        handleTypeConfirmDelete,
        updateFormData,
        fetchParentData
    } = useEditParentLogic()

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
            case 'childInformation':
                return <ChildInformation {...commonProps} />
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
                    text="Delete Parent"
                    type="Secondary"
                    onClick={handleDeleteParent}
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
                        text={loading ? "Updating..." : "Update Parent"}
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
                        <p>Loading parent data...</p>
                        <p className="text-sm text-gray-500">Parent ID: {parentId}</p>
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
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Parent</h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <p className="text-sm text-gray-400 mb-4">Parent ID: {parentId}</p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                text="Retry"
                                type="Primary"
                                onClick={() => fetchParentData(parentId)}
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
                            Editing Parent - {originalParentData?.firstName} {originalParentData?.lastName}
                        </h1>
                        {originalParentData && (
                            <p className="text-sm text-gray-500 mt-1">
                                Child: {originalParentData.childName} • 
                                Student ID: {originalParentData.studentId} • 
                                Status: {originalParentData.status}
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
                {/* Parent Info Banner */}
                {originalParentData && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-blue-800 mb-2">Parent Information</h3>
                                <p className="text-blue-700 font-medium">
                                    {originalParentData.firstName} {originalParentData.lastName}
                                </p>
                                <div className="text-blue-600 text-sm mt-1 flex gap-4">
                                    <span>Child: {originalParentData.childName}</span>
                                    <span>Student ID: {originalParentData.studentId}</span>
                                    <span>Class: {originalParentData.class}</span>
                                </div>
                                <p className="text-blue-600 text-sm mt-1">
                                    Last updated: {new Date(originalParentData.lastUpdated).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${originalParentData.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {originalParentData.status}
                                </span>
                                <p className="text-xs text-blue-600 mt-1">
                                    Registration Date: {new Date(originalParentData.registrationDate).toLocaleDateString()}
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
                title="Delete Parent"
                message="Are you sure you want to delete this parent? This action cannot be undone."
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
                        <p className="mb-4">Please type "delete" to confirm the deletion of this parent:</p>
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

export default EditParentPage