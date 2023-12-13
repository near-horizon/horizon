import ContentTabs from "~/components/ui/content-tabs";
import { type AccountId } from "~/lib/validation/common";

export function Tabs({ accountId }: { accountId: AccountId }) {
  const tabs = [
    {
      id: "overview",
      text: "Overview",
      href: `/projects/${accountId}/overview`,
    },
    {
      id: "details",
      text: "Details",
      href: `/projects/${accountId}/details`,
    },
    {
      id: "requests",
      text: "Requests",
      href: `/projects/${accountId}/requests`,
    },
    {
      id: "contracts",
      text: "Contracts",
      href: `/projects/${accountId}/contracts`,
    },
    {
      id: "history",
      text: "Work History",
      href: `/projects/${accountId}/history`,
    },
  ] satisfies Parameters<typeof ContentTabs>[0]["tabs"];

  return <ContentTabs tabs={tabs} />;
}
