import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HttpErrorResponse, UserState } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { useAllUser } from "src/modules/user/use-case/use-all-user";
import { Container } from "./partials/container";
import { Overview } from "./partials/overview";
import { ReviewLoan } from "./partials/review-loan";
import { ReviewUser } from "./partials/review-user";

interface ManagerProps {}

export const Manager: React.FC<ManagerProps> = () => {
  const [selectedReview, setSelectedReview] = useState<"user" | "loan">("user");
  const [errors, setErrors] = useState<string[] | null>(null);

  const { data: users, ...usersRequestState } = useAllUser({
    state: UserState.CREATED,
  });

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
    if (usersRequestState.isError) handleError(usersRequestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersRequestState.status]);

  return (
    <Container>
      <Overview />

      <div className="flex gap-x-2 items-center">
        <div className="py-1.5 px-1.5 border-none rounded-full shadow-none bg-slate-200/50 mr-2">
          <MdOutlineRemoveRedEye className="text-2xl" />
        </div>
        <h1 className="text-xl">Pending review</h1>
      </div>
      <hr className="w-full border-slate-400/50 mt-3" />
      <div className="grid grid-cols-[200px_1fr] gap-x-3 overflow-x-hidden mt-5">
        <div>
          <Button
            className="border-0 py-1 shadow-none flex items-center justify-between"
            onClick={() => setSelectedReview("user")}
          >
            <span>Users</span>
            {users && users.length > 0 && (
              <span className="block px-1.5 text-sm text-white bg-red-500 rounded-full">
                {users.length}
              </span>
            )}
          </Button>
          <Button
            className="border-0 py-1 shadow-none text-left"
            onClick={() => setSelectedReview("loan")}
          >
            <span>Loans</span>
          </Button>
        </div>
        <div className="overflow-x-auto">
          {errors && (
            <Alert>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          {selectedReview === "user" ? (
            <ReviewUser users={users} />
          ) : (
            <ReviewLoan />
          )}
        </div>
      </div>
    </Container>
  );
};
