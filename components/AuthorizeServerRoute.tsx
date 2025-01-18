"use server";

import { getCookieAction } from "@/actions/getCookies";
import { verifyAccessTokenAction } from "@/features/auth/actions/verifyUser";
import { redirect } from "next/navigation";

type propType = {
  children: React.ReactNode;
};

export default async function AuthorizeServerRoute({ children }: propType) {
  const refreshToken = await getCookieAction("refreshToken");
  const isAuthorized =
    refreshToken && (await verifyAccessTokenAction(refreshToken.value));

  if (isAuthorized) return <>{children}</>;
  return redirect("/login");
}
