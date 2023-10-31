"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ContentTabs({
  tabs,
}: {
  tabs: { id: string; text: ReactNode; href: string }[];
}) {
  const tab = usePathname()?.split("/").at(-1) ?? tabs[0]?.id;

  return (
    <Tabs value={tab}>
      <TabsList className="flex-wrap">
        {tabs.map((props) => (
          <Tab key={props.id} {...props} />
        ))}
      </TabsList>
    </Tabs>
  );
}

function Tab({
  text,
  id,
  href,
}: {
  text: ReactNode;
  id: string;
  href: string;
}) {
  return (
    <TabsTrigger value={id} asChild>
      <Link href={href}>{text}</Link>
    </TabsTrigger>
  );
}
