import Link from "next/link";
import React from "react";
import { IoMdPower } from "react-icons/io";
import { useLogout } from "src/modules/auth/use-case/use-logout";
import { Button } from "../button";
import { Copyright } from "../copyright";
import { BaseLayout } from "./base-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { doLogout } = useLogout();

  return (
    <BaseLayout>
      <header className="w-full h-[64px] flex items-center justify-between px-4 py-3 border-b border-slate-400/50 shadow-sm">
        <div className="flex items-center gap-x-10">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Pinjaman
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-x-5 mt-1">
            <Link
              href="/dashboard"
              className="hover:text-indigo-500 transition-all ease-in-out"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/users"
              className="hover:text-indigo-500 transition-all ease-in-out"
            >
              Users
            </Link>
          </nav>
        </div>
        <div>
          <Button className="py-2" onClick={doLogout}>
            <IoMdPower className="inline text-xl md:mr-3" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </header>
      <main className="w-full max-w-[1020px] p-5 mx-auto">{children}</main>
      <footer className="w-full px-5 pt-10">
        <Copyright />
      </footer>
    </BaseLayout>
  );
};
