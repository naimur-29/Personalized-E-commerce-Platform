"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type propType = {
  buttonText: string;
};

export default function SubmitButton({ buttonText }: propType) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="mt-1">
      {pending ? "Loading..." : buttonText}
    </Button>
  );
}
