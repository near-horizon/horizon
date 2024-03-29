import { type AccountId } from "../validation/common";
import { DEFAULT_USER, userSchema } from "../validation/user";

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
    return DEFAULT_USER;
  }

  try {
    const user = userSchema.parse(await response.json());
    return user;
  } catch (e) {
    return DEFAULT_USER;
  }
}
