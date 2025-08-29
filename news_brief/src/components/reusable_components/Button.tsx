"use client";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => {
  const baseClasses = "font-medium transition-colors duration-200";

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-black text-white hover:bg-white hover:text-black border border-black";
      break;
    case "secondary":
      variantClasses = "bg-white text-black border border-black hover:bg-black hover:text-white";
      break;
    case "tertiary":
      variantClasses = "bg-gray-200 text-black hover:bg-gray-300";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
