'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/reusableComponents/buttons/Button'
import Card from '@/components/reusableComponents/Card/Card7'
import Input from '@/components/reusableComponents/InputField/inputField'
import RolesComponent from './component/RolesComponent'
import FilterModal from './component/modal-pop-up/filter'       
import AddRolesModal from './component/modal-pop-up/addroles'
// Simple filter icon component
const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
    </svg>
)
    
const Page = () => {
    const [openModal, setOpenModal] = useState(null);

    const handleFilterClick = () => setOpenModal('filter');
    
    const handleAddRolesClick = () => {
        setOpenModal('addroles'); // close modal
        // router.push('/academic/classes/add-class'); // or any path you want
    };
    const handleCloseModal = () => setOpenModal(null);

    // Handle applying filters
    const handleApplyFilters = (filters) => {
        console.log("Applied filters:", filters)
        // Add your filtering logic here
    }

    // Handle canceling filters
    const handleCancelFilters = () => {
        console.log("Filter cancelled")
        // Add any cancel logic here if needed
    }

    // Handle search input changes
    const handleSearchChange = (value) => {
        console.log("Search input changed:", value)
        // Add your search logic here
    }

    // Move RightComponent here so it can access handleAddClassClick
    const RightComponent = () => (
        <div className="flex flex-row gap-4">
           
            <Button text="Add Role" type="Primary" onClick={handleAddRolesClick} />
        </div>
    );

    return (
        <PageLayout rightContent={<RightComponent />}>
            <Card
                title="Roles List"
                showDescription={false}
                swapContent1={<RolesComponent />}
                showPrimaryButton={true}
                primaryButtonComponent={
                    <Button
                        text="Filter"
                        type="Secondary"
                        size="Compact"
                        variant="Leading"
                        leadingIcon={<FilterIcon />}
                        onClick={handleFilterClick}
                    />
                }
                showSecondaryButton={true}
                secondaryButtonComponent={
                    <Input
                        showLabel={false}
                        placeholder="Search"
                        inputType="default"
                        id="search-classes"
                        className="w-[320px]"
                        onChange={handleSearchChange}
                        fullWidth={true}
                        showSupportingText={false}
                        actionType="text"
                    />
                }
            />

                {openModal === 'filter' && (
                    <FilterModal
                        isOpen={true}
                        onClose={handleCloseModal}
                        onApply={handleApplyFilters}
                        onCancel={handleCancelFilters}
                    />
                )}
                {openModal === 'addroles' && (
                    <AddRolesModal
                        isOpen={true}
                        onClose={handleCloseModal}
                        // ...other props
                    />
                )}
        </PageLayout>
    )
}

export default Page;