import React from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...defaultProps
}) => {
  return (
    <div className="w-full rounded-md overflow-x-auto overflow-y-hidden border border-slate-400/50">
      <table
        className={twMerge(
          "w-full table-fixed border-collapse overflow-x-auto [&>thead]:bg-blue-100/50 [&>thead]:border-b [&>thead]:border-slate-400/50 [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 [&>tbody]:divide-y [&>tbody]:divide-slate-400/50 [&>tbody>tr]:transition-all [&>tbody>tr]:ease-in-out hover:[&>tbody>tr]:bg-blue-100/50 [&_td]:px-3 [&_td]:py-1",
          className
        )}
        {...defaultProps}
      >
        {children}
      </table>
    </div>
  );
};
