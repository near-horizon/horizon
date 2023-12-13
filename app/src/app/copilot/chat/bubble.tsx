"use client";

import { type Message } from "ai";
import { cn } from "~/lib/utils";
import { CodeBlock } from "../markdown/code-block";
import { MemoizedReactMarkdown } from "../markdown/react-markdown";
import { useCallback } from "react";
import { Avatar } from "~/components/ui/avatar";
import { RateMessage } from "./rate-message";

function getSources(message: Message) {
  const sourcesIndex = message?.content.indexOf("Verified Sources:");
  if (sourcesIndex === -1 || message.role !== "assistant") {
    return {
      sources: [],
      messageWithOutSources: message.content,
      messageId: 0,
    };
  }

  // Extract everything up to "Verified Sources:"
  const messageWithOutSources = message?.content.substring(0, sourcesIndex - 9);
  const messageId = Number(
    message?.content.substring(sourcesIndex - 9, sourcesIndex).trim(),
  );
  // Extract the substring from "Verified Sources" to the end of the string
  const verifiedSourcesSection = message?.content.substring(sourcesIndex);
  // Split the section into lines
  const sourcesLines = verifiedSourcesSection.split("\n");
  // Remove the first line ("Verified Sources:") and keep the URLs
  const sources = sourcesLines.slice(1, sourcesLines.length - 1).map((line) => {
    // You can further process each line if necessary, for example, extract URLs from markdown links
    const urlMatch = line.match(/\[(.*?)\]\((.*?)\)/);
    if (urlMatch?.[2]) {
      return urlMatch[2];
    }

    return line.trim(); // This will return the URL part of the markdown link
  });

  return {
    sources,
    messageWithOutSources,
    messageId,
  };
}

export default function Bubble({
  message,
  loading = false,
}: {
  message: Message;
  loading?: boolean;
}) {
  const { sources, messageWithOutSources, messageId } = getSources(message);

  const getDisplayNameFromURL = useCallback((url: string) => {
    try {
      const urlObj = new URL(url);
      let hostname = urlObj.hostname;

      // Remove common subdomains
      hostname = hostname.replace(/^www\./, "");

      // Extract the second-level domain part
      const parts = hostname.split(".");
      const displayName =
        parts.length > 1 ? parts[parts.length - 2]! : hostname;

      // Capitalize the first letter
      return displayName.charAt(0).toUpperCase() + displayName.slice(1);
    } catch (error) {}
  }, []);

  return (
    <div
      key={message.id}
      className={`flex flex-col items-center border-none ${
        message.role === "user"
          ? "bg-human-background text-human-foreground border-b border-gray-900/50"
          : "bg-assistant-background text-assistant-foreground border-b border-gray-900/50"
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
          <MemoizedReactMarkdown
            className="prose flex-1 dark:prose-invert"
            // remarkPlugins={[remarkGfm, remarkMath]}
            // // rehypePlugins={[rehypeMathjax]}
            components={{
              code({ className, children, ...props }) {
                if (
                  Array.isArray(children) &&
                  typeof children[0] === "string"
                ) {
                  if (children[0] === "▍") {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">
                        ▍
                      </span>
                    );
                  }

                  children[0] = children[0].replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className ?? "");

                return "inline" in props && !props.inline ? (
                  <CodeBlock
                    key={Math.random()}
                    language={match?.[1] ?? ""}
                    value={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                ) : (
                  // Apply the inline-code class along with any existing classes
                  <code className={cn("inline-code", className)} {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                    {children}
                  </table>
                );
              },
              th({ children }) {
                return (
                  <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="break-words border border-black px-3 py-1 dark:border-white">
                    {children}
                  </td>
                );
              },
              a({ href, children, ...props }) {
                // Check if the last child is a string and if it ends with a period
                if (
                  Array.isArray(children) &&
                  typeof children[children.length - 1] === "string"
                ) {
                  const lastChild = children[children.length - 1] as string;

                  return (
                    <>
                      <a
                        href={href}
                        className="markdown-link text-blue-400"
                        {...props}
                      >
                        {children}
                      </a>
                      {!lastChild.trim().endsWith(".") && ". "}
                    </>
                  );
                }

                return <>{children}</>;
              },
            }}
          >
            {`${messageWithOutSources}`}
          </MemoizedReactMarkdown>

          <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center space-x-3">
              {sources.map((item, index) => (
                <a
                  key={index}
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-human-background group flex items-center space-x-1 rounded-full border-none py-1 pl-1 pr-2 text-xs"
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
