import { type AccountId } from "~/lib/utils";
import { type FC, type ReactNode } from "react";
import { General } from "./general";
import { useBacker } from "~/lib/backers";
import { Description } from "../description";

const sections: {
  title: string;
  id: string;
  Content: FC<{ accountId: AccountId }>;
}[] = [
    {
      title: "Details",
      id: "details",
      Content: ({ accountId }) => <General accountId={accountId} />,
    },
    {
      title: "About",
      id: "about",
      Content: ({ accountId }) => <DescriptionArea accountId={accountId} />,
    },
  ];

export function Details({ accountId }: { accountId: AccountId }) {
  return (
    <div className="relative flex flex-row items-start gap-8">
      <div className="flex w-full flex-col divide-y">
        {sections.map(({ title, id, Content }) => (
          <Section title={title} id={id} key={id}>
            <Content accountId={accountId} />
          </Section>
        ))}
      </div>
    </div>
  );
}

function DescriptionArea({ accountId }: { accountId: AccountId }) {
  const { data, status } = useBacker(accountId);

  return (
    <Description
      text={data?.description ?? ""}
      loading={status === "loading"}
      full
    />
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
