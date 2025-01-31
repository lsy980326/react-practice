// Button.tsx

import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

export default function Button({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`custom-button ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}
