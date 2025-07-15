import React from 'react';

/**
 * Badge Component - A reusable badge supporting solid, light, and outline styles, sizes, and icon variants.
 *
 * @param {Object} props
 * @param {'Compact' | 'Default'} [props.size='Compact'] - Size variant of the badge
 * @param {'Primary' | 'Error' | 'Success' | 'Warning'} [props.themes='Primary'] - Theme of the badge
 * @param {'Solid' | 'Light' | 'Outline'} [props.type='Solid'] - Type of badge style
 * @param {'Default' | 'Leading Icon' | 'Trailing Icon'} [props.variant='Default'] - Badge variant
 * @param {string} [props.text='badge'] - Text to display in the badge
 */
const Badge = ({
  size = 'Compact',
  themes = 'Primary',
  type = 'Solid',
  variant = 'Default',
  text = 'badge',
}) => {
  // Theme-specific colors
  const themeColors = {
    Primary: {
      solidBg: '#0364F3',
      solidText: '#FFFFFF',
      lightBg: '#E7F0FF',
      lightText: '#0364F3',
      outline: '#0364F3',
    },
    Error: {
      solidBg: '#DC2626',
      solidText: '#FFFFFF',
      lightBg: '#FEE2E2',
      lightText: '#DC2626',
      outline: '#DC2626',
    },
    Success: {
      solidBg: '#16A34A',
      solidText: '#FFFFFF',
      lightBg: '#DCFCE7',
      lightText: '#16A34A',
      outline: '#16A34A',
    },
    Warning: {
      solidBg: '#CA8A04',
      solidText: '#FFFFFF',
      lightBg: '#FEF3C7',
      lightText: '#CA8A04',
      outline: '#CA8A04',
    },
  };

  const currentTheme = themeColors[themes] || themeColors.Primary;

  // Size-specific styles
  const sizeStyles = {
    Compact: {
      padding:'2px 8px 2px 8px' ,
      fontSize: '10px',
      borderRadius: '4px',
      iconSize: 16,
      gap: 8,
      containerGap: 10,
      height: 20,
    },
    Default: {
      padding: '4px 12px 4px 12px',
      fontSize: '10px',
      borderRadius: '4px',
      iconSize: 16,
      gap: 8,
      containerGap: 10,
      height: 24,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.Compact;

  // Icon placeholder component
  const IconPlaceholder = () => (
    <div style={{ width: currentSize.iconSize, height: currentSize.iconSize, position: 'relative' }}>
      <div style={{ width: currentSize.iconSize, height: currentSize.iconSize, left: 0, top: 0, position: 'absolute', overflow: 'hidden' }}>
        <div style={{ width: 12, height: 10.67, left: 2, top: 2.67, position: 'absolute', background: type === 'Solid' ? currentTheme.solidText : currentTheme.outline }}></div>
      </div>
    </div>
  );

  // Determine background, text, and outline colors
  let background, color, outline;
  if (type === 'Solid') {
    background = currentTheme.solidBg;
    color = currentTheme.solidText;
    outline = 'none';
  } else if (type === 'Light') {
    background = currentTheme.lightBg;
    color = currentTheme.lightText;
    outline = 'none';
  } else if (type === 'Outline') {
    background = '#FFFFFF';
    color = currentTheme.outline;
    outline = `1px solid ${currentTheme.outline}`;
  }

  // Flex direction and gap for icon variants
  const flexDirection = 'row';
  const gap = variant === 'Default' ? currentSize.containerGap : currentSize.gap;

  return (
    <div
      data-size={size}
      data-themes={themes}
      data-type={type}
      data-variant={variant}
      style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <div
        data-type={size}
        data-variant={variant}
        style={{
          padding: currentSize.padding,
          background,
          borderRadius: currentSize.borderRadius,
          outline,
          outlineOffset: outline === 'none' ? undefined : '-1px',
          justifyContent: 'center',
          alignItems: 'center',
          gap,
          display: 'flex',
          flexDirection,
          minHeight: currentSize.height,
        }}
      >
        {/* Leading Icon */}
        {variant === 'Leading Icon' && <IconPlaceholder />}

        {/* Text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color,
            fontSize: currentSize.fontSize,
            fontFamily: 'Arial',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            height: '100%',
            width: '100%',
          }}
        >
          {text}
        </div>

        {/* Trailing Icon */}
        {variant === 'Trailing Icon' && <IconPlaceholder />}
      </div>
    </div>
  );
};

export default Badge; 