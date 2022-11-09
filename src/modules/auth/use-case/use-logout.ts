import { useRouter } from "next/router";
import { useCallback } from "react";
import { AuthUtil } from "src/common/utils";

type OnSuccessCallback = () => void;

export const useLogout = (onSuccessCallback?: OnSuccessCallback) => {
  const router = useRouter();

  const doLogout = useCallback(() => {
    AuthUtil.destroyAccessToken();
    onSuccessCallback?.();

    router.push("/");
  }, [onSuccessCallback, router]);

  return { doLogout };
};
