"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type propType = {
  buttonText: string;
};

export default function SubmitButton({ buttonText }: propType) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="mt-1">
      {pending && <Loader2 className="animate-spin" />}
      {buttonText}
    </Button>
  );
}
