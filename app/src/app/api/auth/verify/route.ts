import { randomInt } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import VerificationEmail from "../../../../../email-templates/emails/verification";
import { NUMBER } from "~/lib/format";
import {
  getVerificationCode,
  storeVerificationCode,
} from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";

const bodySchema = z.object({
  email: z.string().email(),
});

const resend = new Resend();

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsedBody = bodySchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { email } = parsedBody.data;

  const code = randomInt(0, 999_999);

  const result = await storeVerificationCode(user.accountId, code);

  if (!result) {
    return NextResponse.json(
      { error: "Failed to store verification code" },
      { status: 500 },
    );
  }

  try {
    const data = await resend.emails.send({
      from: "NEAR Horizon <onboarding@app.hzn.xyz>",
      to: email,
      subject: "Email Verification for NEAR Horizon",
      react: VerificationEmail({ code: NUMBER.verification(code) }),
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 },
    );
  }
}

const codeSchema = z.object({
  code: z.string(),
});

export async function PUT(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = codeSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  try {
    const code = await getVerificationCode(user.accountId);
    return NextResponse.json({ ok: code === parsed.data.code });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to get verification code" },
      { status: 500 },
    );
  }
}
