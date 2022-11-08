import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./partials/container";
import { useLogin } from "../use-case/use-login";
import { LoginDto } from "../dto/login.dto";
import { HttpErrorResponse } from "src/common/types/http-response.type";
import { Alert } from "src/common/ui/alert";
import { Input } from "src/common/ui/input";
import { Button } from "src/common/ui/button";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const { doLogin, requestState } = useLogin();

  const [dto, setDto] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const name = ev.target.name;
      const value = ev.target.value;

      setDto((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();

      doLogin(dto);
    },
    [doLogin, dto]
  );

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (err.code !== 500 && err.errors) {
      if (Array.isArray(err.errors)) setErrors(err.errors);
      else setErrors([err.errors]);
    } else if (err.code !== 500 && err.message) {
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
      <div className="w-full max-w-md px-5">
        <div className="mb-[50px] flex flex-col items-center">
          <h1 className="text-4xl text-slate-700 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Pinjaman
          </h1>
          <h2 className="mt-1 text-2xl">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {errors && (
            <Alert>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          <div className="w-full">
            <Input
              name="email"
              placeholder="Your email"
              autoComplete="email"
              required={true}
              onChange={handleChangeInput}
            />
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="new-password"
              required={true}
              onChange={handleChangeInput}
            />
          </div>
          <hr className="my-3 border-slate-300" />
          <div>
            <Button
              className="bg-blue-500 text-slate-50 hover:bg-blue-600 disabled:bg-blue-600/50"
              type="submit"
              disabled={requestState.isLoading}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
