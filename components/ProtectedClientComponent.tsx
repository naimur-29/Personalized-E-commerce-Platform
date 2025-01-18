"use client";

import AuthorizeClientRoute from "./AuthorizeClientRoute";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { getUserDataAction } from "@/actions/getUserData";

type UserType = {
  name: string;
  email: string;
  phone: string;
};

export default function ProtectedClientComponent() {
  const [user, setUser] = useState<UserType | null>(null);
  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext && authContext.accessToken)
      getUserDataAction(authContext.accessToken).then((res) => {
        if (res) {
          setUser(res);
        }
      });
  }, [authContext]);

  return (
    <AuthorizeClientRoute>
      <h1>Some Protected Client Component</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>

      <LogoutButton />
    </AuthorizeClientRoute>
  );
}
