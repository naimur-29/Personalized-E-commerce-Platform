"use server";

import { redirect } from "next/navigation";
import { getCollection } from "@/utils/db";
import { registrationServerSchema } from "@/features/auth/schemas/customer";
import { parseWithZod } from "@conform-to/zod";

export async function createCustomerAction(
  _prevState: unknown,
  formData: FormData
) {
  // fetch data:
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  // form validation:
  const submission = parseWithZod(formData, {
    schema: registrationServerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // auth:
  const customerCollection = await getCollection("customers");
  await customerCollection?.insertOne(data);

  return redirect("/login");
}
