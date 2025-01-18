"use client";

import { useAuthContext } from "@/contexts/authContext";
import {
  generateAccessTokenAction,
  verifyAccessTokenAction,
} from "@/features/auth/actions/verifyUser";
import { useEffect, useState } from "react";

type propType = {
  children: React.ReactNode;
};

export default function AuthorizeClientRoute({ children }: propType) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext && authContext.accessToken === null) {
      generateAccessTokenAction().then(({ accessToken }) => {
        authContext.setAccessToken(accessToken);
        setIsAuthorized(true);
      });
    } else if (authContext && authContext.accessToken) {
      verifyAccessTokenAction(authContext.accessToken).then((payload) => {
        if (payload) setIsAuthorized(true);
      });
    }
  }, [authContext]);

  if (isAuthorized) return <>{children}</>;
  return <p>Loading...</p>;
}
