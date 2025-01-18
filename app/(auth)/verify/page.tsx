"use client";

import { useSearchParams } from "next/navigation";
import VerifyUser from "@/features/auth/components/VerifyUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthVerificationPage() {
  const searchParams = useSearchParams();

  return (
    <section className="flex items-center justify-center min-h-screen p-[12px]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl -mb-3">Email verified!</CardTitle>
        </CardHeader>

        <CardContent>
          <VerifyUser
            context={searchParams.get("context")}
            token={searchParams.get("token")}
          />
        </CardContent>
      </Card>
    </section>
  );
}
