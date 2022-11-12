import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  handler: (state: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  handler,
  children,
  className,
  ...defaultProps
}) => {
  const handleToggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handler(false);
    }
  };

  return (
    <div
      className={twMerge(
        `fixed inset-0 backdrop-filter backdrop-blur-md bg-slate-700/10 transition-all flex items-center justify-center px-5 py-5 ${
          isOpen ? "scale-100 opacity-100 z-50" : "scale-75 opacity-0 -z-10"
        }`,
        className
      )}
      onClick={handleToggleModal}
      {...defaultProps}
    >
      {children}
    </div>
  );
};
