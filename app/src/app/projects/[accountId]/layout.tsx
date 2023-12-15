import { hasProject } from "~/lib/server/projects";
import { Tabs } from "./tabs";
import { notFound } from "next/navigation";
import { Header } from "./header";

export default async function ProjectPageLayout({
  params: { accountId },
  children,
}: {
  params: { accountId: string };
  children: React.ReactNode;
}) {
  const isProject = await hasProject(accountId);

  if (!isProject) {
    return notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-6">
      <Header accountId={accountId} />
      <Tabs accountId={accountId} />
      {children}
    </div>
  );
}
