import { cookies } from "next/headers";
import { unsealData } from "iron-session/edge";
import { ironSessionConfig } from "./constants/iron-session";
import { type IronSession } from "iron-session";
import { type NextRequest } from "next/server";

export async function getUserFromSession() {
  const cookieStore = cookies();

  const session = cookieStore.get(ironSessionConfig.cookieName);

  if (!session?.value) return null;

  return (
    await unsealData<IronSession>(session.value, {
      ...ironSessionConfig,
    })
  ).user;
}

export async function getUserFromRequest(req: NextRequest) {
  const session = req.cookies.get(ironSessionConfig.cookieName);

  if (!session?.value) return null;

  return (
    await unsealData<IronSession>(session.value, { ...ironSessionConfig })
  ).user;
}
