import ContentTabs from "~/components/ui/content-tabs";
import { Availability } from "~/components/availability";
import { getUserFromSession } from "~/lib/session";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Link from "next/link";
import { ArrowLeftSvg, Edit05Svg, UserUp02Svg } from "~/icons";
import { CTA } from "~/components/ui/cta";
import { ProposalForm } from "~/app/proposals/form";
import { getRequest } from "~/lib/server/requests";

export default async function RequestPageLayout({
  params: { accountId, cid },
  children,
}: {
  params: { accountId: string; cid: string };
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();
  const isAdmin = user.logedIn && user.accountId === accountId;
  const request = await getRequest(accountId, cid);

  const navigation = isAdmin && (
    <div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center"
      >
        <Link
          href="/account/requests"
          className="flex h-full w-full flex-row items-center justify-center gap-2"
        >
          <ArrowLeftSvg className="h-4" />
          Back
        </Link>
      </Button>
    </div>
  );

  const actions = isAdmin ? (
    <>
      <CTA
        color="gray"
        icon={<Edit05Svg className="w-5" />}
        text="Edit request"
      />
      <CTA color="gray" icon={<></>} text="Close" />
    </>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <span className="inline-flex flex-row items-center justify-between gap-2">
            <UserUp02Svg className="w-5" />
            Propose contribution
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Propose contribution</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ProposalForm accountId={accountId} cid={cid} />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <div className="flex w-full flex-col gap-6">
        {navigation}
        <h1 className="text-2xl font-bold leading-9">{request.title}</h1>
        <Availability
          available={request.open}
          availableText="Receiving proposals"
          unavailableText="Closed"
        />
        <div className="flex flex-row items-center justify-start gap-3">
          {actions}
        </div>
        {isAdmin && (
          <ContentTabs
            tabs={[
              {
                id: "overview",
                text: "Overview",
                href: `/requests/${accountId}/${cid}/overview`,
              },
              {
                id: "proposals",
                text: "Proposals",
                href: `/requests/${accountId}/${cid}/proposals`,
              },
            ]}
          />
        )}
        {children}
      </div>
    </div>
  );
}
