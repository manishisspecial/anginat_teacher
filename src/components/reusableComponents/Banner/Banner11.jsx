'use client';

import React from 'react';

/**
 * Reusable Banner Component
 * 
 * A flexible banner component that supports different themes and accepts any action component.
 * This component provides the basic banner structure with badge slot and action slot.
 * 
 * @component
 * @example
 * // Basic banner with badge only
 * <Banner
 *   theme="error"
 *   badgeComponent={<Badge>Error</Badge>}
 *   content="Lorem ipsum dolor sit amet, consectetur."
 * />
 * 
 * @example
 * // Banner with custom action component
 * <Banner
 *   theme="warning"
 *   badgeComponent={<Badge>Warning</Badge>}
 *   content="Lorem ipsum dolor sit amet, consectetur."
 *   actionComponent={<Button onClick={handleClick}>Click me</Button>}
 * />
 * 
 * @example
 * // Full width banner with action
 * <Banner
 *   theme="success"
 *   badgeComponent={<Badge>Success</Badge>}
 *   content="Lorem ipsum dolor sit amet, consectetur."
 *   actionComponent={<Link href="/example">Go to link</Link>}
 *   fullWidth={true}
 * />
 */
const Banner = ({
  // Core parameters
  variant = 'Default',
  type = 'Badge', // Can be 'Badge' or 'Icon'
  state = 'Error',
  theme = 'Light',
  
  // Theme and styling
  fullWidth = false,
  className = '',
  
  // Components
  badgeComponent = null,
  actionComponent = null,
  iconComponent = null, // New prop for icon component
  
  // Content
  content = 'Lorem ipsum dolor sit amet, consectetur.',
  
  // Event handlers
  onBannerClick = null,
  
  // Accessibility
  role = 'alert',
  ariaLabel = null,
  
  // Advanced customization
  customStyles = {},
  testId = null
}) => {
  /**
   * Get theme and state specific styling configuration
   * @param {string} themeType - The theme type ('Light', 'Dark')
   * @param {string} stateType - The state type ('Error', 'Warning', 'Success')
   * @returns {Object} Theme configuration object
   */
  const getThemeConfig = (themeType, stateType) => {
    const configs = {
      Light: {
        Error: {
          background: '#FDE8E8',
          iconColor: '#D41313'
        },
        Warning: {
          background: '#FDEFE0',
          iconColor: '#A84C00'
        },
        Success: {
          background: '#EAFAE6',
          iconColor: '#197A00'
        }
      },
      Dark: {
        Error: {
          background: '#5C1A1A',
          iconColor: '#D41313'
        },
        Warning: {
          background: '#fa8c16',
          iconColor: '#A84C00'
        },
        Success: {
          background: '#1A5C1A',
          iconColor: '#197A00'
        }
      }
    };
    
    return configs[themeType]?.[stateType] || configs.Light.Error;
  };

  /**
   * Calculate dynamic width based on content and action type
   * @returns {string} Width value in pixels or percentage
   */
  const calculateWidth = () => {
    if (fullWidth) return '100%';
    
    // Base widths matching your design
    const widths = {
      'badge-only': '666px',
      'badge-action': '602px',
      'icon-only': '666px',
      'icon-action': '533px'
    };
    
    const key = type === 'Icon' ? 'icon' : 'badge';
    return actionComponent ? widths[`${key}-action`] : widths[`${key}-only`];
  };

  /**
   * Render the icon or badge component with proper wrapper styling
   * @returns {JSX.Element|null} The rendered icon/badge component or null
   */
  const renderIconOrBadge = () => {
    if (type === 'Icon') {
      if (!iconComponent) return null;
      
      const iconWrapperStyle = {
        width: '32px',
        height: '32px',
        position: 'relative',
        overflow: 'hidden'
      };
      
      return (
        <div style={iconWrapperStyle}>
          {iconComponent}
        </div>
      );
    }
    
    return badgeComponent;
  };

  /**
   * Render the action component with proper wrapper styling
   * @returns {JSX.Element|null} The rendered action component or null
   */
  const renderAction = () => {
    if (!actionComponent) return null;
    
    const actionWrapperStyle = {
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '16px',
      display: 'flex'
    };
    
    return (
      <div style={actionWrapperStyle}>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
          {actionComponent}
        </div>
      </div>
    );
  };

  const themeConfig = getThemeConfig(theme, state);
  const bannerWidth = calculateWidth();

  // Text color based on theme
  let textColor;
  if (state === 'Warning') {
    textColor = '#151515';
  } else {
    textColor = theme === 'Dark' ? '#FFFFFF' : '#151515';
  }

  // Main banner container styles
  const bannerStyle = {
    width: bannerWidth,
    paddingLeft: '24px',
    paddingRight: '24px', 
    paddingTop: '12px',
    paddingBottom: '12px',
    background: themeConfig.background,
    borderRadius: '8px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '48px',
    display: 'inline-flex',
    cursor: onBannerClick ? 'pointer' : 'default',
    ...customStyles
  };

  // Content area styles
  const contentAreaStyle = {
    flex: '1 1 0',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    gap: '16px',
    display: 'flex'
  };
  
  // Text content styles
  const textStyle = {
    flex: '1 1 0',
    color: textColor,
    fontSize: '16px',
    fontFamily: 'Arial',
    fontWeight: 400,
    lineHeight: '24px',
    wordWrap: 'break-word'
  };

  return (
    <div 
      style={bannerStyle}
      className={className}
      role={role}
      aria-label={ariaLabel || `${state} banner: ${content}`}
      onClick={onBannerClick}
      data-testid={testId}
      data-variant={variant}
      data-type={type}
      data-state={state}
      data-theme={theme}
      data-has-action={!!actionComponent}
      data-full-width={fullWidth}
    >
      {/* Content Section */}
      <div style={contentAreaStyle}>
        {/* Icon/Badge Component Slot */}
        {renderIconOrBadge()}
        
        {/* Text Content */}
        <div style={textStyle}>
          {content}
        </div>
      </div>
      
      {/* Action Section */}
      {renderAction()}
    </div>
  );
};

/**
 * PropTypes definition for better development experience
 * @typedef {Object} BannerProps
 * @property {'Default'} [variant='Default'] - Component variant
 * @property {'Badge'|'Icon'} [type='Badge'] - Component type
 * @property {'Error'|'Warning'|'Success'} [state='Error'] - Visual state of the banner
 * @property {'Light'|'Dark'} [theme='Light'] - Theme variant
 * @property {boolean} [fullWidth=false] - Whether banner should take full width of container
 * @property {string} [className=''] - Additional CSS classes
 * @property {React.ReactNode} [badgeComponent] - Badge component to render
 * @property {React.ReactNode} [iconComponent] - Icon component to render when type is 'Icon'
 * @property {React.ReactNode} [actionComponent] - Action component to render (button, link, etc.)
 * @property {string} [content] - Main text content of the banner
 * @property {Function} [onBannerClick] - Click handler for entire banner
 * @property {string} [role='alert'] - ARIA role for accessibility
 * @property {string} [ariaLabel] - ARIA label for accessibility
 * @property {Object} [customStyles={}] - Custom inline styles
 * @property {string} [testId] - Test ID for testing frameworks
 */

// Component display name for debugging
Banner.displayName = 'Banner';

export default Banner;

// Named export as well
export { Banner };

/**
 * Usage Examples:
 * 
 * 1. Error Banner with Icon (Light Theme):
 * <Banner 
 *   variant="Default"
 *   type="Icon"
 *   state="Error"
 *   theme="Light"
 *   iconComponent={<div style={{width: '21.33px', height: '21.33px', background: '#D41313'}} />}
 *   content="Something went wrong. Please try again." 
 * />
 * 
 * 2. Warning Banner with Icon and Action:
 * <Banner 
 *   variant="Default"
 *   type="Icon"
 *   state="Warning"
 *   theme="Light"
 *   iconComponent={<div style={{width: '21.34px', height: '18.67px', background: '#A84C00'}} />}
 *   content="Your session will expire soon."
 *   actionComponent={<Button onClick={extendSession}>Extend Session</Button>}
 * />
 * 
 * 3. Success Banner with Icon and Link:
 * <Banner 
 *   variant="Default"
 *   type="Icon"
 *   state="Success"
 *   theme="Light"
 *   iconComponent={<div style={{width: '21.33px', height: '21.33px', background: '#197A00'}} />}
 *   content="Your changes have been saved successfully."
 *   actionComponent={<Link href="/view">View Changes</Link>}
 * />
 */