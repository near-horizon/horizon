"use client";

import { type FC, memo } from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import { CodeBlock } from "./code-block";
import { cn } from "~/lib/utils";

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

export function Markdown({ children }: { children: string }) {
  return (
    <MemoizedReactMarkdown
      className="custom-prose prose w-full dark:prose-invert"
      components={{
        code({ className, children, ...props }) {
          if (Array.isArray(children) && typeof children[0] === "string") {
            if (children[0] === "▍") {
              return (
                <span className="mt-1 animate-pulse cursor-default">▍</span>
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
          console.log("href", href);
          console.log("Children", children);
          return (
            <>
              <a href={href} className="markdown-link text-blue-400" {...props}>
                {children}
              </a>
            </>
          );
        },
      }}
    >
      {children}
    </MemoizedReactMarkdown>
  );
}
