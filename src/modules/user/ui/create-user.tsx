import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import { UserRole, HttpErrorResponse } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { Input } from "src/common/ui/input";
import { Select } from "src/common/ui/select";
import { CreateUserDto } from "../dto/create-user.dto";
import { useCreateUser } from "../use-case/use-create-user";
import { Container } from "./partials/container";

interface CreateUserProps {}

export const CreateUser: React.FC<CreateUserProps> = () => {
  const { doCreateUser, requestState } = useCreateUser();

  const initialDto: CreateUserDto = useMemo(
    () => ({
      email: "",
      password: "",
      role: UserRole.USER,
    }),
    []
  );
  const [dto, setDto] = useState<CreateUserDto>(initialDto);

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

      doCreateUser(dto);
    },
    [doCreateUser, dto]
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
    setDto(initialDto);

    toast("Good, user has been created", {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
  }, [initialDto]);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (requestState.isError) handleError(requestState.error);
    else if (requestState.isSuccess) handleSuccess();
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

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
              <h1 className="text-2xl font-medium">Create users</h1>
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
                required={true}
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
                required={true}
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
                required={true}
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
              disabled={requestState.isLoading}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
