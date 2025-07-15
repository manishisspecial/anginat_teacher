/**
 * ListItem component with optional avatar and button, styled to match the provided design.
 *
 * @typedef {object} ListItemProps
 * @property {string} label - The small label above the title.
 * @property {string} title - The main title text.
 * @property {string} description - The supporting description text.
 * @property {React.ReactNode} [avatar] - The avatar component (optional).
 * @property {React.ReactNode} [button] - The button component (optional).
 * @property {boolean} [showAvatar] - Whether to show the avatar.
 * @property {boolean} [showButton] - Whether to show the button.
 * @returns {JSX.Element}
 */
import React from 'react';

const ListItem = ({
  label,
  title,
  description,
  avatar,
  button,
  showAvatar = true,
  showButton = true,
}) => (
  <div style={{
    alignSelf: 'stretch',
    padding: '12px 16px',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 0 0 2px #E7E7F0',
    width: 360
  }}>
    {showAvatar && (
      <div style={{
        width: 48,
        height: 48,
        position: 'relative',
        background: '#E7F0FF',
        overflow: 'hidden',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {avatar}
      </div>
    )}
    <div style={{
      flex: 1,
      overflow: 'hidden',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 2
    }}>
      <div style={{
        color: '#49454F',
        fontSize: 12,
        fontFamily: 'Arial',
        fontWeight: 400,
        lineHeight: '18px'
      }}>{label}</div>
      <div style={{
        color: '#151515',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 700,
        lineHeight: '24px'
      }}>{title}</div>
      <div style={{
        color: '#2E2E2E',
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 400,
        lineHeight: '24px'
      }}>{description}</div>
    </div>
    {showButton && (
      <div style={{
        alignSelf: 'stretch',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
      }}>
        {button}
      </div>
    )}
  </div>
);

export default ListItem;
