"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createUserAction } from "@/features/auth/actions/createUser";
import { generateAuthTokensAction } from "@/features/auth/actions/verifyUser";
import { useAuthContext } from "@/contexts/authContext";
import { navigate } from "@/actions/navigate";
import { redirect } from "next/navigation";

type propType = {
  token: string | null;
  context: string | null;
};

export default function VerifyUser({ token, context }: propType) {
  const [isPending, startTransition] = useTransition();
  const authContext = useAuthContext();

  if (!token || token.length < 100)
    return redirect(
      `/${context === "registration" ? "register" : "login"}?status=error`,
    );

  const handleLoginBtn = () => {
    startTransition(async () => {
      let res;
      if (context === "registration") res = await createUserAction(token);
      else if (context === "login") res = await generateAuthTokensAction(token);

      if (res) {
        const { accessToken } = res;
        authContext?.setAccessToken(accessToken);
        await navigate("/test-protected-route"); // TODO: add proper redirecting route
      }
    });
  };

  return (
    <div className="flex justify-end">
      <Button disabled={isPending} onClick={handleLoginBtn}>
        {isPending ? "Loading..." : "Login"}
      </Button>
    </div>
  );
}
