import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { useRouter } from "next/router";
import { type ReactNode } from "react";
import { type ZodCatch, type ZodDefault, type ZodEnum } from "zod";

export default function ContentTabs<T extends [string, ...string[]]>({
  tabs,
  tabRule,
}: {
  tabs: { text: string; id: string; children: ReactNode }[];
  tabRule: ZodCatch<ZodDefault<ZodEnum<T>>>;
}) {
  const { query } = useRouter();
  const tab = tabRule.parse(query.tab);

  return (
    <Tabs value={tab}>
      <TabsList>
        {tabs.map(({ text, id }) => (
          <Tab text={text} id={id} key={id} />
        ))}
      </TabsList>
      <div className="relative w-full">
        {tabs.map(({ id, children }) => (
          <Content id={id} key={id}>
            {children}
          </Content>
        ))}
      </div>
    </Tabs>
  );
}

function Tab({ text, id }: { text: string; id: string }) {
  const { pathname, query } = useRouter();

  return (
    <TabsTrigger value={id} asChild>
      <Link
        href={{
          pathname,
          query: { ...query, tab: id },
        }}
      >
        {text}
      </Link>
    </TabsTrigger>
  );
}

function Content({ id, children }: { id: string; children: ReactNode }) {
  return (
    <TabsContent value={id} className="w-full overflow-visible">
      {children}
    </TabsContent>
  );
}
