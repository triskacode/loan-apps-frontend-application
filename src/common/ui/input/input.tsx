import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...defaultProps }) => {
  return (
    <div className="w-full mb-2">
      <input
        className={twMerge(
          "w-full px-4 py-3 rounded-md border border-slate-400/50 bg-slate-50 text-slate-600 focus-within:outline-0 focus-within:ring focus-within:ring-blue-500/50 focus-within:bg-white focus-within:border-blue-500 transition-all ease-in",
          className
        )}
        type="text"
        {...defaultProps}
      />
    </div>
  );
};
