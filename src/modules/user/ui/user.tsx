import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { HttpErrorResponse, UserState } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { Table } from "src/common/ui/table";
import { useAllUser } from "../use-case/use-all-user";
import { Container } from "./partials/container";
import { DropdownAction } from "./partials/dropdown-action";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const { data, ...requestState } = useAllUser();

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (+err.code < 500 && err.errors) {
      if (typeof err.errors === "object") setErrors(Object.values(err.errors));
      else setErrors([err.errors]);
    } else if (+err.code < 500 && err.message) {
      setErrors([err.message]);
    } else {
      setErrors(["Whooops! Something went wrong"]);
    }
  }, []);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (requestState.isError) handleError(requestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

  return (
    <Container>
      <div>
        <div className="py-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-medium">All users</h1>
            </div>
            <div>
              <Link href="/dashboard/users/create">
                <Button className="py-1 px-3 border-green-600/50 bg-green-500 text-white hover:bg-green-600">
                  Create new
                </Button>
              </Link>
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-3" />
        </div>
        {errors && (
          <Alert>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}
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
            {data && data.length > 0 ? (
              data.map((user, i) => (
                <tr key={i}>
                  <td className="text-center">{++i}</td>
                  <td>{user.email}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="text-center">{user.state}</td>
                  <td className="text-center">
                    <DropdownAction
                      userId={user.id}
                      deleted={user.state === UserState.DELETED}
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
      </div>
    </Container>
  );
};
