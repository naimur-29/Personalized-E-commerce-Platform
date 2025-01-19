"use client";

import { useAuthContext } from "@/contexts/authContext";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { LogoutAction } from "@/actions/logout";
import { navigate } from "@/actions/navigate";
import { Loader2 } from "lucide-react";

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
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending && <Loader2 className="animate-spin" />}
      {"Logout"}
    </Button>
  );
}
