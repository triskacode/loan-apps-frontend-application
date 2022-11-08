import React from "react";
import { twMerge } from "tailwind-merge";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Alert: React.FC<AlertProps> = ({
  children,
  className,
  ...defaultProps
}) => {
  return (
    <div
      className={twMerge(
        "px-4 py-3 rounded-md shadow font-light border border-red-500/50 bg-red-100 text-red-700 mb-5",
        className
      )}
      {...defaultProps}
    >
      {children}
    </div>
  );
};
