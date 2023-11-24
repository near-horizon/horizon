import { cookies } from "next/headers";
import { ironSessionConfig } from "./constants/iron-session";
import { getIronSession } from "iron-session";
import { DEFAULT_USER, type User, userSchema } from "./validation/user";

export async function getUserFromSession() {
  const data = await getIronSession<User>(cookies(), ironSessionConfig);

  const result = userSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  return DEFAULT_USER;
}
