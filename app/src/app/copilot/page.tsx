"use client";

import React, { useEffect, useRef } from "react";

import { ChatContainer, ChatContent, ChatFooter } from "./chat/elements";

import { Input } from "~/components/ui/input";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useChat } from "ai/react";
import Bubble from "./chat/bubble";
import { Skeleton } from "~/components/ui/skeleton";
import { Send02Svg } from "~/icons";
import { cn } from "~/lib/utils";
import { PROMPTS } from "~/lib/constants/copilot";
import { CopilotCard } from "./chat/card";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat();

  // Create a reference to the scroll area
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when the messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <ChatContainer className="flex h-full w-full flex-grow flex-col">
      {messages.length === 0 ? (
        <div className="flex h-full min-h-[60dvh] flex-col items-center justify-center gap-6">
          <div className="text-center text-4xl font-bold text-black">
            NEAR Founder Co-Pilot
          </div>
          <div className="text-center text-lg text-black">
            <div className="mb-2 font-bold">NEAR Founder Co-Pilot</div>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {PROMPTS.map((prompt, index) => (
              <CopilotCard key={index} prompt={prompt} onClick={setInput} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <ChatContent className="pb-15 flex-grow">
            <ScrollArea
              ref={scrollAreaRef}
              className="h-full max-h-[80dvh] w-full space-y-4 overflow-hidden bg-transparent"
            >
              {messages.map((message, i) => (
                <Bubble key={i} message={{ ...message }} loading={isLoading} />
              ))}

              {isLoading && messages[messages.length - 1]!.role === "user" && (
                <Bubble
                  key={"i"}
                  message={{
                    id: "loading",
                    content: "",
                    role: "assistant",
                  }}
                  loading={isLoading}
                />
              )}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </ChatContent>
        </>
      )}

      <ChatFooter className="sticky bottom-0 w-full space-x-2 pt-2">
        <div className="content_width flex w-full items-center bg-transparent">
          <form onSubmit={handleSubmit} className="relative w-full">
            <Input
              placeholder="Type your message"
              value={input}
              onChange={handleInputChange}
              className="w-full"
            />

            <button
              type={`${!isLoading ? "submit" : "button"}`}
              className={cn(
                "absolute right-1 top-1/2 -translate-y-1/2 rounded p-1.5 text-white opacity-60",
                !isLoading
                  ? "hover:bg-gray-500 hover:text-white/80"
                  : "pointer-events-none",
              )}
            >
              {isLoading ? (
                <Skeleton className="h-5 w-5 rounded-full" />
              ) : (
                <Send02Svg className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </ChatFooter>
    </ChatContainer>
  );
}
