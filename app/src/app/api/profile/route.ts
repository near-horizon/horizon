import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import { getUserFromSession } from "~/lib/session";
import { profileSchema } from "~/lib/validation/fetching";

const bodySchema = profileSchema.extend({
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = bodySchema.parse(await req.json());
    const response = await fetch(
      `${env.API_URL}/data/projects/${user.accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.API_KEY}`,
        },
        body: JSON.stringify(profile),
      },
    );

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "Could not perform update" },
      { status: 500 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Bad request body" },
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = bodySchema.parse(await req.json());
    const response = await fetch(
      `${env.API_URL}/data/projects/${user.accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.API_KEY}`,
        },
        body: JSON.stringify(profile),
      },
    );

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "Could not perform update" },
      { status: 500 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Bad request body" },
      { status: 400 },
    );
  }
}
