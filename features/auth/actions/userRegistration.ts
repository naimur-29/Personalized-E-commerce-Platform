"use server";

import { redirect } from "next/navigation";
import { getCollection } from "@/utils/db";
import { createToken } from "@/utils/authSession";
import { registrationSchema } from "@/features/auth/schemas/user";
import generateRegistrationMail from "@/features/auth/utils/generateRegistrationMail";
import { parseWithZod } from "@conform-to/zod";
// import nodemailer from "nodemailer";

export async function userRegistrationAction(
  _prevState: unknown,
  formData: FormData
) {
  // form validation:
  const submission = parseWithZod(formData, {
    schema: registrationSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // fetch data:
  const { name, phone, email } = submission.value;

  // check if user with same phone or email already exists:
  const userCollection = await getCollection("users");
  if (!userCollection) return redirect("/register?status=error");

  const user = await userCollection.findOne({
    $or: [{ phone }, { email }],
  });

  if (user !== null) {
    const errorMessage = "An user with these values already exists!";
    return submission.reply({
      formErrors: [errorMessage],
    });
  }

  if (!process.env.GMAIL_ADDRESS) return redirect("/register?status=error");

  // generate a jwt token:
  const payload = {
    name,
    phone,
    email,
  };
  const registrationToken = await createToken(payload, "10m");

  // create a mail:
  const link = `${process.env.ORIGIN_URL}/verify?context=registration&token=${registrationToken}`;
  const { mailSubject, mailBody } = generateRegistrationMail(
    name,
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
  return redirect("/register?status=success");
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
  // return redirect(`/register?status=${status}`);
}
