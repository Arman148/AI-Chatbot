import React, { ReactNode } from "react";
import "./style.css";

type ButtonVariant =
  | "primary"
  | "glass"
  | "auth-glass"
  | "sidebar-topic"
  | "sidebar-subtopic"
  | "test-button"
  | "test-button-active";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`app-button btn-${variant} ${className}`}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
