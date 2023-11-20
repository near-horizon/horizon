import { z } from "zod";
import { ironSessionConfig } from "~/lib/constants/iron-session";
import { accountIdSchema } from "~/lib/validation/common";
import { sealData } from "iron-session/edge";
import { type NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { loginUser } from "~/lib/auth";
import { getUserFromRequest } from "~/lib/session";

const bodySchema = z.object({
  accountId: accountIdSchema,
  publicKey: z.string(),
});

export async function POST(req: NextRequest) {
  const { accountId, publicKey } = bodySchema.parse(await req.json());
  const user = await loginUser(accountId, publicKey);

  const encryptedSession = await sealData({ user }, ironSessionConfig);

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie.serialize(
          ironSessionConfig.cookieName,
          encryptedSession,
          ironSessionConfig.cookieOptions
        ),
      },
    }
  );
}

export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const newUser = await loginUser(user.accountId, user.publicKey);

  const encryptedSession = await sealData({ user: newUser }, ironSessionConfig);

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie.serialize(
          ironSessionConfig.cookieName,
          encryptedSession,
          ironSessionConfig.cookieOptions
        ),
      },
    }
  );
}
