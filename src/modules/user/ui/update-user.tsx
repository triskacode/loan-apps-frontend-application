import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import { HttpErrorResponse, UserRole } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { Input } from "src/common/ui/input";
import { Select } from "src/common/ui/select";
import { UpdateUserDto } from "../dto/update-user.dto";
import { useUpdateUser } from "../use-case/use-update-user";
import { useUserById } from "../use-case/use-user-by-id";
import { Container } from "./partials/container";

interface UpdateUserProps {}

export const UpdateUser: React.FC<UpdateUserProps> = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: user, ...userByIdRequestState } = useUserById(+id);
  const { doUpdateUser, requestState: updateUserRequestState } = useUpdateUser(
    +id
  );

  const initialDto: UpdateUserDto = useMemo(
    () => ({
      email: user?.email,
      password: "",
      role: user?.role,
    }),
    [user?.email, user?.role]
  );
  const [dto, setDto] = useState<UpdateUserDto>(initialDto);

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = ev.target.name;
      const value = ev.target.value;

      setDto((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();

      doUpdateUser(dto);
    },
    [doUpdateUser, dto]
  );

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

  const handleSuccess = useCallback(() => {
    toast("Good, user has been updated", {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
  }, []);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (updateUserRequestState.isError)
      handleError(updateUserRequestState.error);
    else if (updateUserRequestState.isSuccess) handleSuccess();
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserRequestState.status]);

  useEffect(() => {
    setDto(initialDto);
  }, [initialDto]);

  return (
    <Container>
      <div>
        <div className="py-4">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <Link href="/dashboard/users">
                <Button className="py-2 px-2 border-none rounded-full shadow-none">
                  <BsArrowLeft className="text-2xl" />
                </Button>
              </Link>
              <h1 className="text-2xl font-medium">Update users</h1>
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-2" />
        </div>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {errors && (
            <Alert>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          <div className="w-full flex flex-col gap-y-1">
            <div>
              <label className="block mb-1 font-medium" htmlFor="input-email">
                Email
              </label>
              <Input
                className="py-2"
                id="input-email"
                name="email"
                placeholder="john@gmail.com"
                autoComplete="email"
                value={dto.email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium"
                htmlFor="input-password"
              >
                Password
              </label>
              <Input
                className="py-2"
                id="input-password"
                type="password"
                name="password"
                placeholder="***"
                autoComplete="new-password"
                value={dto.password}
                onChange={handleChangeInput}
              />
            </div>
            <div className="w-auto">
              <label className="block mb-1 font-medium" htmlFor="input-role">
                Role
              </label>
              <Select
                className="w-1/3 min-w-[150px] py-2"
                id="input-role"
                name="role"
                value={dto.role}
                onChange={handleChangeInput}
              >
                {Object.values(UserRole).map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-auto mt-5">
            <Button
              className="w-auto py-2 bg-blue-500 text-slate-50 hover:bg-blue-600 disabled:bg-blue-600/50"
              type="submit"
              disabled={updateUserRequestState.isLoading}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
