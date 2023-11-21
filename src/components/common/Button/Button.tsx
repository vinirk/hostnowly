import React, { ButtonHTMLAttributes, FC } from "react";
import { Link } from "react-router-dom";

export interface ButtonProps {
  className?: string;
  sizeClass?: string;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: string;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  className = "text-neutral-700 dark:text-neutral-200",
  sizeClass = "px-4 py-3 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  onClick = () => {},
}) => {
  const classes = `relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${className}`;

  return href ? (
    <Link
      to={href}
      target={targetBlank ? "_blank" : undefined}
      className={classes}
      onClick={onClick}
      rel="noopener noreferrer"
    >
      {children || `This is Link`}
    </Link>
  ) : (
    <button
      disabled={disabled}
      className={classes}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
