import { forwardRef } from "react";
import { cn } from "~/lib/utils";

const ChatContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-full w-full rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow",
      className,
    )}
    {...props}
  />
));
ChatContainer.displayName = "ChatContainer";

const ChatHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center space-y-1.5 px-6 py-1",
      className,
    )}
    {...props}
  />
));
ChatHeader.displayName = "ChatHeader";

const ChatTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
ChatTitle.displayName = "ChatTitle";

const ChatDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ChatDescription.displayName = "ChatDescription";

const ChatContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
ChatContent.displayName = "ChatContent";

const ChatFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center p-6 pt-0", className)}
    {...props}
  />
));
ChatFooter.displayName = "ChatFooter";

export {
  ChatContainer,
  ChatContent,
  ChatDescription,
  ChatFooter,
  ChatHeader,
  ChatTitle,
};
