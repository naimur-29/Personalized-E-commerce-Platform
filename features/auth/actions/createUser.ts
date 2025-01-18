"use server";

import { cookies } from "next/headers";
import { getCollection } from "@/utils/db";
import { createToken, verifyToken } from "@/utils/authSession";
import { redirect } from "next/navigation";

export async function createUserAction(token: string) {
  if (!token) return redirect("/register?status=error");

  // verify the token:
  const payload = await verifyToken(token);
  // if not verified, redirect to registration error page:
  if (!payload) return redirect("/register?status=error");

  // else, write db & then return access & refresh tokens:
  const { name, phone, email } = payload;
  const usersCollection = await getCollection("users");
  if (!usersCollection) return redirect("/register?status=error");

  let res = null;
  try {
    // create index:
    await usersCollection.createIndex({ phone: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    // insert new user:
    res = await usersCollection.insertOne({ name, phone, email });
  } catch (error) {
    console.log(
      "Error when creating user from fn'createCustomerAction':",
      error,
    );
  }

  if (res) {
    // generate tokens:
    const payload = {
      userId: res.insertedId,
      isAdmin: false,
    };
    const accessToken = await createToken(payload, "15m");
    const refreshToken = await createToken(payload, "7d");

    // set cookies:
    const cookieStore = await cookies();
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return { accessToken };
  } else return redirect("/register?status=error");
}
