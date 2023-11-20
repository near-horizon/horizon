import { type IronSession } from "iron-session";
import { type AccountId } from "../validation/common";

export async function login({
  accountId,
  publicKey,
}: {
  accountId: AccountId;
  publicKey: string;
}) {
  const result = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      accountId,
      publicKey,
    }),
  });

  if (!result.ok) {
    throw new Error("Failed to login");
  }

  const { ok } = (await result.json()) as { ok: boolean };

  if (!ok) {
    throw new Error("Failed to login");
  }

  return result;
}

export async function updateSession() {
  const result = await fetch("/api/auth/login", {
    method: "PATCH",
  });

  if (!result.ok) {
    throw new Error("Failed to update session");
  }

  const { ok } = (await result.json()) as { ok: boolean };

  if (!ok) {
    throw new Error("Failed to update session");
  }

  return result;
}

export async function logout() {
  const result = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!result.ok) {
    throw new Error("Failed to logout");
  }

  const { ok } = (await result.json()) as { ok: boolean };

  if (!ok) {
    throw new Error("Failed to logout");
  }

  return result;
}

export async function getUser() {
  const response = await fetch("/api/auth/user");

  if (!response.ok) {
    throw new Error("Failed to get user");
  }

  const session = (await response.json()) as IronSession;

  return session.user;
}
