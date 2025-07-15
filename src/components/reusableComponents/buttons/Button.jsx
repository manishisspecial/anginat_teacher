'use client';

import React, { useState } from "react";

/**
 * Button - A customizable button component with various states and icon options
 * 
 * @param {string} text - The text to display in the button (default: "Button")
 * @param {string} size - Size variant of the button (default: "Default")
 * @param {string} state - Current state of the button (default: "Default")
 * @param {string} type - Type of button style (default: "Tertiary")
 * @param {string} variant - Button variant, affects icon placement (default: "Default")
 * @param {React.ReactNode} leadingIcon - Icon to display before text
 * @param {React.ReactNode} trailingIcon - Icon to display after text
 * @param {function} onClick - Function to call when button is clicked
 * @param {string} className - Additional CSS classes for the button
 * @param {string} textClass - Additional CSS classes for the text
 * @param {boolean} fullWidth - Whether the button should take up full width (default: false)
 */
const Button = ({
  text = "Button",
  size = "Default",
  state = "Default",
  type = "Secondary",
  variant = "Default",
  leadingIcon,
  trailingIcon,
  onClick,
  className = "",
  textClass = "",
  fullWidth = false,
}) => {
  // State to track hover and focus
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Check if button is icon-only variant
  const isIconOnly = variant === "Icon";

  // Determine if button is disabled
  const isDisabled = state === "Disabled";

  // Base button classes
  const baseClasses = "rounded-lg flex justify-center items-center gap-2 transition-all duration-200";

  // Width class based on fullWidth prop
  const widthClass = fullWidth ? "w-full" : "";

  // Padding classes based on size and variant
  let paddingClasses;
  if (isIconOnly) {
    paddingClasses = "p-2";
  } else {
    switch (size) {
      case "Compact": 
        paddingClasses = "px-4 py-2"; 
        break;
      // case "Large": 
      //   paddingClasses = "px-8 py-4"; 
      //   break;
      default: 
        paddingClasses = "px-6 py-3"; // Default size
    }
  }

  // Cursor class
  const cursorClass = isDisabled ? "cursor-not-allowed" : "cursor-pointer";

  // Get state styles for different button types
  const getStateStyles = () => {
    const baseStyles = {
      Primary: {
        Default: {
          container: "p-1",
          button: "bg-blue-600 hover:bg-blue-600",
          text: "text-white",
          icon: "text-white"
        },
        Hover: {
          container: "p-1",
          button: "bg-blue-600",
          text: "text-white",
          icon: "text-white"
        },
        Focused: {
          container: "p-1 rounded-xl outline outline-2 outline-offset-[-2px] outline-blue-600",
          button: "bg-blue-600",
          text: "text-white",
          icon: "text-white"
        },
        Disabled: {
          container: "p-1",
          button: "bg-gray-300",
          text: "text-gray-500",
          icon: "text-gray-500"
        }
      },
      Secondary: {
        Default: {
          container: "p-1",
          button: "outline outline-1 outline-blue-600 hover:bg-blue-50",
          text: "text-blue-600",
          icon: "text-blue-600"
        },
        Hover: {
          container: "p-1",
          button: "bg-blue-600",
          text: "text-white",
          icon: "text-white"
        },
        Focused: {
          container: "p-1 rounded-xl outline outline-2 outline-offset-[-2px] outline-blue-600",
          button: "bg-blue-600",
          text: "text-white",
          icon: "text-white"
        },
        Disabled: {
          container: "p-1",
          button: "outline outline-1 outline-gray-300",
          text: "text-gray-400",
          icon: "text-gray-400"
        }
      },
      Tertiary: {
        Default: {
          container: "p-1",
          button: "hover:bg-[#E7F0FF]",
          text: "text-[#0364F3] ",
          icon: "text-[#0364F3]"
        },
        Hover: {
          container: "p-1",
          button: "bg-[#E7F0FF]",
          text: "text-[#0364F3]",
          icon: "text-[#0364F3]"
        },
        Focused: {
          container: "p-1 rounded-xl outline outline-2 outline-offset-[-2px] outline-[#0364F3]",
          button: "bg-[#E7F0FF]",
          text: "text-[#0364F3]",
          icon: "text-[#0364F3]"
        },
        Disabled: {
          container: "p-1",
          button: "",
          text: "text-gray-400",
          icon: "text-gray-400"
        }
      }
    };

    return baseStyles[type] || baseStyles.Tertiary;
  };

  // Determine the current visual state
  const determineCurrentState = () => {
    if (isDisabled) return "Disabled";
    if (isFocused) return "Focused";
    if (isHovered) return "Hover";
    return state;
  };

  // Get current state styling
  const stateStyles = getStateStyles();
  const currentState = stateStyles[determineCurrentState()] || stateStyles.Default;

  // Text styling based on size
  let fontSize;
  switch (size) {
    case "Compact": 
      fontSize = "text-sm"; 
      break;
    // case "Large": 
    //   fontSize = "text-lg"; 
    //   break;
    default: 
      fontSize = "text-sm"; // Default size
  }

  // Complete text styling
  const textSizeClass = textClass ? textClass : fontSize;
  const textClasses = `text-center ${currentState.text} ${textSizeClass} font-normal font-['Arial'] leading-normal`;

  // Icon wrapper and styling
  const iconWrapperClasses = "w-4 h-4 relative flex-shrink-0";

  return (
    <div className={`inline-flex ${currentState.container} ${fullWidth ? 'w-full' : ''} ${className}`}>
      <div
        data-type={variant}
        className={`${paddingClasses} ${baseClasses} ${currentState.button} ${cursorClass} ${widthClass}`}
        onClick={!isDisabled ? onClick : undefined}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => !isDisabled && setIsHovered(false)}
        onFocus={() => !isDisabled && setIsFocused(true)}
        onBlur={() => !isDisabled && setIsFocused(false)}
        tabIndex={!isDisabled ? 0 : -1}
        role="button"
        aria-disabled={isDisabled}
      >
        {/* Leading Icon */}
        {(variant === "Leading" || variant === "Icon") && leadingIcon && (
          <div className={iconWrapperClasses}>
            {React.isValidElement(leadingIcon) 
              ? React.cloneElement(leadingIcon, { className: `${leadingIcon.props.className || ''} ${currentState.icon}` })
              : <div className={`w-full h-full ${currentState.icon}`} />
            }
          </div>
        )}

        {/* Button Text */}
        {!isIconOnly && <div className={textClasses}>{text}</div>}

        {/* Trailing Icon */}
        {variant === "Trailing" && trailingIcon && (
          <div className={iconWrapperClasses}>
            {React.isValidElement(trailingIcon) 
              ? React.cloneElement(trailingIcon, { className: `${trailingIcon.props.className || ''} ${currentState.icon}` })
              : <div className={`w-full h-full ${currentState.icon}`} />
            }
          </div>
        )}
      </div>
    </div>
  );
};
export default Button;