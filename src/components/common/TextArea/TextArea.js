import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

const TextArea = forwardRef(({
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
  rows = 4,
  ...props
}, ref) => {
  const textareaId = `textarea-${name}`;
  const isError = Boolean(error);
  
  return (
    <div className="textarea-wrapper">
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={`textarea-field ${isError ? 'textarea-error' : ''} ${className || ''}`}
        aria-invalid={isError}
        aria-describedby={`${textareaId}-helper ${textareaId}-error`}
        {...props}
      />
      
      {helperText && (
        <span id={`${textareaId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
      
      {error && (
        <span id={`${textareaId}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
});

TextArea.propTypes = {
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
  rows: PropTypes.number,
};

TextArea.displayName = 'TextArea';

export default TextArea;