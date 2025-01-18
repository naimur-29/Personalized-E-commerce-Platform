"use server";

import { verifyAccessTokenAction } from "@/features/auth/actions/verifyUser";
import { getCollection } from "@/utils/db";
import { ObjectId } from "mongodb";

export async function getUserDataAction(accessToken: string) {
  const payload = await verifyAccessTokenAction(accessToken);
  if (!payload) return null;
  let { userId } = payload;
  if (!userId) return null;

  userId = new ObjectId(String(userId));
  const usersCollection = await getCollection("users");
  const user = await usersCollection?.findOne({
    _id: userId as ObjectId,
  });

  if (user)
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    };
  return null;
}
