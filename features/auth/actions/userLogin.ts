"use server";

import { redirect } from "next/navigation";
import { getCollection } from "@/utils/db";
import { createToken } from "@/utils/authSession";
import { loginSchema } from "@/features/auth/schemas/user";
import generateLoginMail from "@/features/auth/utils/generateLoginMail";
import { parseWithZod } from "@conform-to/zod";
// import nodemailer from "nodemailer";

if (!process.env.MONGODB_URI) {
  throw new Error("Mongo URI not found!");
}

export async function userLoginAction(_prevState: unknown, formData: FormData) {
  // form validation:
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // fetch data:
  const { email } = submission.value;

  // check if user with same phone or email already exists:
  const userCollection = await getCollection("users");
  if (!userCollection) return redirect("/login?status=error");

  const user = await userCollection.findOne({ email });

  if (user === null) {
    const errorMessage = "No account found. Please register to continue.";
    return submission.reply({
      formErrors: [errorMessage],
    });
  }

  if (!process.env.GMAIL_ADDRESS) return redirect(`/login?status=error`);

  // generate a jwt token:
  const payload = {
    userId: user?._id,
  };
  const loginToken = await createToken(payload, "10m");

  // create a mail:
  const link = `${process.env.ORIGIN_URL}/verify?context=login&token=${loginToken}`;
  const { mailSubject, mailBody } = generateLoginMail(
    user?.name,
    link,
    process.env.GMAIL_ADDRESS
  );

  const mail = {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: mailSubject,
    html: mailBody,
  };

  // send the mail:
  console.log("let mail sent", mail);
  return redirect("/login?status=success");
  // nodemailer with gmail service:
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.GMAIL_ADDRESS,
  //     pass: process.env.GMAIL_APP_PASSWORD,
  //   },
  // });
  //
  // let status = "error";
  // try {
  //   await transporter.sendMail(mail);
  //   status = "success";
  // } catch (error) {
  //   console.log("Error when sending the mail:", error);
  // }
  //
  // return redirect(`/login?status=${status}`);
}
