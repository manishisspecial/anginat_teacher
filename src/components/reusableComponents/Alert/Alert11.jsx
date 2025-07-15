'use client';

import React from 'react';

/**
 * Alert11 component for displaying a message with an icon and an action (button or close icon).
 *
 * @param {Object} props
 * @param {'warning'|'error'|'success'} props.state - The alert state (color)
 * @param {'solid'|'light'} props.theme - The background theme
 * @param {React.ReactNode} props.icon - The icon to display (e.g. <WarningIcon />)
 * @param {string} props.message - The alert message text
 * @param {React.ReactNode} [props.action] - The action to display (e.g. <Button>Button</Button> or <CloseIcon />)
 * @param {string} [props.textColor] - Custom text color for light theme
 * @returns {JSX.Element}
 */
const Alert11 = ({
  state = 'warning',
  theme = 'light',
  icon,
  message,
  text,
  action,
  textColor,
}) => {
  const labelText = text || message;

  // Color palette
  const palette = {
    warning: {
      solid: { bg: '#FA8C16', color: '#151515', icon: '#A84C00', actionBg: '#fff' },
      light: { bg: '#FDEFE0', color: textColor || '#151515', icon: '#A84C00', actionBg: '#FA8C16' },
    },
    error: {
      solid: { bg: '#D32F2F', color: '#fff', icon: '#fff', actionBg: '#fff' },
      light: { bg: '#FDEFE0', color: textColor || '#D32F2F', icon: '#D32F2F', actionBg: '#D32F2F' },
    },
    success: {
      solid: { bg: 'green', color: '#fff', icon: '#fff', actionBg: '#fff' },
      light: { bg: '#E6F4EA', color: textColor || '#388E3C', icon: '#388E3C', actionBg: '#388E3C' },
    },
  };

  const style = palette[state][theme];

  // Layout: gap and width based on action type
  const isButton = action && action.type && action.type.name === 'Button';
  const containerGap = isButton ? 21 : 96;
  const containerWidth = isButton ? 352 : 360;
  const containerPadding = isButton ? '8px 16px' : '10px 16px';

  const getCloseButtonColor = (state, theme) => {
    if (theme === 'solid') {
      if (state === 'warning') return 'black';
      if (state === 'error' || state === 'success') return 'white';
    }
    // Default color for other cases
    return 'black';
  };

  return (
    <div
      style={{ 
        width: containerWidth,
        padding: containerPadding,
        background: style.bg,
        borderRadius: 8,
        display: 'inline-flex',
        alignItems: 'center',
        gap: containerGap,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 24,
          width: 24,
          minWidth: 24,
          minHeight: 24,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Icon container: import your icon here */}
          {icon}
        </span>
        <span
          style={{
            width: isButton ? 193 : 176,
            color: style.color,
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 400,
            lineHeight: '24px',
            wordWrap: 'break-word',
            verticalAlign: 'middle',
            display: 'flex',
            alignItems: 'center',
            height: 24
          }}
        >
          {message}
        </span>
      </div>
      {action && (
        <span
          style={
            isButton
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                 
                 
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: 'Arial',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: theme === 'light' ? '#fff' : style.bg,
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: 0,
                }
              : {
                  width: 24,
                  height: 24,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '10px 16px',
                }
          }
        >
          {/* Action container: import your button or close icon here */}
          {action}
        </span>
      )}
    </div>
  );
};

export default Alert11;
