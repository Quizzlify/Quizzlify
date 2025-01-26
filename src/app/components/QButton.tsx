import React from 'react';

type ButtonProps = {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: never;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  [key: string]: any;
}

const QButton: React.FC<ButtonProps> = ({ text, className = '', icon, iconPosition, ...rest }) => {
  let baseClasses = 'group text-white px-[16px] py-[12px] text-center justify-center bg-accent rounded-[12px] text-[20px] font-semibold transition-all duration-300 cursor-pointer';

  if (rest.disabled) {
    baseClasses += ' cursor-not-allowed opacity-50';
  }

  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <a className={`${combinedClasses}`} rel="noopener noreferrer" {...rest}>
      {icon && iconPosition === 'left' && (
        <span className={`icon-left ${text && 'mr-[9px]'} group-hover:mr-[14px] transition-all duration-300`}>
          {icon}
        </span>
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span className={`icon-right ${text && 'ml-[9px]'} group-hover:ml-[14px] transition-all duration-300`}>
          {icon}
        </span>
      )}
    </a>
  );
};

export default QButton;