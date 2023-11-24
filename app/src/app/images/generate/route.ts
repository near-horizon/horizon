import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "~/env.mjs";
import { getUserFromSession } from "~/lib/session";
import { toArrayBuffer, uploadImage } from "~/lib/utils";

const imageGenerationSchema = z.object({
  prompt: z.string(),
  imageName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let prompt, imageName;

  try {
    ({ prompt, imageName } = imageGenerationSchema.parse(await req.json()));
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const openAI = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  let response;

  try {
    response = await openAI.images.generate({
      size: "256x256",
      n: 1,
      response_format: "b64_json",
      prompt,
      user: user.accountId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't generate image" },
      { status: 500 },
    );
  }

  if (!response.created || !response.data[0]?.b64_json) {
    return NextResponse.json({ error: "No images generated" }, { status: 500 });
  }

  const file = new File(
    [toArrayBuffer(Buffer.from(response.data[0].b64_json, "base64"))],
    `${user.accountId}-${imageName ?? "image"}.png`,
    { type: "image/png" },
  );
  let cid;

  try {
    cid = await uploadImage(file);
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't upload image" },
      { status: 500 },
    );
  }

  return NextResponse.json({ cid }, { status: 200 });
}
