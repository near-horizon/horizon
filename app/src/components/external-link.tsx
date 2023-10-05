import { cn } from "~/lib/utils";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-text-link", className)}
    >
      {children}
    </a>
  );
}
