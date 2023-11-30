import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export function HorizontalScroll({ children }: { children?: React.ReactNode }) {
  return (
    <ScrollArea>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
