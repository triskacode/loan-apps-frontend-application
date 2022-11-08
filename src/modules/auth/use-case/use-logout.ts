import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAccessToken } from "src/common/helpers/auth.helper";

type OnSuccessCallback = () => void;

export const useLogout = (onSuccessCallback?: OnSuccessCallback) => {
  const router = useRouter();
  const { destroyAccessToken } = useAccessToken();

  const doLogout = useCallback(() => {
    destroyAccessToken();
    onSuccessCallback?.();

    router.push("/");
  }, [destroyAccessToken, onSuccessCallback, router]);

  return { doLogout };
};
