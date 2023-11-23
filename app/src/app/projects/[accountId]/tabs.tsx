"use client";

import { useSearchParams } from "next/navigation";
import ContentTabs from "~/components/ui/content-tabs";
import { type AccountId } from "~/lib/validation/common";

export function Tabs({
  accountId,
  backersViewFromKey,
  hasPermission,
}: {
  accountId: AccountId;
  backersViewFromKey: string;
  hasPermission: boolean;
}) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const isFromBackerView = !!from && from === backersViewFromKey;

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

  if (hasPermission || isFromBackerView) {
    tabs.unshift({
      id: "backers-digest",
      text: "Backers Digest",
      href: `/projects/${accountId}/backers-digest`,
    });
  }

  return <ContentTabs tabs={tabs} />;
}
