import React, { ReactNode } from "react";
import "./style.css";

type ButtonVariant = "primary" | "glass";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`app-button btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
