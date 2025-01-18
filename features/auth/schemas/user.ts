import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ message: "Name is required!" })
    .trim()
    .min(5, "Name must contain at least 5 valid characters!"),
  phone: z
    .string({ message: "Phone is required!" })
    .trim()
    .refine(
      (value) =>
        value.startsWith("01") && value.length === 11 && /^\d+$/.test(value),
      {
        message: "Phone must contain exactly 11 valid digits!",
      },
    ),
  email: z.string({ message: "Email is required!" }).trim().email(),
});

export const loginSchema = z.object({
  email: z.string({ message: "Email is required!" }).trim().email(),
});
