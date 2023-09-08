import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Section = {
  title: string;
  id: string;
  Content: ReactNode;
};

export function Details({
  sections,
  links = false,
}: {
  sections: Section[];
  links?: boolean;
}) {
  return (
    <div className="relative flex flex-row items-start gap-8">
      <div
        className={cn("flex w-full flex-col divide-y", { "md:w-5/6": links })}
      >
        {sections.map(({ title, id, Content }) => (
          <Section title={title} id={id} key={id}>
            {Content}
          </Section>
        ))}
      </div>

      <ul
        className={cn(
          "sticky top-4 hidden w-1/6 list-inside list-none flex-col gap-2 pt-4",
          { "md:flex": links }
        )}
      >
        {sections.map(({ title, id }) => (
          <ListItem title={title} id={id} key={id} />
        ))}
      </ul>
    </div>
  );
}

function Section({
  title,
  id,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2 py-8">
      <div>
        <h4 className="text-xl font-bold" id={id}>
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
}

function ListItem({ title, id }: { title: string; id: string }) {
  return (
    <li>
      <Link href={`#${id}`}>{title}</Link>
    </li>
  );
}
