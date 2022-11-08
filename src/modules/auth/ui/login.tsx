import { Input } from "src/common/ui";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./partials/container";
import { useRouter } from "next/router";
import { useLogin } from "../use-case/use-login";
import { LoginDto } from "../dto/login.dto";
import { HttpErrorResponse } from "src/common/types/http-response.type";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
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

  const handleSuccess = useCallback(() => {
    const redirectAfterLogin =
      (router.query.next && decodeURIComponent(router.query.next as string)) ??
      "/dashboard";

    // toast.success("Sign in success, welcome back!");
    router.push(redirectAfterLogin);
  }, [router]);

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (err.errors) {
      if (Array.isArray(err.errors)) setErrors(err.errors);
      else setErrors([err.errors]);
    } else if (err.message) {
      setErrors([err.message]);
    } else {
      setErrors(["Whooops! Something went wrong"]);
    }
  }, []);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (requestState.isSuccess) handleSuccess();

    if (requestState.isError) handleError(requestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

  return (
    <Container>
      <div className="mb-7">
        <h1 className="text-[32px] font-semibold text-slate-500">Sign In</h1>
      </div>
      <form className="w-full max-w-lg px-5" onSubmit={handleSubmit}>
        {errors && (
          <div className="px-4 py-3 rounded-md bg-red-100 text-red-700 border border-red-200 shadow font-light mb-5">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <div className="w-full">
          <Input
            name="email"
            placeholder="Your email"
            required={true}
            onChange={handleChangeInput}
          />
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required={true}
            onChange={handleChangeInput}
          />
        </div>
        <hr className="my-3 border-slate-300" />
        <div>
          <button
            className="w-full px-4 py-3 rounded-md bg-blue-500 text-slate-50 font-medium tracking-wide transition-all hover:bg-blue-600 focus:outline-0"
            type="submit"
            disabled={requestState.isLoading}
          >
            Sign In
          </button>
        </div>
      </form>
    </Container>
  );
};
