import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
  href?: string;
  [key: string]: any;
};

const QButton: React.FC<ButtonProps> = ({
  text,
  className = '',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  as = 'button',
  href,
  ...rest
}) => {
  const Component = as === 'a' ? 'a' : 'button';

  const classes = clsx(
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl',
    'text-white font-semibold text-lg bg-accent',
    'hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]',
    'transition-all duration-300 ease-in-out',
    {
      'flex-row-reverse': iconPosition === 'right',
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    },
    className
  );

  return (
    <Component
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={as === 'button' ? disabled : undefined}
      href={as === 'a' ? href : undefined}
      rel={as === 'a' ? 'noopener noreferrer' : undefined}
      type={as === 'button' ? type : undefined}
      {...rest}
    >
      {icon && (
        <span className="transition-transform group-hover:translate-x-[2px] group-hover:scale-105">
          {icon}
        </span>
      )}
      {text}
    </Component>
  );
};

export default QButton;