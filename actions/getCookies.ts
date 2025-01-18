"use server";

import { cookies } from "next/headers";

export async function getCookieAction(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key);
}
