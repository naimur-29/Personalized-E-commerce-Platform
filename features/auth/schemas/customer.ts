import { z } from "zod";

export const registrationServerSchema = z.object({
  name: z.string().min(5, "Name must contain at least 5 character(s)"),
  phone: z.string().length(11, "Phone must contain exactly 11 digit(s)"),
  email: z.string().email(),
});

export const registrationClientSchema = z
  .object({
    name: z
      .string({ message: "Name is required!" })
      .min(5, "Name must contain at least 5 characters!"),
    phone: z
      .string({ message: "Phone is required!" })
      .length(11, "Phone must contain exactly 11 digits!"),
    email: z.string({ message: "Email is required!" }).email(),
    password: z
      .string({ message: "Password is required!" })
      .regex(
        /^(?=(.*[A-Za-z]))(?=(.*[0-9]))(?=(.*[^A-Za-z0-9]))[A-Za-z0-9[^A-Za-z0-9]]{8,}$/,
        "Password must be at least 8 characters long, contain at least 1 letter, 1 digit, and 1 special character!"
      ),
    retypedPassword: z
      .string({ message: "Retype the password!" })
      .regex(
        /^(?=(.*[A-Za-z]))(?=(.*[0-9]))(?=(.*[^A-Za-z0-9]))[A-Za-z0-9[^A-Za-z0-9]]{8,}$/,
        "Password must be at least 8 characters long, contain at least 1 letter, 1 digit, and 1 special character!"
      ),
  })
  .refine((data) => data.password === data.retypedPassword, {
    message: "Passwords must match!",
    path: ["retypedPassword"],
  });
