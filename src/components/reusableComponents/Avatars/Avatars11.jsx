import React from 'react';
import PropTypes from 'prop-types';

const Avatars11 = ({
  size = 'XXL',
  variant = 'Image',
  imageUrl = 'https://placehold.co/64x64',
  letter = 'A',
}) => {
  // Size configurations
  const sizeConfig = {
    S: { width: '24px', height: '24px', fontSize: '12px', innerSize: '16px', offset: '4px' },
    M: { width: '32px', height: '32px', fontSize: '14px', innerSize: '20px', offset: '6px' },
    L: { width: '40px', height: '40px', fontSize: '16px', innerSize: '24px', offset: '8px' },
    XL: { width: '48px', height: '48px', fontSize: '18px', innerSize: '32px', offset: '8px' },
    XXL: { width: '64px', height: '64px', fontSize: '20px', innerSize: '40px', offset: '12px' },
  };

  const currentSize = sizeConfig[size] || sizeConfig.XXL;

  const renderContent = () => {
    switch (variant) {
      case 'Image':
        return (
          <div
            data-size={size}
            data-variant={variant}
            style={{
              borderRadius: '100px',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'inline-flex',
            }}
          >
            <div
              data-aspect-ratio="1:1"
              style={{
                width: currentSize.width,
                height: currentSize.height,
                borderRadius: '100px',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                display: 'flex',
              }}
            >
              <div style={{
                alignSelf: 'stretch',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }} />
            </div>
          </div>
        );

      case 'Name':
        return (
          <div
            data-size={size}
            data-variant={variant}
            style={{
              width: currentSize.width,
              height: currentSize.height,
              position: 'relative',
              background: '#E7F0FF',
              overflow: 'hidden',
              borderRadius: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: '#0364F3',
                fontSize: currentSize.fontSize,
                fontFamily: 'Arial',
                fontWeight: '700',
                textTransform: 'capitalize',
                lineHeight: currentSize.fontSize,
                textAlign: 'center',
              }}
            >
              {letter}
            </div>
          </div>
        );

      case 'Name-outline':
        return (
          <div
            data-size={size}
            data-variant={variant}
            style={{
              width: currentSize.width,
              height: currentSize.height,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '100px',
              outline: '1px #0364F3 solid',
              outlineOffset: '-1px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: '#0364F3',
                fontSize: currentSize.fontSize,
                fontFamily: 'Arial',
                fontWeight: '700',
                textTransform: 'capitalize',
                lineHeight: currentSize.fontSize,
                textAlign: 'center',
              }}
            >
              {letter}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

Avatars11.propTypes = {
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL', 'XXL']),
  variant: PropTypes.oneOf(['Image', 'Name', 'Name-outline']),
  imageUrl: PropTypes.string,
  letter: PropTypes.string,
};

export default Avatars11;
