import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full font-medium text-xs sm:text-sm transition border";

  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800 border-transparent"
      : variant === "secondary"
      ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent"
      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 font-bold"; 

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}
