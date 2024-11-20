// Input.js
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = forwardRef(({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder,
  helperText,
  className,
  ...props
}, ref) => {
  const inputId = `input-${name}`;
  const isError = Boolean(error);
  
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`input-field ${isError ? 'input-error' : ''} ${className || ''}`}
        aria-invalid={isError}
        aria-describedby={`${inputId}-helper ${inputId}-error`}
        {...props}
      />
      
      {helperText && (
        <span id={`${inputId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
      
      {error && (
        <span id={`${inputId}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
});

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;