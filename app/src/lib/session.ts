import { cookies } from "next/headers";
import { unsealData } from "iron-session/edge";
import { ironSessionConfig } from "./constants/iron-session";
import { type IronSession } from "iron-session";

export async function getUserFromSession() {
  const cookieStore = cookies();

  const session = cookieStore.get(ironSessionConfig.cookieName)?.value;

  return session
    ? (
        await unsealData<IronSession>(session, {
          password: ironSessionConfig.password,
        })
      ).user
    : null;
}
