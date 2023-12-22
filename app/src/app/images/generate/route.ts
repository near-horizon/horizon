import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "~/env.mjs";
import { getUserFromSession } from "~/lib/session";

const imageGenerationSchema = z.object({
  prompt: z.string(),
  imageName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
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
      model: "dall-e-2",
      size: "1024x1024",
      n: 1,
      response_format: "b64_json",
      prompt,
      user: user.accountId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Couldn't generate image" },
      { status: 500 },
    );
  }

  const data = response.data[0]?.b64_json;

  if (!response.created || !data) {
    return NextResponse.json({ error: "No images generated" }, { status: 500 });
  }

  return NextResponse.json({ data, imageName }, { status: 200 });

  // const file = new File(
  //   [toArrayBuffer(Buffer.from(data, "base64"))],
  //   `${user.accountId}-${imageName ?? "image"}.png`,
  //   { type: "image/png" },
  // );
  //
  //
  // let cid;
  //
  // try {
  //   cid = await uploadImage(file);
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "Couldn't upload image" },
  //     { status: 500 },
  //   );
  // }
  //
  // return NextResponse.json({ cid }, { status: 200 });
}
