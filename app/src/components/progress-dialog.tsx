import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Progress } from "./ui/progress";
import React from "react";

export function ProgressDialog({
  progress,
  title,
  description,
  triggerText,
  ctaLink = "/account",
  ctaText = "Go to profile",
  buttonVariant = "default",
  onClick,
  className,
  disabled = false,
}: {
  progress: number;
  title: string;
  description: string;
  triggerText: React.ReactNode;
  ctaLink?: string;
  ctaText?: string;
  buttonVariant?: Parameters<typeof Button>[0]["variant"];
  onClick?: React.MouseEventHandler;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          type={onClick ? "button" : "submit"}
          onClick={onClick}
          className={className}
          disabled={disabled}
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Progress value={progress} className="w-full" />
        </div>
        <DialogFooter>
          {progress === 100 && (
            <Button variant="link">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
