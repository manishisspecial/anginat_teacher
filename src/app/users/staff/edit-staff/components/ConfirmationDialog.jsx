import React from 'react'

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, type = 'delete' }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="mb-4">
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                            type === 'delete' ? 'bg-red-100' : 'bg-orange-100'
                        }`}>
                            <span className={`text-2xl ${type === 'delete' ? 'text-red-600' : 'text-orange-600'}`}>
                                !
                            </span>
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <div className="text-gray-600 mb-6">
                        {typeof message === 'string' ? <p>{message}</p> : message}
                    </div>
                    
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 text-white rounded transition-colors ${
                                type === 'delete' 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {type === 'delete' ? 'Delete' : 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog