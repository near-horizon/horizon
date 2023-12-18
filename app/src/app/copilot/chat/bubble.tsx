"use client";

import { type Message } from "ai";
import { cn } from "~/lib/utils";
import { Markdown } from "../markdown/react-markdown";
import { Avatar } from "~/components/ui/avatar";
import { RateMessage } from "./rate-message";

const verifiedSourcesText = "Verified Sources:";

function getSources(message: Message) {
  const sourcesIndex = message.content.indexOf(verifiedSourcesText);

  if (sourcesIndex === -1 || message.role !== "assistant") {
    return {
      sources: [],
      messageWithOutSources: message.content,
      messageId: 0,
    };
  }

  const idIndex = sourcesIndex - 9;

  // Extract everything up to "Verified Sources:"
  const messageWithOutSources = message.content.substring(0, idIndex);
  const messageId = Number(
    message.content.substring(idIndex, sourcesIndex).trim(),
  );

  // Extract the substring from "Verified Sources" to the end of the string
  const verifiedSourcesSection = message.content.substring(sourcesIndex).trim();

  // Split the section into lines and remove the first line
  const [, ...sourcesLines] = verifiedSourcesSection.split("\n");

  // Keep the URLs
  const sources = sourcesLines.map((line) => {
    // You can further process each line if necessary, for example, extract URLs from markdown links
    const urlMatch = line.match(/\[.*?\]\((?<url>.*?)\)/);

    if (urlMatch?.groups?.url) {
      return urlMatch.groups.url;
    }

    return line.trim(); // This will return the URL part of the markdown link
  });

  return {
    sources,
    messageWithOutSources,
    messageId,
  };
}

function getDisplayNameFromURL(url: string) {
  try {
    const urlObj = new URL(url);
    // Remove common subdomains
    const hostname = urlObj.hostname.replace(/^www\./, "");

    // Extract the second-level domain part
    const parts = hostname.split(".");
    const displayName = parts.length > 1 ? parts.at(-2)! : hostname;

    // Capitalize the first letter
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  } catch (e) {
    console.error(e, url);
    return url;
  }
}

export default function Bubble({
  message,
  loading = false,
}: {
  message: Message;
  loading?: boolean;
}) {
  const { sources, messageWithOutSources, messageId } = getSources(message);

  return (
    <div
      key={message.id}
      className={`flex flex-col border-none ${
        message.role === "user"
          ? "border-b border-gray-900/50 bg-human-background text-human-foreground"
          : "border-b border-gray-900/50 bg-assistant-background text-assistant-foreground"
      }`}
    >
      <div className="content_width relative flex flex-1 gap-3 border-none p-6 text-sm">
        {message.role === "user" && (
          <Avatar className="h-8 w-8">
            <div className="rounded-full bg-gray-300  p-1">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Avatar>
        )}

        {message.role === "assistant" && (
          <Avatar className="h-8 w-8">
            {/* <AvatarFallback>M</AvatarFallback> */}
            <div
              className={cn(
                "rounded-full bg-gray-300 p-1",
                loading && "animate-pulse",
              )}
            >
              <svg
                fill="#000000"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z" />
                <ellipse cx="8.5" cy="12" rx="1.5" ry="2" />
                <ellipse cx="15.5" cy="12" rx="1.5" ry="2" />
                <path d="M8 16h8v2H8z" />
              </svg>
            </div>
          </Avatar>
        )}

        <div className="mt-1 w-full space-y-3">
          <Markdown>{`${messageWithOutSources}`}</Markdown>

          <div className="flex w-full justify-between">
            <div className="flex w-full space-x-3">
              {sources.map((item, index) => (
                <a
                  key={index}
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex space-x-1 rounded-full border-none bg-human-background py-1 pl-1 pr-2 text-xs"
                >
                  <span className="rounded-full border-[0.5px] border-gray-600 px-1.5 text-[7px] text-gray-300 group-hover:text-gray-50">
                    {index + 1}
                  </span>
                  <span className="text-blue-400 group-hover:text-blue-600">
                    {getDisplayNameFromURL(item)}
                  </span>
                </a>
              ))}
            </div>

            {!loading && message.role === "assistant" && (
              <RateMessage id={messageId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
