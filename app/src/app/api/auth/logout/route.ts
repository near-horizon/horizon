import { NextResponse } from "next/server";
import cookie from "cookie";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export function POST() {
  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie.serialize(ironSessionConfig.cookieName, "", {
          ...ironSessionConfig.cookieOptions,
          maxAge: 0,
        }),
      },
    }
  );
}
