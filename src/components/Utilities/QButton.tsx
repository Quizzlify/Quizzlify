import React, { MouseEventHandler, forwardRef } from 'react';
import clsx from 'clsx';

type VariantType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  text?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: VariantType;
  size?: SizeType;
  fullWidth?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
}

interface ButtonElementProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: never;
}

interface AnchorElementProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'size'> {
  as: 'a';
  href: string;
  type?: never;
}

type ButtonProps = ButtonElementProps | AnchorElementProps;

const QButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  text,
  className = '',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  rounded = false,
  type = 'button',
  as = 'button',
  href,
  children,
  ...rest
}, ref) => {
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent/90 active:bg-accent/80',
    secondary: 'bg-gray-200 text-gray-800 bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-accent text-accent hover:bg-accent/10',
    ghost: 'text-accent hover:bg-accent/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
  };

  const sizeClasses = {
    xs: 'text-xs px-2 py-1 gap-1',
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-5 py-2.5 gap-2.5',
    xl: 'text-xl px-6 py-3 gap-3',
  };

  const interactionClasses =
    disabled && 'opacity-60 cursor-not-allowed';

  const classes = clsx(
    'relative inline-flex items-center justify-center font-medium transition-all duration-150 ease-in-out',
    variantClasses[variant],
    sizeClasses[size],
    rounded ? 'rounded-full' : 'rounded-xl',
    fullWidth && 'w-full',
    interactionClasses,
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50',
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children || text}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  if (as === 'a') {
    return (
      <a
        className={clsx(classes, 'group')}
        href={disabled ? undefined : href}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={clsx(classes, 'group')}
      disabled={disabled}
      type={type}
      onClick={disabled ? undefined : (onClick as React.MouseEventHandler<HTMLButtonElement>)}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});

QButton.displayName = 'QButton';
export default QButton;
