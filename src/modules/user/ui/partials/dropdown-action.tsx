import React from "react";
import { Dropdown } from "src/common/ui/dropdown";

interface DropdownActionProps {}

export const DropdownAction: React.FC<DropdownActionProps> = () => {
  return (
    <Dropdown name="action" position="br">
      <div className="px-4 py-2 rounded-md border border-slate-400/50 bg-slate-50">
        Action Dropdown
      </div>
    </Dropdown>
  );
};
