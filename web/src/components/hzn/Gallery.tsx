import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export function Gallery({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea>
      <div className="flex flex-row items-stretch justify-start gap-8">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
