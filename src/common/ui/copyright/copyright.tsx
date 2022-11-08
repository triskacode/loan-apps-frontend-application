import React from "react";
import { FaHeart } from "react-icons/fa";

interface CopyrightProps {}

export const Copyright: React.FC<CopyrightProps> = () => {
  return (
    <div className="text-center text-slate-400">
      <p className="my-2 text-sm md:text-base">
        <span>Made with</span>
        <FaHeart className="text-red-500 inline-block -mt-0.5 mx-1.5" />
        <span>by</span>
        <a href="#" className="ml-1">
          Triska.
        </a>
      </p>
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()} Triskacode. All Rights Reserved.
      </p>
    </div>
  );
};
