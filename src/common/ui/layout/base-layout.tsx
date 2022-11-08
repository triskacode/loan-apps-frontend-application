import React from "react";
import { twMerge } from "tailwind-merge";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "w-full min-h-screen bg-slate-50 overflow-x-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};
