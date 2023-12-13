import { AIStream, type OpenAIStreamCallbacks } from "ai";

export interface MendableStreamCallbacks extends OpenAIStreamCallbacks {
  onMessage?: (data: string) => Promise<void>;
  onLinksReceived?: (links: string[]) => Promise<void>; // Add this line
}

let sourcesChunk: string[] = [];

function toMarkdownNumberedList(l: string[]) {
  let markdownString = "\n Verified Sources: \n";
  for (let i = 0; i < l.length; i++) {
    markdownString += `${i + 1}. [${l[i]}](${l[i]})\n`;
  }
  return markdownString;
}

function parseMendableStream(
  callbacks?: MendableStreamCallbacks,
): (data: string) => string | void {
  return (data) => {
    const parsedData = JSON.parse(data) as {
      chunk: string;
      metadata: { link: string }[];
    };
    const chunk = parsedData.chunk;

    console.log("CHUNK: ", chunk);
    // TODO: handle source and message_id to provide sources to the users
    // More info here: https://docs.mendable.ai/mendable-api/chat
    if (chunk === "<|source|>") {
      const sources = parsedData.metadata;
      sourcesChunk = sources.map((item) => item.link);
      void callbacks?.onLinksReceived?.(sourcesChunk);

      return;
    }

    if (chunk === "<|message_id|>") {
      const response_message_id = parsedData.metadata;
      console.debug("MSG ID: ", response_message_id);
      // #return response_message_id;

      const s = toMarkdownNumberedList(sourcesChunk);
      const id = response_message_id.toString();

      return id + s;
    }

    return chunk;
  };
}

export async function MendableStream(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  callbacks?: MendableStreamCallbacks,
) {
  const url = "https://api.mendable.ai/v0/mendableChat";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Response error: " + (await response.text()));
  }

  return AIStream(response, parseMendableStream(), callbacks);
}
