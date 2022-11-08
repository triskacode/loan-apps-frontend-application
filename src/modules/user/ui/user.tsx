import React, { useEffect } from "react";
import { Table } from "src/common/ui/table";
import { useAllUser } from "../use-case/use-all-user";
import { Container } from "./partials/container";
import { DropdownAction } from "./partials/dropdown-action";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const { data } = useAllUser();

  return (
    <Container>
      <div>
        <div className="py-5">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-medium">Users</h1>
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-3" />
        </div>
        <Table>
          <thead>
            <tr>
              <th className="w-[50px] text-center">#</th>
              <th className="w-[350px]">email</th>
              <th className="w-[100px]">role</th>
              <th className="w-[100px]">state</th>
              <th className="w-[100px]">action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.length > 0 ? (
              data.data.map((user, i) => (
                <tr key={i}>
                  <td className="text-center">{++i}</td>
                  <td>{user.email}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="text-center">{user.state}</td>
                  <td className="text-center">
                    <DropdownAction />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center col-span-5 text-slate-400">
                  User empty
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
