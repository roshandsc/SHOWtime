import React from 'react';

export const Dropdown = ({ options = [], value, onChange, placeholder = 'Select option', className = '' }) => {
  return (
    <select
      className={`form-select ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: 'var(--color-card)',
        color: '#fff',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 14px',
        fontSize: '0.88rem',
        cursor: 'pointer',
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
