'use client';

import React, { useState, useRef } from 'react';

/**
 * FileUpload - A reusable drag-and-drop file upload component
 * 
 * @param {Array} acceptedFileTypes - Array of accepted file types (e.g., ['.pdf', '.jpg', '.png']) (default: ['.pdf'])
 * @param {number} maxFileSize - Maximum file size in MB (default: 10)
 * @param {boolean} multiple - Whether to allow multiple file uploads (default: false)
 * @param {string} uploadText - Text displayed in the upload area (default: "Drag and drop files or click to upload")
 * @param {string} description - Description text shown below the upload area (default: "Please ensure the PDF file is less than 10MB.")
 * @param {string} width - Width of the component (default: "w-[648.50px]")
 * @param {string} height - Height of the upload area (default: "h-24")
 * @param {string} className - Additional CSS classes for the container
 * @param {boolean} disabled - Whether the upload is disabled (default: false)
 * @param {function} onFileSelect - Callback function when files are selected (receives files array)
 * @param {function} onFileError - Callback function when there's an error (receives error message)
 * @param {function} onDragEnter - Callback function when drag enters the area
 * @param {function} onDragLeave - Callback function when drag leaves the area
 * @param {React.ReactNode} icon - Custom icon component (optional)
 * @param {string} borderStyle - Border style ('solid', 'dashed', 'dotted') (default: 'solid')
 */
const FileUpload = ({
  acceptedFileTypes = ['.pdf'],
  maxFileSize = 10,
  multiple = false,
  uploadText = "Drag and drop files or click to upload",
  description = "Please ensure the PDF file is less than 10MB.",
  width = "w-[648.50px]",
  height = "h-24",
  className = "",
  disabled = false,
  onFileSelect = (files) => console.log('Files selected:', files),
  onFileError = (error) => console.error('File error:', error),
  onDragEnter = () => {},
  onDragLeave = () => {},
  icon = null,
  borderStyle = 'solid'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Convert file types array to accept string for input
  const acceptString = acceptedFileTypes.join(',');

  // Get border style class
  const getBorderClass = () => {
    const baseClass = "border-[1.50px] border-blue-600";
    if (borderStyle === 'dashed') return `${baseClass} border-dashed`;
    if (borderStyle === 'dotted') return `${baseClass} border-dotted`;
    return baseClass;
  };

  /**
   * Validates file size and type
   * @param {File} file - File to validate
   * @returns {Object} - Validation result with isValid boolean and error message
   */
  const validateFile = (file) => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return {
        isValid: false,
        error: `File size must be less than ${maxFileSize}MB`
      };
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(fileExtension)) {
      return {
        isValid: false,
        error: `Only ${acceptedFileTypes.join(', ')} files are allowed`
      };
    }

    return { isValid: true, error: null };
  };

  /**
   * Processes selected files
   * @param {FileList} files - Files to process
   */
  const processFiles = (files) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(validation.error);
      }
    });

    if (errors.length > 0) {
      onFileError(errors[0]); // Show first error
      return;
    }

    if (validFiles.length > 0) {
      if (multiple) {
        setUploadedFiles(prev => [...prev, ...validFiles]);
        onFileSelect([...uploadedFiles, ...validFiles]);
      } else {
        setUploadedFiles(validFiles.slice(0, 1));
        onFileSelect(validFiles.slice(0, 1));
      }
    }
  };

  /**
   * Handles drag over event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handles drag enter event
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
      onDragEnter();
    }
  };

  /**
   * Handles drag leave event
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(false);
      onDragLeave();
    }
  };

  /**
   * Handles drop event
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled) {
      const files = e.dataTransfer.files;
      processFiles(files);
    }
  };

  /**
   * Handles file input change
   */
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  /**
   * Handles click to upload
   */
  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Removes a file from uploaded files
   */
  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFileSelect(newFiles);
  };

  /**
   * Default upload icon
   */
  const DefaultIcon = () => (
    <div className="size-6 overflow-hidden flex items-center justify-center">
      <svg className="w-3.5 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className={`${width} bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start gap-6 p-6 ${className}`}>
      {/* Upload Area */}
      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div 
          className={`self-stretch ${height} px-5 py-6 relative flex flex-col justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 ${
            isDragging ? 'bg-blue-50' : 'hover:bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {/* Border */}
          <div className={`absolute inset-0 rounded-sm ${getBorderClass()} ${isDragging ? 'border-blue-400' : ''}`}></div>
          
          {/* Content */}
          <div className="flex flex-col items-center justify-center gap-3 z-10">
            {/* Icon */}
            <div className="flex justify-center">
              {icon || <DefaultIcon />}
            </div>
            
            {/* Upload Text */}
            <div className="text-center text-neutral-900 text-sm font-normal font-['Arial'] leading-normal">
              {uploadText}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Description */}
      {description && (
        <div className="self-stretch text-zinc-600 text-sm font-normal font-['Arial'] leading-normal">
          {description}
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="self-stretch">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 truncate max-w-md">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;