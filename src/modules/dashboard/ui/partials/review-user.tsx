import React from "react";
import { Table } from "src/common/ui/table";
import { User } from "src/domain/user";
import { DropdownAction } from "src/modules/user/ui/partials/dropdown-action";

interface ReviewUserProps {
  users?: User[];
}

export const ReviewUser: React.FC<ReviewUserProps> = ({ users }) => {
  return (
    <Table className="[&_th]:py-2">
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
        {users && users.length > 0 ? (
          users.map((user, i) => (
            <tr key={i}>
              <td className="text-center">{++i}</td>
              <td>{user.email}</td>
              <td className="text-center">{user.role}</td>
              <td className="text-center">{user.state}</td>
              <td className="text-center">
                <DropdownAction
                  userId={user.id}
                  menu={["activate", "force-delete"]}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center text-slate-500">
              User empty
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
