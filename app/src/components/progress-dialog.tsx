import Link from "next/link";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Progress } from "./ui/progress";

export function ProgressDialog({
  progress,
  title,
  description,
  triggerText,
  ctaLink = "/profile",
  ctaText = "Go to profile",
}: {
  progress: number;
  title: string;
  description: string;
  triggerText: string;
  ctaLink?: string;
  ctaText?: string;
}) {
  return (
    <>
      <DialogTrigger asChild>
        <Button variant="default" type="submit">
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
    </>
  );
}
