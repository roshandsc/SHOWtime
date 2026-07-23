import React, { useState } from 'react';

export const Input = ({
  label,
  type = 'text',
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <div className="input-wrap" style={{ position: 'relative' }}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={id}
          type={inputType}
          className={`form-input ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {error && <span className="error-text" style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
    </div>
  );
};

export default Input;
