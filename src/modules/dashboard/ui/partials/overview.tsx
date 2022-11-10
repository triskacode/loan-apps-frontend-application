import React from "react";
import { MdBarChart } from "react-icons/md";
import { BiMoney } from "react-icons/bi";

interface OverviewProps {}

export const Overview: React.FC<OverviewProps> = () => {
  return (
    <div className="py-4 mb-8">
      <div className="">
        <div className="flex gap-x-2 items-center">
          <div className="py-1.5 px-1.5 border-none rounded-full shadow-none bg-slate-200/50 mr-2">
            <MdBarChart className="text-2xl" />
          </div>
          <h1 className="text-xl">Overview</h1>
        </div>
        <hr className="w-full border-slate-400/50 mt-3" />
      </div>
      <div className="grid grid-cols-4 gap-x-5 mt-5">
        <div className="col-span-2 flex flex-col items-center rounded-md border boorder-slate-400/50 px-5 py-8">
          <div className="">
            <h1 className="text-2xl font-semibold">10</h1>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <span className="block w-3 h-3 bg-green-500 rounded-full mt-0.5" />
            <h2>Active Users</h2>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center rounded-md border boorder-slate-400/50 px-5 py-8">
          <div className="">
            <h1 className="text-2xl font-semibold">Rp 10.000</h1>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <BiMoney className="text-lg mt-0.5" />
            <h2>Loans Balance</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
