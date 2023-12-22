import { Button } from "~/components/ui/button";

export function CopilotCard({
  prompt,
  onClick,
}: {
  prompt: string;
  onClick: (prompt: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <Button
      className="h-auto w-80 justify-start rounded-lg pb-8 pt-4 text-left text-base font-bold transition-all duration-500"
      onClick={() => onClick(prompt)}
      variant="outline"
      type="button"
    >
      {prompt}
    </Button>
  );
}
