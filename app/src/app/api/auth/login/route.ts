import { z } from "zod";
import { ironSessionConfig } from "~/lib/constants/iron-session";
import { accountIdSchema } from "~/lib/validation/common";
import { getIronSession, sealData } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { loginUser } from "~/lib/auth";
import { getUserFromSession } from "~/lib/session";
import { cookies } from "next/headers";
import { type User } from "~/lib/validation/user";

const bodySchema = z.object({
  accountId: accountIdSchema,
  publicKey: z.string(),
});

export async function POST(req: NextRequest) {
  const { accountId, publicKey } = bodySchema.parse(await req.json());
  const user = await loginUser(accountId, publicKey);

  const session = await getIronSession<User>(cookies(), ironSessionConfig);
  session.loggedIn = true;
  if (!session.loggedIn || !user.loggedIn) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  session.accountId = user.accountId;
  session.publicKey = user.publicKey;
  session.admin = user.admin;
  (session.hasProfile = user.hasProfile) &&
    (session.profileType = user.profileType);
  await session.save();

  return NextResponse.json({ ok: true });
}

export async function PATCH() {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const newUser = await loginUser(user.accountId, user.publicKey);

  const session = await getIronSession<User>(cookies(), ironSessionConfig);
  session.loggedIn = true;
  if (!session.loggedIn) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  session.accountId = user.accountId;
  session.publicKey = user.publicKey;
  session.admin = user.admin;
  (session.hasProfile = user.hasProfile) &&
    (session.profileType = user.profileType);
  await session.save();
  const encryptedSession = await sealData({ user: newUser }, ironSessionConfig);

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie.serialize(
          ironSessionConfig.cookieName,
          encryptedSession,
          ironSessionConfig.cookieOptions,
        ),
      },
    },
  );
}
