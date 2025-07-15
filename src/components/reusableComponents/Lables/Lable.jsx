/**
 * Label component with support for leading/trailing icon and themes.
 *
 * @typedef {object} LabelProps
 * @property {'leading'|'trailing'|'text'} variant - Icon position or text only
 * @property {'black'|'error'|'warning'|'success'} theme - Color theme
 * @property {string} [text] - The label text (preferred)
 * @property {string} [children] - The label text (fallback)
 * @property {React.ReactNode} [icon] - Icon element (SVG, etc.)
 * @returns {JSX.Element}
 */
const themeStyles = {
  black:   { color: '#151515' },
  error:   { color: '#D41313' },
  warning: { color: '#A84C00' },
  success: { color: '#197A00' }
};

const Label = ({ variant = 'text', theme = 'black', text, children, icon ,textcolor }) => {
  const labelText = text || children;
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: variant === 'text' ? 4 : 2,
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 400,
    lineHeight: '24px',
            ...themeStyles[theme],
    color: textcolor || themeStyles[theme].color
  };

  if (variant === 'leading') {
    return (
      <div style={style}>
        {icon && (
          <span
            style={{
              minWidth: 20,
              minHeight: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </span>
        )}
        <span>{labelText}</span>
      </div>
    );
  }
  if (variant === 'trailing') {
    return (
      <div style={style}>
        <span>{labelText}</span>
        {icon && (
          <span
            style={{
              minWidth: 20,
              minHeight: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </span>
        )}
      </div>
    );
  }
  // text only
  return (
    <div style={style}>
      <span>{labelText}</span>
    </div>
  );
};

export default Label;
