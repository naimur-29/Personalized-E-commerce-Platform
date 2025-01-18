"use server";

import {
  generateAccessToken,
  generateAuthTokens,
  verifyAccessToken,
} from "@/utils/authSession";

export async function verifyAccessTokenAction(accessToken: string) {
  return verifyAccessToken(accessToken);
}

export async function generateAccessTokenAction() {
  return generateAccessToken();
}

export async function generateAuthTokensAction(token: string) {
  return generateAuthTokens(token);
}
