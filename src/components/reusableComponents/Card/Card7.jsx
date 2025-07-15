"use client";
import React, { useState } from 'react';

/**
 * Card7 - A flexible card component with customizable content areas, action buttons/links, and swap components
 * @param {string} title - The title displayed in the card header (default: "Title")
 * @param {boolean} showTitle - Whether to show the title section (default: true)
 * @param {boolean} showPrimaryButton - Whether to show the primary action (button or link) (default: true)
 * @param {boolean} showSecondaryButton - Whether to show the secondary action (button or link) (default: true)
 * @param {boolean} showMenuButton - Whether to show the menu button (only visible when actionType="Buttons") (default: true)
 * @param {boolean} showSwapComponent1 - Whether to show the first swap component (default: true)
 * @param {boolean} showSwapComponent2 - Whether to show the second swap component (default: true)
 * @param {boolean} showSwapComponent3 - Whether to show the third swap component (default: true)
 * @param {boolean} showDescription - Whether to show the description section (default: true)
 * @param {string} actionType - Action type for header buttons/links (default: "Buttons")
 * @param {string} swapAlignment - Layout direction for swap components (default: "vertical")
 * @param {boolean} fullWidth - Whether the card should take full width of its container (default: false)
 * @param {React.ReactNode} primaryButtonComponent - Custom React component for the primary button
 * @param {React.ReactNode} secondaryButtonComponent - Custom React component for the secondary button
 * @param {string} secondaryButtonText - Text for the default secondary button (default: "Button")
 * @param {React.ReactNode} primaryLinkComponent - Custom React component for the primary link (when actionType="Link")
 * @param {React.ReactNode} secondaryLinkComponent - Custom React component for the secondary link (when actionType="Link")
 * @param {string} description - Description text shown at the bottom of the card (default: "Optional description can be added here")
 * @param {React.ReactNode} swapContent1 - Custom React component for the first swap section
 * @param {React.ReactNode} swapContent2 - Custom React component for the second swap section
 * @param {React.ReactNode} swapContent3 - Custom React component for the third swap section
 * @param {string} swapLabel1 - Label for the first swap component tab (default: "Swap component 1")
 * @param {string} swapLabel2 - Label for the second swap component tab (default: "Swap component 2")
 * @param {string} swapLabel3 - Label for the third swap component tab (default: "Swap component 3")
 * @param {string} width - Width class for the card (ignored when fullWidth=true) (default: "w-full")
 * @param {string} borderRadius - Border radius for the card (default: "rounded-xl")
 * @param {string} className - Additional CSS classes for the card container
 * @param {function} onPrimaryClick - Function to call when primary button is clicked
 * @param {function} onSecondaryClick - Function to call when secondary button is clicked
 * @param {function} onMenuClick - Function to call when menu button is clicked
 * @param {function} onPrimaryLinkClick - Function to call when primary link is clicked
 * @param {function} onSecondaryLinkClick - Function to call when secondary link is clicked
 */
const Card = ({
  title = "Title",
  rightComponent = null,
  showTitle = true,
  showPrimaryButton = false,
  showSecondaryButton = false,
  showMenuButton = false,
  showSwapComponent1 = true,
  showSwapComponent2 = false,
  showSwapComponent3 = false,
  showDescription = true,
  actionType = "Buttons",
  swapAlignment = "vertical",
  fullWidth = true,
  borderRadius = "rounded-xl",
  primaryButtonComponent = null,
  secondaryButtonComponent = null,
  secondaryButtonText = "Button",
  primaryLinkComponent = null,
  secondaryLinkComponent = null,
  description = "Optional description can be added here",
  swapContent1 = null,
  swapContent2 = null,
  swapContent3 = null,
  swapLabel1 = "Swap component 1",
  swapLabel2 = "Swap component 2",
  swapLabel3 = "Swap component 3",
  width = "w-full",
  className = "",
  onPrimaryClick = () => console.log("Primary button clicked"),
  onSecondaryClick = () => console.log("Secondary button clicked"),
  onMenuClick = () => console.log("Menu button clicked"),
  onPrimaryLinkClick = () => console.log("Primary link clicked"),
  onSecondaryLinkClick = () => console.log("Secondary link clicked"),
}) => {
  /** State to track which swap component is currently active */
  const [activeSwap, setActiveSwap] = useState(1);

  // Check if any swap component has content
  const hasSwapContent1 = Boolean(swapContent1);
  const hasSwapContent2 = Boolean(swapContent2);
  const hasSwapContent3 = Boolean(swapContent3);

  // Only show tabs if there's more than one visible swap component
  const visibleSwapComponents = [
    showSwapComponent1,
    showSwapComponent2,
    showSwapComponent3
  ].filter(Boolean).length;

  // Determine if swap tabs section should be shown at all
  const showSwapTabs = visibleSwapComponents > 1;

  // For Link action type, hide menu button
  const shouldShowMenuButton = actionType === "Buttons" && showMenuButton;

  const getHeaderBorderRadius = () => {
    if (borderRadius === 'rounded-xl') return 'rounded-tl-xl rounded-tr-xl';
    if (borderRadius === 'rounded-lg') return 'rounded-tl-lg rounded-tr-lg';
    if (borderRadius === 'rounded-md') return 'rounded-tl-md rounded-tr-md';
    if (borderRadius === 'rounded-sm') return 'rounded-tl-sm rounded-tr-sm';
    if (borderRadius === 'rounded-2xl') return 'rounded-tl-2xl rounded-tr-2xl';
    if (borderRadius === 'rounded-3xl') return 'rounded-tl-3xl rounded-tr-3xl';
    if (borderRadius === 'rounded-full') return 'rounded-tl-full rounded-tr-full';
    if (borderRadius === 'rounded-none') return 'rounded-tl-none rounded-tr-none';
    return 'rounded-tl-xl rounded-tr-xl';
  };

  const getContentBorderRadius = () => {
    if (!showTitle) return borderRadius;
    
    if (borderRadius === 'rounded-xl') return 'rounded-bl-xl rounded-br-xl';
    if (borderRadius === 'rounded-lg') return 'rounded-bl-lg rounded-br-lg';
    if (borderRadius === 'rounded-md') return 'rounded-bl-md rounded-br-md';
    if (borderRadius === 'rounded-sm') return 'rounded-bl-sm rounded-br-sm';
    if (borderRadius === 'rounded-2xl') return 'rounded-bl-2xl rounded-br-2xl';
    if (borderRadius === 'rounded-3xl') return 'rounded-bl-3xl rounded-br-3xl';
    if (borderRadius === 'rounded-full') return 'rounded-bl-full rounded-br-full';
    if (borderRadius === 'rounded-none') return 'rounded-bl-none rounded-br-none';
    return 'rounded-bl-xl rounded-br-xl';
  };

  // Determine the width class based on fullWidth prop
  const cardWidth = fullWidth ? "w-full" : width;

  /**
   * Renders a single swap component tab/button
   * @param {number} number - The swap component number (1, 2, or 3)
   * @param {boolean} isVisible - Whether this swap component should be visible
   * @param {string} label - The label text for the tab
   * @param {boolean} hasContent - Whether this swap component has custom content
   */
  const renderSwapComponent = (number, isVisible, label, hasContent) => {
    if (!isVisible) return null;

    return (
      <div
        key={number}
        className={`${swapAlignment === 'horizontal' ? 'flex-1' : 'self-stretch'} p-1 ${
          activeSwap === number ? 'bg-blue-50' : 'bg-sky-100'
        } rounded-sm outline outline-1 outline-offset-[-1px] outline-blue-600 inline-flex justify-start items-center gap-2 cursor-pointer`}
        onClick={() => setActiveSwap(number)}
      >
        <div className="size-4 relative bg-blend-multiply bg-white overflow-hidden">
          <div className="size-2.5 left-[2.98px] top-[3px] absolute bg-blue-600" />
        </div>
        <div className="flex-1 justify-start text-blue-600 text-xs font-['Arial'] leading-none">
          {label}
        </div>
      </div>
    );
  };

  /**
   * Renders the content for the currently active swap component
   */
  const renderActiveSwapContent = () => {
    // Get the appropriate content based on active swap
    let activeContent = null;
    switch (activeSwap) {
      case 1:
        activeContent = swapContent1;
        break;
      case 2:
        activeContent = swapContent2;
        break;
      case 3:
        activeContent = swapContent3;
        break;
      default:
        activeContent = null;
    }

    // If we have custom content for the active swap, return it
    if (activeContent) {
      return activeContent;
    }

    // Default placeholder content if no content is available
    return (
      <div className="self-stretch text-gray-500 text-sm">
        No content available for this section.
      </div>
    );
  };

  /**
   * Default primary button component
   */
  const DefaultPrimaryButton = () => (
    <div data-type="Default" className="px-4 py-2 bg-blue-600 rounded-lg flex justify-center items-center gap-2 cursor-pointer">
      <div className="text-center justify-start text-white text-sm font-normal font-['Arial'] leading-normal">
        Button
      </div>
    </div>
  );

  /**
   * Default secondary button component
   */
  const DefaultSecondaryButton = () => (
    <div data-type="Default" className="px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-600 flex justify-center items-center gap-2 cursor-pointer">
      <div className="text-center justify-start text-blue-600 text-sm font-normal font-['Arial'] leading-normal">
        {secondaryButtonText}
      </div>
    </div>
  );

  /**
   * Default primary link component
   */
  const DefaultPrimaryLink = () => (
    <div className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline">
      Link →
    </div>
  );

  /**
   * Default secondary link component
   */
  const DefaultSecondaryLink = () => (
    <div className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline">
      Link →
    </div>
  );

  /**
   * Renders action components based on action type (buttons or links)
   */
  const renderActionComponents = () => {
    if (actionType === "Link") {
      return (
        <>
          {showPrimaryButton && (
            <div
              data-size="Compact"
              data-state="Default"
              data-type="Primary"
              data-varaints="Default"
              className="flex justify-start items-start"
              onClick={onPrimaryLinkClick}
            >
              {primaryLinkComponent || <DefaultPrimaryLink />}
            </div>
          )}

          {showSecondaryButton && (
            <div
              data-size="Compact"
              data-state="Default"
              data-type="Secondary"
              data-varaints="Default"
              className="flex justify-start items-start"
              onClick={onSecondaryLinkClick}
            >
              {secondaryLinkComponent || <DefaultSecondaryLink />}
            </div>
          )}
        </>
      );
    }

    /**
     * Default to Buttons action type
     */
    return (
      <>
        {showPrimaryButton && (
          <div
            data-size="Compact"
            data-state="Default"
            data-type="Primary"
            data-varaints="Default"
            className="flex justify-start items-start"
            onClick={onPrimaryClick}
          >
            {primaryButtonComponent || <DefaultPrimaryButton />}
          </div>
        )}

        {showSecondaryButton && (
          <div
            data-size="Compact"
            data-state="Default"
            data-type="Secondary"
            data-varaints="Default"
            className="flex justify-start items-start"
            onClick={onSecondaryClick}
          >
            {secondaryButtonComponent || <DefaultSecondaryButton />}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      data-action-type={actionType}
      data-alignement="Left"
      data-labels="No"
      data-swap-position="Middle"
      data-swap-alignment={swapAlignment}
      data-variant="Widget card"
      className={`${cardWidth} max-w-full ${borderRadius} inline-flex flex-col justify-start items-start ${className}`}
    >
      {/* Header */}
      {showTitle && (
        <div className={`self-stretch px-6 py-3 bg-white ${getHeaderBorderRadius()} outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-start items-center gap-2`}>
          <div className="flex-1 justify-start text-neutral-900 text-xl font-bold font-['Arial'] capitalize leading-loose">
            {title}
          </div>
           {rightComponent && (
    <div className="flex-shrink-0">
      {rightComponent}
    </div>
  )}

          <div className="flex justify-start items-center gap-2">
            {renderActionComponents()}

            {shouldShowMenuButton && (
              <div
                className="flex justify-start items-start cursor-pointer"
                onClick={onMenuClick}
              >
                <div className="p-1 rounded-lg flex justify-center items-center gap-2">
                  <div className="size-6 relative overflow-hidden">
                    <div className="w-[3px] h-3 left-[10.50px] top-[5.50px] absolute bg-blue-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`self-stretch p-6 bg-white ${getContentBorderRadius()} outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6`}>
        {/* Swap tabs with dynamic alignment */}
        {showSwapTabs && (
          <div className={`self-stretch flex ${swapAlignment === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-6'}`}>
            {renderSwapComponent(1, showSwapComponent1, swapLabel1, hasSwapContent1)}
            {renderSwapComponent(2, showSwapComponent2, swapLabel2, hasSwapContent2)}
            {renderSwapComponent(3, showSwapComponent3, swapLabel3, hasSwapContent3)}
          </div>
        )}

        {/* Content Area - Split into two sections: Swap Content and Description */}
        <div className="self-stretch">
          {/* Swap Component Content */}
          {(showSwapComponent1 || showSwapComponent2 || showSwapComponent3) && (
            <div className="self-stretch mb-4">
              {renderActiveSwapContent()}
            </div>
          )}
          
          {/* Description Content - Now independent from swap content */}
          {showDescription && (
            <div className="self-stretch justify-start text-neutral-900 text-base font-['Arial'] leading-normal">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
// "use client";
// import React, { useState } from 'react';

// /**
//  * Card7 - A flexible card component with customizable content areas, action buttons/links, and swap components
//  * @param {string} title - The title displayed in the card header (default: "Title")
//  * @param {boolean} showTitle - Whether to show the title section (default: true)
//  * @param {boolean} showPrimaryButton - Whether to show the primary action (button or link) (default: true)
//  * @param {boolean} showSecondaryButton - Whether to show the secondary action (button or link) (default: true)
//  * @param {boolean} showMenuButton - Whether to show the menu button (only visible when actionType="Buttons") (default: true)
//  * @param {boolean} showSwapComponent1 - Whether to show the first swap component (default: true)
//  * @param {boolean} showSwapComponent2 - Whether to show the second swap component (default: true)
//  * @param {boolean} showSwapComponent3 - Whether to show the third swap component (default: true)
//  * @param {boolean} showDescription - Whether to show the description section (default: true)
//  * @param {string} actionType - Action type for header buttons/links (default: "Buttons")
//  * @param {string} swapAlignment - Layout direction for swap components (default: "vertical")
//  * @param {boolean} fullWidth - Whether the card should take full width of its container (default: false)
//  * @param {React.ReactNode} primaryButtonComponent - Custom React component for the primary button
//  * @param {React.ReactNode} secondaryButtonComponent - Custom React component for the secondary button
//  * @param {string} secondaryButtonText - Text for the default secondary button (default: "Button")
//  * @param {React.ReactNode} primaryLinkComponent - Custom React component for the primary link (when actionType="Link")
//  * @param {React.ReactNode} secondaryLinkComponent - Custom React component for the secondary link (when actionType="Link")
//  * @param {string} description - Description text shown at the bottom of the card (default: "Optional description can be added here")
//  * @param {React.ReactNode} swapContent1 - Custom React component for the first swap section
//  * @param {React.ReactNode} swapContent2 - Custom React component for the second swap section
//  * @param {React.ReactNode} swapContent3 - Custom React component for the third swap section
//  * @param {string} swapLabel1 - Label for the first swap component tab (default: "Swap component 1")
//  * @param {string} swapLabel2 - Label for the second swap component tab (default: "Swap component 2")
//  * @param {string} swapLabel3 - Label for the third swap component tab (default: "Swap component 3")
//  * @param {string} width - Width class for the card (ignored when fullWidth=true) (default: "w-full")
//  * @param {string} className - Additional CSS classes for the card container
//  * @param {string} borderStyle - Border style for the card (default: "outline outline-1 outline-offset-[-1px] outline-neutral-200")
//  * @param {string} borderRadius - Border radius for the card (default: "rounded-xl")
//  * @param {string} headerPadding - Padding for the header section (default: "px-6 py-3")
//  * @param {string} contentPadding - Padding for the content section (default: "p-6")
//  * @param {function} onPrimaryClick - Function to call when primary button is clicked
//  * @param {function} onSecondaryClick - Function to call when secondary button is clicked
//  * @param {function} onMenuClick - Function to call when menu button is clicked
//  * @param {function} onPrimaryLinkClick - Function to call when primary link is clicked
//  * @param {function} onSecondaryLinkClick - Function to call when secondary link is clicked
//  */
// const Card = ({
//   title = "Title",
//   showTitle = true,
//   showPrimaryButton = false,
//   showSecondaryButton = false,
//   showMenuButton = false,
//   showSwapComponent1 = true,
//   showSwapComponent2 = false,
//   showSwapComponent3 = false,
//   showDescription = true,
//   actionType = "Buttons",
//   swapAlignment = "vertical",
//   fullWidth = true,
//   primaryButtonComponent = null,
//   secondaryButtonComponent = null,
//   secondaryButtonText = "Button",
//   primaryLinkComponent = null,
//   secondaryLinkComponent = null,
//   description = "Optional description can be added here",
//   swapContent1 = null,
//   swapContent2 = null,
//   swapContent3 = null,
//   swapLabel1 = "Swap component 1",
//   swapLabel2 = "Swap component 2",
//   swapLabel3 = "Swap component 3",
//   width = "w-full",
//   className = "",
//   borderStyle = "outline outline-1 outline-offset-[-1px] outline-neutral-200",
//   borderRadius = "rounded-xl",
//   headerPadding = "px-6 py-3",
//   contentPadding = "p-6",
//   onPrimaryClick = () => console.log("Primary button clicked"),
//   onSecondaryClick = () => console.log("Secondary button clicked"),
//   onMenuClick = () => console.log("Menu button clicked"),
//   onPrimaryLinkClick = () => console.log("Primary link clicked"),
//   onSecondaryLinkClick = () => console.log("Secondary link clicked"),
// }) => {
//   /** State to track which swap component is currently active */
//   const [activeSwap, setActiveSwap] = useState(1);

//   // Check if any swap component has content
//   const hasSwapContent1 = Boolean(swapContent1);
//   const hasSwapContent2 = Boolean(swapContent2);
//   const hasSwapContent3 = Boolean(swapContent3);

//   // Only show tabs if there's more than one visible swap component
//   const visibleSwapComponents = [
//     showSwapComponent1,
//     showSwapComponent2,
//     showSwapComponent3
//   ].filter(Boolean).length;

//   // Determine if swap tabs section should be shown at all
//   const showSwapTabs = visibleSwapComponents > 1;

//   // For Link action type, hide menu button
//   const shouldShowMenuButton = actionType === "Buttons" && showMenuButton;

//   // Determine the width class based on fullWidth prop
//   const cardWidth = fullWidth ? "w-full" : width;

//   // Helper function to get appropriate border radius classes
//   const getHeaderBorderRadius = () => {
//     if (borderRadius === 'rounded-xl') return 'rounded-tl-xl rounded-tr-xl';
//     if (borderRadius === 'rounded-lg') return 'rounded-tl-lg rounded-tr-lg';
//     if (borderRadius === 'rounded-md') return 'rounded-tl-md rounded-tr-md';
//     if (borderRadius === 'rounded-sm') return 'rounded-tl-sm rounded-tr-sm';
//     if (borderRadius === 'rounded-2xl') return 'rounded-tl-2xl rounded-tr-2xl';
//     if (borderRadius === 'rounded-3xl') return 'rounded-tl-3xl rounded-tr-3xl';
//     if (borderRadius === 'rounded-full') return 'rounded-tl-full rounded-tr-full';
//     if (borderRadius === 'rounded-none') return 'rounded-tl-none rounded-tr-none';
//     return 'rounded-tl-xl rounded-tr-xl';
//   };

//   const getContentBorderRadius = () => {
//     if (!showTitle) return borderRadius;
    
//     if (borderRadius === 'rounded-xl') return 'rounded-bl-xl rounded-br-xl';
//     if (borderRadius === 'rounded-lg') return 'rounded-bl-lg rounded-br-lg';
//     if (borderRadius === 'rounded-md') return 'rounded-bl-md rounded-br-md';
//     if (borderRadius === 'rounded-sm') return 'rounded-bl-sm rounded-br-sm';
//     if (borderRadius === 'rounded-2xl') return 'rounded-bl-2xl rounded-br-2xl';
//     if (borderRadius === 'rounded-3xl') return 'rounded-bl-3xl rounded-br-3xl';
//     if (borderRadius === 'rounded-full') return 'rounded-bl-full rounded-br-full';
//     if (borderRadius === 'rounded-none') return 'rounded-bl-none rounded-br-none';
//     return 'rounded-bl-xl rounded-br-xl';
//   };

//   /**
//    * Renders a single swap component tab/button
//    * @param {number} number - The swap component number (1, 2, or 3)
//    * @param {boolean} isVisible - Whether this swap component should be visible
//    * @param {string} label - The label text for the tab
//    * @param {boolean} hasContent - Whether this swap component has custom content
//    */
//   const renderSwapComponent = (number, isVisible, label, hasContent) => {
//     if (!isVisible) return null;

//     return (
//       <div
//         key={number}
//         className={`${swapAlignment === 'horizontal' ? 'flex-1' : 'self-stretch'} p-1 ${
//           activeSwap === number ? 'bg-blue-50' : 'bg-sky-100'
//         } rounded-sm outline outline-1 outline-offset-[-1px] outline-blue-600 inline-flex justify-start items-center gap-2 cursor-pointer`}
//         onClick={() => setActiveSwap(number)}
//       >
//         <div className="size-4 relative bg-blend-multiply bg-white overflow-hidden">
//           <div className="size-2.5 left-[2.98px] top-[3px] absolute bg-blue-600" />
//         </div>
//         <div className="flex-1 justify-start text-blue-600 text-xs font-['Arial'] leading-none">
//           {label}
//         </div>
//       </div>
//     );
//   };

//   /**
//    * Renders the content for the currently active swap component
//    */
//   const renderActiveSwapContent = () => {
//     // Get the appropriate content based on active swap
//     let activeContent = null;
//     switch (activeSwap) {
//       case 1:
//         activeContent = swapContent1;
//         break;
//       case 2:
//         activeContent = swapContent2;
//         break;
//       case 3:
//         activeContent = swapContent3;
//         break;
//       default:
//         activeContent = null;
//     }

//     // If we have custom content for the active swap, return it
//     if (activeContent) {
//       return activeContent;
//     }

//     // Default placeholder content if no content is available
//     return (
//       <div className="self-stretch text-gray-500 text-sm">
//         No content available for this section.
//       </div>
//     );
//   };

//   /**
//    * Default primary button component
//    */
//   const DefaultPrimaryButton = () => (
//     <div data-type="Default" className="px-4 py-2 bg-blue-600 rounded-lg flex justify-center items-center gap-2 cursor-pointer">
//       <div className="text-center justify-start text-white text-sm font-normal font-['Arial'] leading-normal">
//         Button
//       </div>
//     </div>
//   );

//   /**
//    * Default secondary button component
//    */
//   const DefaultSecondaryButton = () => (
//     <div data-type="Default" className="px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-600 flex justify-center items-center gap-2 cursor-pointer">
//       <div className="text-center justify-start text-blue-600 text-sm font-normal font-['Arial'] leading-normal">
//         {secondaryButtonText}
//       </div>
//     </div>
//   );

//   /**
//    * Default primary link component
//    */
//   const DefaultPrimaryLink = () => (
//     <div className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline">
//       Link →
//     </div>
//   );

//   /**
//    * Default secondary link component
//    */
//   const DefaultSecondaryLink = () => (
//     <div className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline">
//       Link →
//     </div>
//   );

//   /**
//    * Renders action components based on action type (buttons or links)
//    */
//   const renderActionComponents = () => {
//     if (actionType === "Link") {
//       return (
//         <>
//           {showPrimaryButton && (
//             <div
//               data-size="Compact"
//               data-state="Default"
//               data-type="Primary"
//               data-varaints="Default"
//               className="flex justify-start items-start"
//               onClick={onPrimaryLinkClick}
//             >
//               {primaryLinkComponent || <DefaultPrimaryLink />}
//             </div>
//           )}

//           {showSecondaryButton && (
//             <div
//               data-size="Compact"
//               data-state="Default"
//               data-type="Secondary"
//               data-varaints="Default"
//               className="flex justify-start items-start"
//               onClick={onSecondaryLinkClick}
//             >
//               {secondaryLinkComponent || <DefaultSecondaryLink />}
//             </div>
//           )}
//         </>
//       );
//     }

//     /**
//      * Default to Buttons action type
//      */
//     return (
//       <>
//         {showPrimaryButton && (
//           <div
//             data-size="Compact"
//             data-state="Default"
//             data-type="Primary"
//             data-varaints="Default"
//             className="flex justify-start items-start"
//             onClick={onPrimaryClick}
//           >
//             {primaryButtonComponent || <DefaultPrimaryButton />}
//           </div>
//         )}

//         {showSecondaryButton && (
//           <div
//             data-size="Compact"
//             data-state="Default"
//             data-type="Secondary"
//             data-varaints="Default"
//             className="flex justify-start items-start"
//             onClick={onSecondaryClick}
//           >
//             {secondaryButtonComponent || <DefaultSecondaryButton />}
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <div
//       data-action-type={actionType}
//       data-alignement="Left"
//       data-labels="No"
//       data-swap-position="Middle"
//       data-swap-alignment={swapAlignment}
//       data-variant="Widget card"
//       className={`${cardWidth} max-w-full ${borderRadius} inline-flex flex-col justify-start items-start ${className}`}
//     >
//       {/* Header */}
//       {showTitle && (
//         <div className={`self-stretch ${headerPadding} bg-white ${getHeaderBorderRadius()} ${borderStyle} inline-flex justify-start items-center gap-2`}>
//           <div className="flex-1 justify-start text-neutral-900 text-xl font-bold font-['Arial'] capitalize leading-loose">
//             {title}
//           </div>

//           <div className="flex justify-start items-center gap-2">
//             {renderActionComponents()}

//             {shouldShowMenuButton && (
//               <div
//                 className="flex justify-start items-start cursor-pointer"
//                 onClick={onMenuClick}
//               >
//                 <div className="p-1 rounded-lg flex justify-center items-center gap-2">
//                   <div className="size-6 relative overflow-hidden">
//                     <div className="w-[3px] h-3 left-[10.50px] top-[5.50px] absolute bg-blue-600" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       <div className={`self-stretch ${contentPadding} bg-white ${getContentBorderRadius()} ${borderStyle} flex flex-col justify-start items-start gap-6`}>
//         {/* Swap tabs with dynamic alignment */}
//         {showSwapTabs && (
//           <div className={`self-stretch flex ${swapAlignment === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-6'}`}>
//             {renderSwapComponent(1, showSwapComponent1, swapLabel1, hasSwapContent1)}
//             {renderSwapComponent(2, showSwapComponent2, swapLabel2, hasSwapContent2)}
//             {renderSwapComponent(3, showSwapComponent3, swapLabel3, hasSwapContent3)}
//           </div>
//         )}

//         {/* Content Area - Split into two sections: Swap Content and Description */}
//         <div className="self-stretch">
//           {/* Swap Component Content */}
//           {(showSwapComponent1 || showSwapComponent2 || showSwapComponent3) && (
//             <div className="self-stretch mb-4">
//               {renderActiveSwapContent()}
//             </div>
//           )}
          
//           {/* Description Content - Now independent from swap content */}
//           {showDescription && (
//             <div className="self-stretch justify-start text-neutral-900 text-base font-['Arial'] leading-normal">
//               {description}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;