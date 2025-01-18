"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "@/features/auth/schemas/user";
import { userLoginAction } from "@/features/auth/actions/userLogin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function UserLoginForm() {
  const searchParams = useSearchParams();
  const [lastResult, action] = useActionState(userLoginAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // auth mail was sent successfully:
  if (searchParams.get("status") === "success")
    return (
      <section>
        <p>
          We’ve sent a verification email to your inbox! Please check your email
          to proceed. If you don’t see it, wait a couple of minutes before
          trying again.
        </p>
        <Link href="/login" className="underline text-blue-700">
          Go back to login page?
        </Link>
      </section>
    );

  // auth mail failure:
  if (searchParams.get("status") === "error")
    return (
      <section>
        <p>Oops, something went wrong. Please try again. </p>
        <Link href="/login" className="underline text-blue-700">
          Go back to login page?
        </Link>
      </section>
    );

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="flex flex-col gap-2"
    >
      <div>
        {form?.errors?.map((error, index) => (
          <p key={index} className="text-red-500 text-sm text-right opacity-70">
            {error}
          </p>
        ))}
      </div>
      <div>
        <Label htmlFor="email" className="text-base">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="ex: example@gmail.com"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
        />
        <p className="text-red-500 text-sm text-right opacity-70">
          {fields.email.errors}
        </p>
      </div>

      <div className="flex gap-1 justify-end text-sm text-muted-foreground">
        <p>Don’t have an account?</p>
        <Link href="/register" className="underline text-blue-700">
          Register
        </Link>
      </div>

      <SubmitButton buttonText="Login" />
    </form>
  );
}
