import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";

export function CopilotCard({
  prompt,
  clickHandler,
}: {
  prompt: string;
  clickHandler: (prompt: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <Card
      className="mr-2 h-32 w-36 rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700"
      onClick={() => clickHandler(prompt)}
    >
      <CardContent className="h-32 w-32 flex-grow text-left text-sm">
        {prompt}
      </CardContent>
    </Card>
  );
}
