'use client'
import React from 'react';
import Image from 'next/image';

/**
 * CustomCard - A highly customizable card component for Next.js applications
 * 
 * @component
 * @example
 * // Basic usage
 * <CustomCard 
 *   title="My Card Title"
 *   description="Card description here"
 * />
 * 
 * @example
 * // Advanced usage with custom components and styling
 * <CustomCard
 *   title="Course Title"
 *   description="Learn advanced React concepts"
 *   cardBgColor="bg-blue-50"
 *   image="/course-image.jpg"
 *   badgeComponent={<span className="bg-red-500 text-white px-2 py-1 rounded">New</span>}
 *   swapComponent1={<button className="btn-primary">Enroll Now</button>}
 *   onBookmarkClick={() => console.log('Bookmarked!')}
 * />
 * 
 * @param {Object} props - The component props
 * 
 * @param {string} [props.width="w-full"] - Width CSS class for the card container
 * @param {string} [props.className=""] - Additional CSS classes to apply to the card
 * @param {string} [props.cardBgColor="bg-white"] - Background color class for the card (e.g., 'bg-blue-50', 'bg-gray-100')
 * 
 * @param {boolean} [props.showImage=true] - Whether to display the image section
 * @param {string|Object} [props.image] - Image source URL or Next.js image object {src, alt, width, height}
 * @param {number} [props.imageWidth=400] - Image width for Next.js Image component
 * @param {number} [props.imageHeight=200] - Image height for Next.js Image component
 * 
 * @param {boolean} [props.showBadge=true] - Whether to display the badge overlay
 * @param {React.ReactNode} [props.badgeComponent=null] - Custom badge component to render
 * 
 * @param {boolean} [props.showLabel1=true] - Whether to show the first label
 * @param {string} [props.label1Text="Label"] - Text content for the first label
 * @param {React.ReactNode} [props.label1Icon] - Custom icon for the first label
 * @param {boolean} [props.showLabel2=true] - Whether to show the second label
 * @param {string} [props.label2Text="Label"] - Text content for the second label
 * @param {React.ReactNode} [props.label2Icon] - Custom icon for the second label
 * 
 * @param {string} [props.title="Title"] - Main title text for the card
 * @param {string} [props.titleClassName=""] - Additional CSS classes for the title
 * @param {string} [props.description] - Description text for the card
 * @param {string} [props.descriptionClassName=""] - Additional CSS classes for the description
 * 
 * @param {boolean} [props.showSwapComponent1=true] - Whether to show the first swap component area
 * @param {React.ReactNode} [props.swapComponent1=null] - Custom component for the first swap area
 * @param {boolean} [props.showSwapComponent2=true] - Whether to show the second swap component area
 * @param {React.ReactNode} [props.swapComponent2=null] - Custom component for the second swap area
 * @param {boolean} [props.showSwapComponent3=true] - Whether to show the third swap component area
 * @param {React.ReactNode} [props.swapComponent3=null] - Custom component for the third swap area
 * @param {string} [props.position="bottom"] - Position for swap components
 * 
 * @param {boolean} [props.showFooter=true] - Whether to display the footer section
 * @param {boolean} [props.showDuration=true] - Whether to show the duration in the footer
 * @param {string} [props.durationText="4h 32min"] - Text to display for duration
 * @param {React.ReactNode} [props.durationIcon] - Custom icon for duration (defaults to clock icon)
 * @param {boolean} [props.showRight=true] - Whether to show the right side of the footer
 * @param {boolean} [props.showRating=true] - Whether to show the rating in the footer
 * @param {string|number} [props.ratingValue="3.2"] - Rating value to display
 * @param {React.ReactNode} [props.ratingIcon] - Custom icon for rating (defaults to star icon)
 * @param {boolean} [props.showBookmark=true] - Whether to show the bookmark button
 * @param {function} [props.onBookmarkClick] - Callback function when bookmark is clicked
 * @param {boolean} [props.isBookmarked=false] - Whether the item is currently bookmarked
 * 
 * @param {function} [props.onCardClick] - Callback function when the card is clicked
 * @param {string} [props.cardRole=""] - ARIA role for accessibility
 * @param {string} [props.cardAriaLabel=""] - ARIA label for accessibility
 * @param {boolean} [props.showDescription=true] - Whether to show the description
 * @returns {React.ReactElement} The rendered CustomCard component
 */
const Card6 = ({
  // Layout and styling
  width = "w-full",
  className = "",
  cardBgColor = "bg-white",

  // Image options
  showImage = true,
  image = "/placeholder-image.jpg", // Use a local placeholder image
  imageWidth = 400,
  imageHeight = 200,

  // Badge options
  showBadge = true,
  badgeComponent = null,

  // Label options
  showLabel1 = true,
  label1Text = "Label",
  label1Icon = null,
  showLabel2 = true,
  label2Text = "Label",
  label2Icon = null,

  // Content options
  title = "Title",
  titleClassName = "",
  showDescription = true,
  description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.",
  descriptionClassName = "",

  // Swap component options
  showSwapComponent1 = false, // Changed default to false
  swapComponent1 = null,
  showSwapComponent2 = false, // Changed default to false
  swapComponent2 = null,
  showSwapComponent3 = false, // Changed default to false
  swapComponent3 = null,
  position = "bottom", // New prop for controlling swap component position

  // Footer options
  showFooter = true,
  showDuration = true,
  durationText = "4h 32min",
  durationIcon = null,
  showRight = true,
  showRating = true,
  ratingValue = "3.2",
  ratingIcon = null,
  showBookmark = true,
  onBookmarkClick = () => {},
  isBookmarked = false,

  // Interaction options
  onCardClick = null,
  cardRole = "",
  cardAriaLabel = "",
}) => {
  // Image handling for Next.js Image component
  const getImageProps = () => {
    if (typeof image === "string") {
      return {
        src: image,
        alt: "Card image",
      };
    }
    return {
      src: image.src,
      alt: image.alt || "Card image",
    };
  };

  // Default icons (using simple SVG paths)
  const DefaultClockIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
    </svg>
  );

  const DefaultStarIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  );

  const DefaultLabelIcon = () => (
    <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full" />
  );

  const DefaultBookmarkIcon = ({ filled = false }) => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2z"/>
    </svg>
  );

  // Determine if we should show any swap components
  const showAnySwapComponents = (showSwapComponent1 && swapComponent1) || 
                                (showSwapComponent2 && swapComponent2) || 
                                (showSwapComponent3 && swapComponent3);

  // Card click handler
  const handleCardClick = (e) => {
    if (onCardClick && !e.target.closest('button')) {
      onCardClick(e);
    }
  };

  // Only show footer if there's actual content to display
  const shouldShowFooter = showFooter && (
    (showDuration && durationText) || 
    (showRight && ((showRating && ratingValue) || showBookmark))
  );

  // Render swap components based on position
  const renderSwapComponents = () => {
    if (!showAnySwapComponents) return null;
    
    return (
      <div className={`w-full ${position === "top" ? "order-first" : "order-last"}`}>
        {showSwapComponent1 && swapComponent1 && (
          <div className="w-full">{swapComponent1}</div>
        )}
        {showSwapComponent2 && swapComponent2 && (
          <div className="w-full mt-2">{swapComponent2}</div>
        )}
        {showSwapComponent3 && swapComponent3 && (
          <div className="w-full mt-2">{swapComponent3}</div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`${width} relative ${cardBgColor} rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start transition-all duration-200 hover:shadow-lg ${onCardClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
      onClick={handleCardClick}
      role={cardRole || undefined}
      aria-label={cardAriaLabel || undefined}
    >
      {/* Render swap components if position is top */}
      {position === "top" && renderSwapComponents()}

      {/* Image Section */}
      {showImage && (
        <div className="self-stretch rounded-tl-xl rounded-tr-xl flex flex-col justify-start items-start h-[185.63px] overflow-hidden bg-gray-200 relative">
          <Image
            {...getImageProps()}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              // Fallback to a colored div if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Badge (positioned absolutely) */}
      {showBadge && badgeComponent && (
        <div className="absolute right-4 top-4 z-10">
          {badgeComponent}
        </div>
      )}

      {/* Content Section */}
      <div className="w-full p-4 flex flex-col gap-2">
        {/* Labels */}
        {(showLabel1 || showLabel2) && (
          <div className="flex flex-row gap-2">
            {showLabel1 && (
              <div className="flex flex-row items-center gap-1.5">
                {label1Icon || <DefaultLabelIcon />}
                <span className="text-sm text-zinc-800">{label1Text}</span>
              </div>
            )}
            {showLabel2 && (
              <div className="flex flex-row items-center gap-1.5">
                {label2Icon || <DefaultLabelIcon />}
                <span className="text-sm text-zinc-800">{label2Text}</span>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={`text-lg font-semibold text-zinc-800 ${titleClassName}`}>{title}</h3>

        {/* Description */}
        {showDescription && description && (
          <p className={`text-sm text-zinc-600 ${descriptionClassName}`}>{description}</p>
        )}

        {/* Render swap components if position is middle */}
        {position === "middle" && renderSwapComponents()}
      </div>

      {/* Footer Section */}
      {shouldShowFooter && (
        <div className="w-full px-4 pb-4 flex flex-row justify-between items-center">
          {showDuration && durationText && (
            <div className="flex flex-row items-center gap-1.5">
              {durationIcon || <DefaultClockIcon />}
              <span className="text-sm text-zinc-600">{durationText}</span>
            </div>
          )}
          {showRight && (
            <div className="flex flex-row items-center gap-3">
              {showRating && ratingValue && (
                <div className="flex flex-row items-center gap-1.5">
                  {ratingIcon || <DefaultStarIcon />}
                  <span className="text-sm text-zinc-600">{ratingValue}</span>
                </div>
              )}
              {showBookmark && (
                <button 
                  className="text-zinc-600 hover:text-zinc-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmarkClick();
                  }}
                >
                  <DefaultBookmarkIcon filled={isBookmarked} />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Render swap components if position is bottom */}
      {position === "bottom" && renderSwapComponents()}
    </div>
  );
};

export default Card6;

{/* <Card6 
            width="w-56"
            cardBgColor="bg-blue-500"
            showLabel1={false}
            showLabel2={false}
            showBadge={false}
            showDescription={false}
            showRating={false}
            showImage={false}
            showBookmark={false}
            showSwapComponent1={true}
            swapComponent1={<div className=" p-2  ">Tutor Name</div>}
            showSwapComponent2={false}
            showSwapComponent3={false}
            position="bottom"
          /> */}