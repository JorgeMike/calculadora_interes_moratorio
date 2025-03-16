import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  outline?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "dark"
    | "dorado"
    | "azul"
    | "light"
    | "link";
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  className?: {
    button?: string;
    icon?: string;
  };
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "sm" | "lg";
  style?: React.CSSProperties;
}

const Button = ({
  children,
  type = "button",
  icon,
  className,
  variant = "primary",
  outline = false,
  disabled = false,
  onClick,
  size,
  style,
}: ButtonProps) => {
  const btnVariant = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  return (
    <button
      style={{
        ...style,
      }}
      type={type}
      className={`
                btn 
                ${btnVariant}
                ${size ? `btn-${size}` : ""}
                ${className?.button}
                `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <i className={`me-2 bi bi-${icon} ${className?.icon}`}></i>}
      {children}
    </button>
  );
};

export default Button;
