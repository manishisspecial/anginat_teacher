'use client';

import React, { useState } from 'react';
import Label from '../Lables/Lable';
import StateIcon from '../Icon/StateIcon';
import Button from '../buttons/Button';

/**
 * Card4 - A flexible responsive card component with image, swap components, and customizable actions
 * @param {string} imageUrl - Image URL for the card's image section (default: "")
 * @param {string} title - Card title (default: "Title")
 * @param {string} description - Card description (default: "Description goes here.")
 * @param {boolean} showTitle - Whether to show the title (default: true)
 * @param {boolean} showDescription - Whether to show the description (default: true)
 * @param {boolean} showImage - Whether to show the image section (default: true)
 * @param {boolean} showLabel1 - Show/hide the first label (default: false)
 * @param {boolean} showLabel2 - Show/hide the second label (default: false)
 * @param {boolean} showSwapComponent1 - Show/hide the first swap component (default: true)
 * @param {boolean} showSwapComponent2 - Show/hide the second swap component (default: false)
 * @param {boolean} showSwapComponent3 - Show/hide the third swap component (default: false)
 * @param {boolean} showPrimaryActionComponent - Show/hide the primary action component (default: true)
 * @param {boolean} showSecondaryActionComponent - Show/hide the secondary action component (default: true)
 * @param {React.ReactNode} swapContent1 - Content for the first swap component
 * @param {React.ReactNode} swapContent2 - Content for the second swap component
 * @param {React.ReactNode} swapContent3 - Content for the third swap component
 * @param {string} swapLabel1 - Label for the first swap tab (default: 'Swap 1')
 * @param {string} swapLabel2 - Label for the second swap tab (default: 'Swap 2')
 * @param {string} swapLabel3 - Label for the third swap tab (default: 'Swap 3')
 * @param {string} swapAlignment - 'vertical' or 'horizontal' (default: 'vertical')
 * @param {string} swapPosition - 'top' or 'bottom' (default: 'bottom')
 * @param {React.ReactNode} labels - Custom labels content (optional, overrides default labels)
 * @param {React.ReactNode} actions - Custom actions content (optional, overrides default actions)
 * @param {React.ReactNode} primaryActionComponent - Custom React component for the primary action
 * @param {React.ReactNode} secondaryActionComponent - Custom React component for the secondary action
 * @param {string} actionType - 'button' or 'link' (default: 'button')
 * @param {string} titleType - 'link' or 'text' (default: 'text')
 * @param {string} titleHref - Href for the title if titleType is 'link'
 * @param {boolean} actionsFullWidth - Whether action buttons should occupy full width with equal distribution (default: false)
 * @param {boolean} fullWidth - Whether the card should take full width of its parent container (default: false)
 * @param {string} className - Additional CSS classes
 * @param {string|number} titleFontSize - Font size for the title
 * @param {string|number} descriptionFontSize - Font size for the description
 * @param {function} onPrimaryClick - Function to call when primary action is clicked
 * @param {function} onSecondaryClick - Function to call when secondary action is clicked
 */
const Card = ({
  // Content props
  imageUrl = '',
  title = 'Title',
  description = 'Description goes here.',
  
  // Visibility props
  showTitle = true,
  showDescription = true,
  showImage = true,
  showLabel1 = false,
  showLabel2 = false,
  showSwapComponent1 = true,
  showSwapComponent2 = false,
  showSwapComponent3 = false,
  showPrimaryActionComponent = true,
  showSecondaryActionComponent = true,
  
  // Swap component props
  swapContent1 = null,
  swapContent2 = null,
  swapContent3 = null,
  swapLabel1 = 'Swap 1',
  swapLabel2 = 'Swap 2',
  swapLabel3 = 'Swap 3',
  swapAlignment = 'vertical',
  swapPosition = 'bottom',
  
  // Custom component props
  labels = null,
  actions = null,
  primaryActionComponent = null,
  secondaryActionComponent = null,
  
  // Configuration props
  actionType = 'button',
  titleType = 'text',
  titleHref = '',
  actionsFullWidth = false,
  fullWidth = false,
  className = '',
  titleFontSize,
  descriptionFontSize,
  
  // Event handlers
  onPrimaryClick = () => console.log("Primary action clicked"),
  onSecondaryClick = () => console.log("Secondary action clicked"),
}) => {
  /** State to track which swap component is currently active */
  const [activeSwap, setActiveSwap] = useState(1);

  // Check if any swap component has content
  const hasSwapContent1 = Boolean(swapContent1);
  const hasSwapContent2 = Boolean(swapContent2);
  const hasSwapContent3 = Boolean(swapContent3);

  // Count visible swap components
  const visibleSwaps = [showSwapComponent1, showSwapComponent2, showSwapComponent3].filter(Boolean).length;
  const showSwapTabs = visibleSwaps > 1;

  // Determine card width class
  const cardWidthClass = fullWidth ? 'w-full' : 'Card4-fixed';

  /**
   * Renders a single swap component tab/button
   * @param {number} number - The swap component number (1, 2, or 3)
   * @param {boolean} isVisible - Whether this swap component should be visible
   * @param {string} label - The label text for the tab
   */
  const renderSwapTab = (number, isVisible, label) => {
    if (!isVisible) return null;
    
    return (
      <div
        key={number}
        className={`p-1 ${swapAlignment === 'horizontal' ? 'flex-1' : 'self-stretch'} ${
          activeSwap === number ? 'bg-blue-50' : 'bg-sky-100'
        } rounded-sm outline outline-1 outline-offset-[-1px] outline-blue-600 inline-flex justify-start items-center gap-2 cursor-pointer`}
        onClick={() => setActiveSwap(number)}
      >
        <div className="w-4 h-4 relative bg-white overflow-hidden">
          <div className="w-2.5 h-2.5 absolute left-2 top-2 bg-blue-600 rounded-full"></div>
        </div>
        <div className="flex-1 text-blue-600 text-xs font-['Arial'] leading-none">{label}</div>
      </div>
    );
  };

  /**
   * Renders the content for the currently active swap component
   */
  const renderActiveSwapContent = () => {
    let content = null;
    
    switch (activeSwap) {
      case 1:
        content = swapContent1;
        break;
      case 2:
        content = swapContent2;
        break;
      case 3:
        content = swapContent3;
        break;
      default:
        content = null;
    }
    
    if (content) return content;
    
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
    <Button
      text="Primary"
      size="Small"
      state="Default"
      type="Primary"
      onClick={onPrimaryClick}
      fullWidth={actionsFullWidth}
    />
  );

  /**
   * Default secondary button component
   */
  const DefaultSecondaryButton = () => (
    <Button
      text="Secondary"
      size="Small"
      state="Default"
      type="Secondary"
      onClick={onSecondaryClick}
      fullWidth={actionsFullWidth}
    />
  );

  /**
   * Default primary link component
   */
  const DefaultPrimaryLink = () => (
    <a
      href="#"
      className={`${actionsFullWidth ? 'flex-1 text-center' : ''} text-blue-600 text-base font-normal font-['Arial'] leading-6 hover:underline`}
      onClick={(e) => {
        e.preventDefault();
        onPrimaryClick();
      }}
    >
      Link 1 →
    </a>
  );

  /**
   * Default secondary link component
   */
  const DefaultSecondaryLink = () => (
    <a
      href="#"
      className={`${actionsFullWidth ? 'flex-1 text-center' : ''} text-blue-600 text-base font-normal font-['Arial'] leading-6 hover:underline`}
      onClick={(e) => {
        e.preventDefault();
        onSecondaryClick();
      }}
    >
      Link 2 →
    </a>
  );

  /**
   * Renders actions based on visibility props and action type
   */
  const renderActions = () => {
    const actionsToRender = [];

    if (actionType === 'button') {
      if (showPrimaryActionComponent) {
        const primaryButton = primaryActionComponent || <DefaultPrimaryButton key="primary" />;
        actionsToRender.push(
          actionsFullWidth ? (
            <div key="primary" className="flex-1">
              {primaryButton}
            </div>
          ) : primaryButton
        );
      }

      if (showSecondaryActionComponent) {
        const secondaryButton = secondaryActionComponent || <DefaultSecondaryButton key="secondary" />;
        actionsToRender.push(
          actionsFullWidth ? (
            <div key="secondary" className="flex-1">
              {secondaryButton}
            </div>
          ) : secondaryButton
        );
      }
    } else if (actionType === 'link') {
      if (showPrimaryActionComponent) {
        actionsToRender.push(
          primaryActionComponent || <DefaultPrimaryLink key="primary" />
        );
      }

      if (showSecondaryActionComponent) {
        actionsToRender.push(
          secondaryActionComponent || <DefaultSecondaryLink key="secondary" />
        );
      }
    }

    return actionsToRender;
  };

  /**
   * Renders labels based on visibility props
   */
  const renderLabels = () => {
    const labelsToRender = [];

    if (showLabel1) {
      labelsToRender.push(
        <Label
          key="label1"
          variant="trailing"
          theme="black"
          text="Label"
          icon={<StateIcon state="Error" variant='outlined' strokeColor="black" />}
          textcolor="black"
        />
      );
    }

    if (showLabel2) {
      labelsToRender.push(
        <Label
          key="label2"
          variant="trailing"
          theme="black"
          text="Label"
          icon={<StateIcon state="Error" variant='outlined' strokeColor="black" />}
          textcolor="black"
        />
      );
    }

    return labelsToRender;
  };

  /**
   * Renders the title section based on titleType
   */
  const renderTitle = () => {
    if (!showTitle) return null;

    if (actionType === 'link' && titleType === 'link') {
      return (
        <a
          href={titleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="self-stretch text-blue-600 font-bold font-['Arial'] capitalize hover:underline"
          style={{
            fontSize: titleFontSize || '20px',
            lineHeight: '30px',
            wordWrap: 'break-word'
          }}
        >
          {title}
        </a>
      );
    }

    return (
      <div
        className="self-stretch font-bold font-['Arial'] capitalize"
        style={{
          color: '#151515',
          fontSize: titleFontSize || '20px',
          lineHeight: '30px',
          wordWrap: 'break-word'
        }}
      >
        {title}
      </div>
    );
  };

  /**
   * Renders the swap section based on position and visibility
   */
  const renderSwapSection = () => {
    if (!(showSwapComponent1 || showSwapComponent2 || showSwapComponent3)) return null;

    return (
      <>
        {showSwapTabs && (
          <div className={`self-stretch flex ${swapAlignment === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-6'}`}>
            {renderSwapTab(1, showSwapComponent1, swapLabel1)}
            {renderSwapTab(2, showSwapComponent2, swapLabel2)}
            {renderSwapTab(3, showSwapComponent3, swapLabel3)}
          </div>
        )}
        <div className="self-stretch">
          {renderActiveSwapContent()}
        </div>
      </>
    );
  };

  return (
    <div className={`rounded-xl shadow-md bg-white flex flex-col overflow-hidden ${cardWidthClass} ${className}`}>
      {/* Image Section */}
      {showImage && (
        <div className="w-full flex-shrink-0 bg-gray-100 flex items-center justify-center Card4-img">
          {imageUrl ? (
            <img src={imageUrl} alt="Card visual" className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
              Image Placeholder
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col gap-[12px] md:gap-[12px] p-4 md:px-6 Card4-content">
        {/* Labels Section */}
        {(showLabel1 || showLabel2) && (
          <div className="flex flex-wrap gap-3">
            {labels || renderLabels()}
          </div>
        )}

        {/* Swap Section at Top (if labels are hidden and swapPosition is 'top') */}
        {!(showLabel1 || showLabel2) && swapPosition === 'top' && (
          <div className="mb-4">
            {renderSwapSection()}
          </div>
        )}

        {/* Title */}
        {renderTitle()}

        {/* Description */}
        {showDescription && (
          <div
            className="self-stretch font-normal font-['Arial']"
            style={{
              color: '#2E2E2E',
              fontSize: descriptionFontSize || '14px',
              lineHeight: '24px',
              wordWrap: 'break-word'
            }}
          >
            {description}
          </div>
        )}

        {/* Swap Section at Bottom (default) or if labels are shown */}
        {((showLabel1 || showLabel2) || swapPosition === 'bottom') && renderSwapSection()}

        {/* Actions Section */}
        {(showPrimaryActionComponent || showSecondaryActionComponent) && (
          <div className={`${actionsFullWidth ? 'flex w-full gap-2' : 'flex gap-2'}`}>
            {actions || renderActions()}
          </div>
        )}
      </div>
      
      <style jsx>{`
        ${!fullWidth ? `
        .Card4-fixed {
          width: 90%;
          max-width: 360px;
        }
        @media (min-width: 1024px) {
          .Card4-fixed {
            width: 360px !important;
            height: auto !important;
          }
        }` : ''}
        .Card4-img {
          height: 200px;
        }
        @media (min-width: 1024px) {
          .Card4-img {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;