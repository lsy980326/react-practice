import './TextField.css';
import { FaUser, FaLock } from 'react-icons/fa';

export default function TextField({
  label = '',
  required = false,
  icon,
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  id = '',
  className = '',
  ...rest
}: {
  label?: string;
  required?: boolean;
  icon?: JSX.Element; // 아이콘 컴포넌트
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  id?: string; // 입력 필드와 라벨 연결을 위한 ID
  className?: string;
  [key: string]: any;
}) {
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const inputElement = e.currentTarget.querySelector('input');
    if (inputElement) {
      (inputElement as HTMLInputElement).focus();
    }
  };

  return (
    <div className={`text-field-container ${className}`}>
      {label && (
        <label className="text-field-label" htmlFor={id}>
          {label}
          {required && <span className="text-field-required">*</span>}
        </label>
      )}
      <div className="text-field-input-wrapper" onClick={handleWrapperClick}>
        {icon && <span className="text-field-icon">{icon}</span>}
        <input
          id={id}
          className="text-field-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...rest}
        />
      </div>
    </div>
  );
}
