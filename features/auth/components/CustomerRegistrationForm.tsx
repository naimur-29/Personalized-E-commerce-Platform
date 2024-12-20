"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { registrationClientSchema } from "@/features/auth/schemas/customer";
import { createCustomerAction } from "@/features/auth/actions/createCustomer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomerRegistrationForm() {
  const [lastResult, action] = useActionState(createCustomerAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registrationClientSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="flex flex-col gap-2"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="ex: anonymous"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
        />
        <p className="text-red-500 text-sm text-right opacity-70">
          {fields.name.errors}
        </p>
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          placeholder="ex: 01888888888"
          key={fields.phone.key}
          name={fields.phone.name}
          defaultValue={fields.phone.initialValue}
        />
        <p className="text-red-500 text-sm text-right opacity-70">
          {fields.phone.errors}
        </p>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
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
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
        />
        <p className="text-red-500 text-sm text-right opacity-70">
          {fields.password.errors}
        </p>
      </div>
      <div>
        <Label htmlFor="retypedPassword">Confirm your password</Label>
        <Input
          type="password"
          id="retypedPassword"
          key={fields.retypedPassword.key}
          name={fields.retypedPassword.name}
          defaultValue={fields.retypedPassword.initialValue}
        />
        <p className="text-red-500 text-sm text-right opacity-70">
          {fields.retypedPassword.errors}
        </p>
      </div>
      <Button type="submit" className="mt-1">
        Sign up
      </Button>
    </form>
  );
}
