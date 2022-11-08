import React from "react";
import { Table } from "src/common/ui/table";
import { Container } from "./partials/container";
import { DropdownAction } from "./partials/dropdown-action";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
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
            <tr>
              <td className="text-center">1</td>
              <td>triska@mail.com</td>
              <td className="text-center">manager</td>
              <td className="text-center">active</td>
              <td className="text-center">
                <DropdownAction />
              </td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td>triska@mail.com</td>
              <td className="text-center">manager</td>
              <td className="text-center">active</td>
              <td className="text-center">
                <DropdownAction />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
