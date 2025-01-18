"use client";

import { useAuthContext } from "@/contexts/authContext";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { LogoutAction } from "@/actions/logout";
import { navigate } from "@/actions/navigate";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const authContext = useAuthContext();

  const handleLogout = () => {
    startTransition(async () => {
      authContext?.setAccessToken(null);
      await LogoutAction();
      await navigate("/");
    });
  };

  return (
    <Button onClick={handleLogout}>
      {isPending ? "Loading..." : "Logout"}
    </Button>
  );
}
