import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...defaultProps }) => {
  return (
    <div className="w-full mb-2">
      <input
        className="w-full px-4 py-3 rounded-md ring-blue-500/75 focus:outline-0 focus:ring aria-[invalid=true]:ring aria-[invalid=true]:ring-red-500/75"
        type="text"
        {...defaultProps}
      />
    </div>
  );
};
