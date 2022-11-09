import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { HttpErrorResponse } from "src/common/types";
import { Dropdown } from "src/common/ui/dropdown";
import { useActivateUser } from "../../use-case/use-activate-user";
import { useDeleteUser } from "../../use-case/use-delete-user";
import { useRestoreUser } from "../../use-case/use-restore-user";
import { useSoftDeleteUser } from "../../use-case/use-soft-delete-user";
import { useSuspendUser } from "../../use-case/use-suspend-user";

interface DropdownActionProps {
  userId: number;
  deleted?: boolean;
}

export const DropdownAction: React.FC<DropdownActionProps> = ({
  userId,
  deleted,
}) => {
  const { doActivateUser, requestState: activateUserRequestState } =
    useActivateUser(userId);
  const { doSuspendUser, requestState: suspendUserRequestState } =
    useSuspendUser(userId);
  const { doSoftDeleteUser, requestState: softDeleteUserRequestState } =
    useSoftDeleteUser(userId);
  const { doRestoreUser, requestState: restoreUserRequestState } =
    useRestoreUser(userId);
  const { doDeleteUser, requestState: deleteRequestState } =
    useDeleteUser(userId);

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (+err.code < 500 && err.message) {
      toast.error(err.message, {
        icon: () => <span className="text-lg mb-0.5">😱</span>,
      });
    } else {
      toast.error("Whooops! Something went wrong", {
        icon: () => <span className="text-lg mb-0.5">💥</span>,
      });
    }
  }, []);

  const handleSuccess = useCallback((message: string) => {
    toast(message, {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
  }, []);

  useEffect(() => {
    if (activateUserRequestState.isError)
      handleError(activateUserRequestState.error);
    else if (activateUserRequestState.isSuccess)
      handleSuccess("User has been activated");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activateUserRequestState.status]);

  useEffect(() => {
    if (suspendUserRequestState.isError)
      handleError(suspendUserRequestState.error);
    else if (suspendUserRequestState.isSuccess)
      handleSuccess("User has been suspended");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suspendUserRequestState.status]);

  useEffect(() => {
    if (softDeleteUserRequestState.isError)
      handleError(softDeleteUserRequestState.error);
    else if (softDeleteUserRequestState.isSuccess)
      handleSuccess("User has been deleted");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [softDeleteUserRequestState.status]);

  useEffect(() => {
    if (restoreUserRequestState.isError)
      handleError(restoreUserRequestState.error);
    else if (restoreUserRequestState.isSuccess)
      handleSuccess("User has been restored");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreUserRequestState.status]);

  useEffect(() => {
    if (deleteRequestState.isError) handleError(deleteRequestState.error);
    else if (deleteRequestState.isSuccess)
      handleSuccess("User has been deleted");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRequestState.status]);

  return (
    <Dropdown name="action" position="br">
      <div className="min-w-[150px] w-auto py-1 rounded-md border border-slate-400/50 bg-slate-50 flex flex-col [&>*]:py-1 [&>*]:px-4 [&>*]:text-left hover:[&>*]:bg-slate-200 disabled:[&>*]:text-slate-500">
        {deleted ? (
          <>
            <button
              onClick={() => doRestoreUser()}
              disabled={restoreUserRequestState.isLoading}
            >
              Restore
            </button>
            <button
              onClick={() => doDeleteUser()}
              disabled={deleteRequestState.isLoading}
            >
              Force delete
            </button>
          </>
        ) : (
          <>
            <Link href={`/dashboard/users/${userId}/update`}>Update</Link>
            <button
              onClick={() => doActivateUser()}
              disabled={activateUserRequestState.isLoading}
            >
              Activate
            </button>
            <button
              onClick={() => doSuspendUser()}
              disabled={suspendUserRequestState.isLoading}
            >
              Suspend
            </button>
            <button
              onClick={() => doSoftDeleteUser()}
              disabled={softDeleteUserRequestState.isLoading}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </Dropdown>
  );
};
