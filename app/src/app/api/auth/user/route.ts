import { type IronSession } from "iron-session";
import { unsealData } from "iron-session/edge";
import { type NextRequest, NextResponse } from "next/server";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(ironSessionConfig.cookieName);

  if (!sessionCookie) {
    return NextResponse.json(
      { ok: false },
      {
        status: 401,
      }
    );
  }

  const { user } = await unsealData<IronSession>(
    sessionCookie.value,
    ironSessionConfig
  );

  if (!user) {
    return NextResponse.json(
      { ok: false },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({ ok: true, user });
}
