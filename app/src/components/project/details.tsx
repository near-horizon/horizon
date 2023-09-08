import { type AccountId } from "~/lib/validation/common";
import Link from "next/link";
import { type FC, type ReactNode } from "react";
import { General } from "./general";
import { Questions } from "./questions";
import { Tech } from "./tech";
import { Documents } from "./documents";
import { Funding } from "./funding";
import { Stats } from "./stats";
import { Founders } from "./founders";

const sections: {
  title: string;
  id: string;
  Content: FC<{ accountId: AccountId }>;
}[] = [
    {
      title: "About",
      id: "about",
      Content: ({ accountId }) => <General accountId={accountId} />,
    },
    {
      title: "Stats",
      id: "stats",
      Content: ({ accountId }) => <Stats accountId={accountId} />,
    },
    {
      title: "Tech",
      id: "tech",
      Content: ({ accountId }) => <Tech accountId={accountId} />,
    },
    {
      title: "Funding",
      id: "funding",
      Content: ({ accountId }) => <Funding accountId={accountId} />,
    },
    {
      title: "Documents",
      id: "documents",
      Content: ({ accountId }) => <Documents accountId={accountId} />,
    },
    {
      title: "Founders",
      id: "founders",
      Content: ({ accountId }) => <Founders accountId={accountId} />,
    },
    {
      title: "Details",
      id: "details",
      Content: ({ accountId }) => <Questions accountId={accountId} />,
    },
  ];

export function Details({ accountId }: { accountId: AccountId }) {
  return (
    <div className="relative flex flex-row items-start gap-8">
      <div className="flex w-full flex-col divide-y md:w-5/6">
        {sections.map(({ title, id, Content }) => (
          <Section title={title} id={id} key={id}>
            <Content accountId={accountId} />
          </Section>
        ))}
      </div>

      <ul className="sticky top-4 hidden w-1/6 list-inside list-none flex-col gap-2 pt-4 md:flex">
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
