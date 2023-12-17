"use client";

import React, { useEffect, useRef } from "react";

import {
  ChatContainer,
  ChatContent,
  ChatDescription,
  ChatFooter,
  ChatHeader,
} from "./chat/elements";

import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useChat } from "ai/react";
import Bubble from "./chat/bubble";
import { Skeleton } from "~/components/ui/skeleton";
import { Send02Svg } from "~/icons";
import { cn } from "~/lib/utils";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

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
    <ChatContainer className="flex w-full flex-col">
      {messages.length === 0 ? (
        <div className="mx-auto mt-[15%] flex w-[300px] flex-grow flex-col space-y-6 sm:w-[600px]">
          <div className="text-center text-4xl font-bold text-black">
            NEAR Founder Co-Pilot
          </div>
          <div className="text-center text-lg text-black">
            <div className="mb-2 font-bold">NEAR Founder Co-Pilot</div>
          </div>
        </div>
      ) : (
        <>
          <ChatHeader className="border-assistant-background border-b py-2">
            {/* <ChatTitle className="text-lg">Chatbot</ChatTitle> */}
            <ChatDescription className="content_width text-center leading-3">
              Powered by NEAR Horizon
            </ChatDescription>
          </ChatHeader>
          <ChatContent className="pb-15 flex-grow overflow-y-auto">
            <ScrollArea
              ref={scrollAreaRef}
              className="spacy-y-4 h-full w-full overflow-y-auto bg-transparent"
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
            </ScrollArea>
          </ChatContent>
        </>
      )}

      <ChatFooter className="sticky bottom-0 w-full space-x-2 pt-2">
        <div className="content_width flex items-center bg-transparent">
          <form onSubmit={handleSubmit} className="relative">
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
