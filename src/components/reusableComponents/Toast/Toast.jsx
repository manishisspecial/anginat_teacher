"use client";
/**
 * Toast notification component supporting four states and description toggle.
 *
 * @typedef {object} ToastProps
 * @property {'primary'|'error'|'warning'|'success'} state - The visual state of the toast.
 * @property {string} heading - The heading text.
 * @property {string} [description] - The optional description/message.
 * @property {boolean} showDescription - Whether to show the description.
 * @property {function} onClose - Callback when the close button is clicked.
 * @property {React.ReactNode} [icon] - Optional icon element.
 * @property {boolean} [hideIcon] - Hide the icon and left-align the heading/description if true.
 * @property {React.ReactNode} [closeButton] - Optional close button element.
 * @property {string|number} [width] - Custom width (e.g., 344, '100%', '20rem').
 * @property {string|number} [height] - Custom height (e.g., 80, 'auto', '6rem').
 * @property {string|number} [headingTextSize] - Custom heading font size.
 * @property {string|number} [descriptionTextSize] - Custom description font size.
 * @property {string} [textcolor] - Custom text color.
 *
 * @param {ToastProps} props
 * @returns {JSX.Element}
 */
const Toast = ({
  state = 'primary',
  heading,
  description,
  showDescription,
  onClose,
  icon,
  hideIcon = false,
  closeButton,
  width = 344,
  height = 'auto',
  headingTextSize = 14,
  descriptionTextSize = 14,
  textcolor
}) => {
  // Color map for states
  const stateStyles = {
    primary: {
      background: '#0364F3',
      color: textcolor || '#fff'
    },
    error: {
      background: '#D41313',
      color: textcolor || '#fff'
    },
    warning: {
      background: '#FF9900',
      color: textcolor || '#fff'
    },
    success: {
      background: '#197A00',
      color: textcolor || '#fff'
    }
  };

  // Helper to normalize px/number values
  const toCssSize = val => typeof val === 'number' ? `${val}px` : val;

  // Icon width for alignment
  const iconSpace = 32; // 24px icon + 8px margin

  return (
    <div className="flex flex-col justify-center "
      style={{
        width: toCssSize(width),
        height: toCssSize(height),
        borderRadius: 8,
        
       
        boxShadow: '0px 6px 24px rgba(21,21,21,0.15)',
        overflow: 'hidden',
        ...stateStyles[state]
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
        {/* Icon placeholder (conditionally rendered) */}
        {hideIcon ? null : (
          <div style={{
            width: 24,
            height: 24,
            marginRight: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
        )}
        {/* Heading */}
        <div style={{
          flex: 1,
          fontWeight: 700,
          fontSize: toCssSize(headingTextSize),
          lineHeight: '24px',
          textAlign: 'left',
          // If icon is hidden, remove left margin. If shown, nothing to do.
        }}>
          {heading}
        </div>
        {/* Close button placeholder */}
        <div style={{
          marginLeft: 8,
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onClose ? 'pointer' : 'default'
        }}
          onClick={onClose}
        >
          {closeButton}
        </div>
      </div>
      {/* Description */}
      {showDescription && description && (
        <div
          style={{
            padding: 12,
            fontWeight: 450,
            fontSize: toCssSize(descriptionTextSize),
            lineHeight: '24px',
            textAlign: 'left',
            paddingLeft: hideIcon ? 8 : iconSpace, // Align with heading
            paddingRight: 8,
            paddingTop: 0,
            paddingBottom: 12,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default Toast;
