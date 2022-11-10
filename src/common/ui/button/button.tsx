import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...defaultProps
}) => {
  return (
    <button
      className={twMerge(
        "w-full text-center px-4 py-3 rounded-md border border-slate-400/50 bg-slate-50 text-slate-600 shadow-sm hover:bg-slate-200 focus:outline-0 disabled:bg-slate-200/50 transition-all ease-in",
        className
      )}
      type="button"
      {...defaultProps}
    >
      {children}
    </button>
  );
};
