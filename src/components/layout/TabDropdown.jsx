// app/components/TabDropdown.jsx
export default function TabDropdown({ isOpen, tabId, children }) {
  if (!isOpen) return null
  
  return (
    <div 
      className="dropdown-container absolute left-0 right-0 z-20 transform transition-all duration-300 origin-top w-full overflow-x-auto"
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        top: "100%"
      }}
      data-dropdown-tab={tabId}
    >
      <div className="bg-white w-full">
        {children}
      </div>
    </div>
  )
}