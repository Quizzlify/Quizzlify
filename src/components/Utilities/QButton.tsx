import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';

interface BaseButtonProps {
  text?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface ButtonElementProps extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: never;
}

interface AnchorElementProps extends BaseButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a';
  href: string;
  type?: never;
}

type ButtonProps = ButtonElementProps | AnchorElementProps;

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

  if (as === 'a') {
    return (
      <a
        className={classes}
        href={href}
        rel="noopener noreferrer"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && (
          <span className="transition-transform group-hover:translate-x-[2px] group-hover:scale-105">
            {icon}
          </span>
        )}
        {text}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={disabled ? undefined : (as === 'button' ? (onClick as MouseEventHandler<HTMLButtonElement>) : undefined)}
      disabled={disabled}
      type={type}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && (
        <span className="transition-transform group-hover:translate-x-[2px] group-hover:scale-105">
          {icon}
        </span>
      )}
      {text}
    </button>
  );
};

export default QButton;