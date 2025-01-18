import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { getCookieAction } from "@/actions/getCookies";

if (!process.env.SESSION_SECRET) {
  console.log("ENV file error!");
}

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionPayload = {
  // for registration:
  name?: string;
  phone?: string;
  email?: string;
  // for login:
  userId?: ObjectId;
  isAdmin?: boolean;
};

export async function createToken(
  payload: SessionPayload,
  expirationTime: string,
) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(encodedKey);
    return token;
  } catch (error) {
    console.log("Error at fn'createToke':", error);
    throw new Error("Error while generating the JWT token");
  }
}

export async function verifyToken(token: string | undefined = "") {
  if (!token) throw new Error("No token provided!");

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: unknown) {
    console.log("Failure during fn'verifyToken':", error);
    throw new Error("Error verifying JWT token!");
  }
}

export async function verifyAccessToken(accessToken: string) {
  if (!accessToken) return null;

  // verify the token:
  let payload;
  try {
    payload = await verifyToken(accessToken);
  } catch (error) {
    // if not verified, redirect to registration error page:
    console.log(
      "Error when verifying jwt token from 'verifyCustomerAction':\n",
      error,
    );
    return null;
  }
  return payload;
}

export async function generateAccessToken() {
  // if not verified, try to generate a new token with refreshToken:
  const refreshToken = await getCookieAction("refreshToken");
  // no refersh token:
  if (!refreshToken) return redirect("/login");

  const payload = await verifyAccessToken(refreshToken.value);
  // refresh token not valid:
  if (!payload) return redirect("/login");

  // else, write db & then return access & refresh tokens:
  const { userId } = payload;

  // generate tokens:
  const nextPayload = {
    userId: new ObjectId(String(userId)),
    isAdmin: false,
  };

  const accessToken = await createToken(nextPayload, "15m");
  return { accessToken };
}

export async function generateAuthTokens(token: string) {
  if (!token) return redirect("/login?status=error");

  const payload = await verifyAccessToken(token);
  if (!payload) return redirect("/login?status=error");

  // else, write db & then return access & refresh tokens:
  const { userId } = payload;

  // generate tokens:
  const nextPayload = {
    userId: new ObjectId(String(userId)),
    isAdmin: false,
  };

  const accessToken = await createToken(nextPayload, "15m");
  const refreshToken = await createToken(nextPayload, "7d");

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
}
