import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({
  children,
  className,
  ...defaultProps
}) => {
  return (
    <div className="relative mb-2 w-fit flex items-center">
      <select
        className={twMerge(
          "w-full px-4 py-3 rounded-md border border-slate-400/50 bg-slate-50 text-slate-600 focus-within:outline-0 focus-within:ring focus-within:ring-blue-500/50 focus-within:bg-white focus-within:border-blue-500 transition-all ease-in appearance-none",
          className
        )}
        {...defaultProps}
      >
        {children}
      </select>
      <span className="absolute block right-0 pr-3 pointer-events-none">
        <HiOutlineChevronDown />
      </span>
    </div>
  );
};
