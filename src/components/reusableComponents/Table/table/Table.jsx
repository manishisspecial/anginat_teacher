"use client";
import React, { useState, useEffect } from 'react';
import HeaderRow from '../Header/HeaderRow';
import BodyRow from '../Body/BodyRow';
import Pagination from './Pagination'; // Import the separate Pagination component

/**
 * @typedef {Object} RowData
 * @property {number|string} id - Unique identifier for the row
 * @property {Array<string|React.ReactNode>} contents - Array of cell contents for the row (can include buttons, links, or any React components)
 * @property {boolean} [expanded=false] - Whether the row is expanded
 * @property {boolean} [checked=false] - Whether the row is checked
 * @property {boolean} [isExpandable=true] - Whether the row can be expanded
 * @property {boolean} [hasCheckbox=true] - Whether the row has a checkbox
 * @property {React.ReactNode} [expandedContent=null] - Content to show when row is expanded
 */

/**
 * @typedef {Object} TableProps
 * @property {Array<string>} [headers] - Table headers
 * @property {Array<RowData>} [data] - Array of row data objects
 * @property {Function} [onRowExpandToggle] - Callback when a row's expand state changes (rowId, isExpanded)
 * @property {Function} [onRowCheckToggle] - Callback when a row's checkbox state changes (rowId, isChecked)
 * @property {Function} [onHeaderCheckToggle] - Callback when header checkbox changes
 * @property {'XL'|'L'|'M'|'S'} [size='M'] - Size of the table rows
 * @property {string} [className=""] - Additional CSS classes for the table
 * @property {Function} [filterByColumn] - Filter function for filtering rows by column value
 * @property {boolean} [showPagination=false] - Whether to show pagination
 * @property {number} [defaultItemsPerPage=12] - Default items per page for pagination
 * @property {Function} [onPaginationChange] - Callback when pagination changes (currentPage, itemsPerPage) => {}
 * @property {string|React.ReactNode} [emptyStateText="No data available"] - Text or component to show when no data is available
 * @property {string} [emptyStateClassName=""] - Additional CSS classes for the empty state container
 */

/**
 * Table Component with expandable rows and checkbox functionality
 * Supports any type of React component in cells (buttons, links, custom components, etc.)
 * Automatically preserves user interaction states (expanded/checked) when data prop changes
 * Includes optional pagination functionality and empty state placeholder
 * 
 * @param {TableProps} props - Table component props
 * @returns {React.ReactElement} Table component
 */
const Table = ({
    headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
    data = [],
    onRowExpandToggle = null,
    onRowCheckToggle = null,
    onHeaderCheckToggle = null,
    size = 'M',
    className = "",
    filterByColumn = null,
    showPagination = false,
    defaultItemsPerPage = 12,
    onPaginationChange = null,
    emptyStateText = "No data available",
    emptyStateClassName = "",
}) => {
    // State for rows data and header checkbox
    const [rowsData, setRowsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [headerChecked, setHeaderChecked] = useState(false);
    const [hasExpandableRows, setHasExpandableRows] = useState(false);
    const [hasCheckboxRows, setHasCheckboxRows] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    // Memoize data structure to detect actual changes (not just reference changes)
    const dataStructure = React.useMemo(() => {
        return data.map(row => ({
            id: row.id,
            contents: row.contents,
            isExpandable: row.isExpandable !== undefined ? row.isExpandable : true,
            hasCheckbox: row.hasCheckbox !== undefined ? row.hasCheckbox : true,
            expandedContent: row.expandedContent,
            // Don't include expanded/checked in structure comparison
        }));
    }, [data]);

    // Initialize and normalize row data, preserving user interaction states
    useEffect(() => {
        if (dataStructure.length > 0) {
            setRowsData(prevRows => {
                // Create a map of existing row states for quick lookup
                const existingStates = new Map();
                prevRows.forEach(row => {
                    existingStates.set(row.id, {
                        expanded: row.expanded,
                        checked: row.checked
                    });
                });

                // Merge new data with existing states
                const normalizedData = dataStructure.map(row => {
                    const existingState = existingStates.get(row.id);
                    const dataRow = data.find(d => d.id === row.id);
                    
                    return {
                        ...row,
                        // Preserve user interactions if row already exists, otherwise use data defaults
                        expanded: existingState ? existingState.expanded : (dataRow?.expanded || false),
                        checked: existingState ? existingState.checked : (dataRow?.checked || false),
                    };
                });

                return normalizedData;
            });
        } else {
            setRowsData([]);
        }
    }, [dataStructure, data]);

    // Update filtered data when rowsData changes
    useEffect(() => {
        setFilteredData(rowsData);
    }, [rowsData]);

    // Apply filter if provided
    useEffect(() => {
        if (filterByColumn && typeof filterByColumn === 'function') {
            setFilteredData(rowsData.filter(filterByColumn));
        } else {
            setFilteredData(rowsData);
        }
    }, [rowsData, filterByColumn]);

    // Handle pagination - slice data based on current page and items per page
    useEffect(() => {
        if (showPagination) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setDisplayedData(filteredData.slice(startIndex, endIndex));
        } else {
            setDisplayedData(filteredData);
        }
    }, [filteredData, currentPage, itemsPerPage, showPagination]);

    // Reset to first page when filtered data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData.length]);

    // Determine if any rows have expandable content or checkboxes
    useEffect(() => {
        setHasExpandableRows(displayedData.some(row => row.isExpandable));
        setHasCheckboxRows(displayedData.some(row => row.hasCheckbox));
    }, [displayedData]);

    // Update header checkbox state based on all checkable rows in current view
    useEffect(() => {
        const checkableRows = displayedData.filter(row => row.hasCheckbox);
        if (checkableRows.length === 0) {
            setHeaderChecked(false);
            return;
        }

        const allChecked = checkableRows.every(row => row.checked);
        setHeaderChecked(allChecked);
    }, [displayedData]);

    // Handle row expansion toggle
    const handleExpandToggle = (rowId, isExpanded) => {
        setRowsData(prevRows =>
            prevRows.map(row =>
                row.id === rowId ? { ...row, expanded: isExpanded } : row
            )
        );

        if (onRowExpandToggle) {
            onRowExpandToggle(rowId, isExpanded);
        }
    };

    // Handle row checkbox toggle
    const handleCheckToggle = (rowId, isChecked) => {
        setRowsData(prevRows =>
            prevRows.map(row =>
                row.id === rowId ? { ...row, checked: isChecked } : row
            )
        );

        if (onRowCheckToggle) {
            onRowCheckToggle(rowId, isChecked);
        }
    };

    // Handle header checkbox toggle
    const handleHeaderCheckToggle = (isChecked) => {
        setHeaderChecked(isChecked);

        // Only affect rows currently displayed (if pagination) or all rows (if no pagination)
        const rowsToUpdate = showPagination ? displayedData : rowsData;
        const idsToUpdate = rowsToUpdate.filter(row => row.hasCheckbox).map(row => row.id);

        setRowsData(prevRows =>
            prevRows.map(row => ({
                ...row,
                checked: idsToUpdate.includes(row.id) ? isChecked : row.checked
            }))
        );

        if (onHeaderCheckToggle) {
            onHeaderCheckToggle(isChecked);
        }
    };

    // Handle pagination changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (onPaginationChange) {
            onPaginationChange(page, itemsPerPage);
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
        if (onPaginationChange) {
            onPaginationChange(1, newItemsPerPage);
        }
    };

    // Render empty state placeholder
    const renderEmptyState = () => {
        return (
            <div className={`bg-white py-12 px-6 text-center border-t border-gray-200 ${emptyStateClassName}`}>
                <div className="flex flex-col items-center justify-center space-y-3">
                    {/* Empty state icon */}
                    <div className="w-12 h-12 text-gray-300">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    
                    {/* Empty state text */}
                    <div className="text-gray-500 text-base font-medium">
                        {emptyStateText}
                    </div>
                    
                    {/* Optional subtitle for better UX */}
                    <div className="text-gray-400 text-sm">
                        {typeof emptyStateText === 'string' && emptyStateText === "No data available" 
                            ? "There are no items to display at the moment."
                            : ""
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className={`overflow-hidden border border-gray-200 rounded-md ${className}`}>
                {/* Table Header using HeaderRow component */}
                <HeaderRow
                    type={hasCheckboxRows ? 'Checkbox' : 'Normal'}
                    headers={headers}
                    size={size}
                    initialChecked={headerChecked}
                    onCheckToggle={handleHeaderCheckToggle}
                    showExpandableSpace={hasExpandableRows}
                    showCheckboxSpace={hasCheckboxRows}
                    hasCheckbox={hasCheckboxRows}
                    key="header-row"
                />

                {/* Table Body using BodyRow components or Empty State */}
                <div className="bg-white divide-y divide-gray-200" style={{ position: "relative", zIndex: 1 }}>
                    {displayedData.length > 0 ? (
                        displayedData.map((row, rowIndex) => (
                            <BodyRow
                                key={row.id || rowIndex}
                                type={determineRowType(row)}
                                contents={row.contents}
                                size={size}
                                initialExpanded={row.expanded}
                                initialChecked={row.checked}
                                onExpandToggle={(isExpanded) => handleExpandToggle(row.id, isExpanded)}
                                onCheckToggle={(isChecked) => handleCheckToggle(row.id, isChecked)}
                                expandedContent={row.expandedContent}
                                className={row.checked ? '' : ''}
                                showExpandableSpace={hasExpandableRows && !row.isExpandable}
                                showCheckboxSpace={hasCheckboxRows && !row.hasCheckbox}
                                isExpandable={row.isExpandable}
                                hasCheckbox={row.hasCheckbox}
                            />
                        ))
                    ) : (
                        renderEmptyState()
                    )}
                </div>
            </div>

            {/* Pagination Component - only show if there's data or if we want to show it even when empty */}
            {showPagination && filteredData.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}
        </div>
    );
};

/**
 * Helper function to determine the type of row based on its properties
 * 
 * @param {RowData} row - The row data
 * @returns {string} The row type for BodyRow component
 */
const determineRowType = (row) => {
    if (row.isExpandable && row.hasCheckbox) {
        return 'CheckboxExpandable';
    } else if (row.isExpandable && !row.hasCheckbox) {
        return 'Expandable';
    } else if (!row.isExpandable && row.hasCheckbox) {
        return 'Checkbox';
    } else {
        return 'Normal';
    }
};

export default Table;