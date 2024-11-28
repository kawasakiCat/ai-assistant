// Button.js
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  variant = 'primary',
  size = 'normal',
  disabled = false,
  type = 'button',
  children,
  className,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  // リップルを追加する関数
  const addRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = event.clientX - rect.left - (size / 2);
    const y = event.clientY - rect.top - (size / 2);

    const ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);
  }, []);

  // リップルを削除する関数
  const removeRipple = useCallback((id) => {
    setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
  }, []);

  // クリックイベントハンドラー
  const handleClick = useCallback((event) => {
    if (!disabled) {
      addRipple(event);
      onClick?.(event);
    }
  }, [disabled, onClick, addRipple]);

  // リップルのクリーンアップ
  useEffect(() => {
    const timeouts = ripples.map((ripple) =>
      setTimeout(() => removeRipple(ripple.id), 1000)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [ripples, removeRipple]);

  const buttonClasses = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    disabled ? 'button-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="button-content">{children}</span>
      {ripples.map(({ x, y, size, id }) => (
        <span
          key={id}
          className={`ripple ripple-${variant}`}
          style={{
            left: x + 'px',
            top: y + 'px',
            width: size + 'px',
            height: size + 'px',
          }}
        />
      ))}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'normal']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;