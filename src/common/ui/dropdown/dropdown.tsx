import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { Button } from "../button";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  position: "tl" | "tr" | "bl" | "br";
}

export const Dropdown: React.FC<DropdownProps> = ({
  name,
  position,
  children,
  ...defaultProps
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const setDropdownPosition = useCallback(() => {
    if (buttonRef.current && dropdownRef.current) {
      const bcr = buttonRef.current.getBoundingClientRect();
      const width = dropdownRef.current.clientWidth;

      let top: number;
      let left: number;
      let origin: string;

      switch (position) {
        case "bl":
          left = bcr.left;
          top = bcr.bottom;
          origin = "top left";
          break;
        case "br":
          left = bcr.right - width;
          top = bcr.bottom;
          origin = "top right";
          break;
        case "tl":
          left = bcr.left;
          top = bcr.top;
          origin = "bottom left";
          break;
        case "tr":
          left = bcr.right - width;
          top = bcr.top;
          origin = "bottom right";
          break;
      }

      dropdownRef.current.style.top = top + "px";
      dropdownRef.current.style.left = left + "px";
      dropdownRef.current.style.transformOrigin = origin;
    }
  }, [position]);

  const handleToggleDropdown = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      setDropdownPosition();
      setShowDropdown((prev) => !prev);
    },
    [setDropdownPosition]
  );

  const handleCloseDropdown = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      setShowDropdown(false);
    },
    []
  );

  useEffect(() => {
    setDropdownPosition();

    if (window !== undefined) {
      window.addEventListener("scroll", setDropdownPosition);

      return () => {
        window.removeEventListener("scroll", setDropdownPosition);
      };
    }
  });

  return (
    <div {...defaultProps}>
      <div
        className={`fixed ${showDropdown ? "inset-0" : ""}`}
        onClick={handleCloseDropdown}
      />

      <div ref={buttonRef} className="w-auto">
        <Button itemRef="" className="py-0.5" onClick={handleToggleDropdown}>
          {name}
        </Button>
      </div>
      <div
        ref={dropdownRef}
        className={`fixed z-20 transition-all transform origin-bottom-left ${
          position === "tl" || position === "tr" ? "mb-1" : "mt-1"
        } ${showDropdown ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};
