import { Suspense } from "react";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Icon } from "~/components/icon";
import { Skeleton } from "~/components/ui/skeleton";
import { getBacker } from "~/lib/server/backers";
import { type AccountId } from "~/lib/validation/common";

export default function BackersLayout({
  children,
  params: { accountId },
}: {
  children: React.ReactNode;
  params: { accountId: AccountId };
}) {
  return (
    <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <div className="flex w-full flex-col gap-6">
        <Suspense fallback={<HeaderSkeleton accountId={accountId} />}>
          <Header accountId={accountId} />
        </Suspense>

        <div className="relative w-full">{children}</div>
      </div>
    </div>
  );
}

async function Header({ accountId }: { accountId: AccountId }) {
  const data = await getBacker(accountId);

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Icon name={data.name ?? ""} image={data.image} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle accountId={accountId} name={data.name} />

        <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
          {data.tagline}
        </p>
      </div>
    </div>
  );
}

function HeaderSkeleton({ accountId }: { accountId: AccountId }) {
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Icon name={accountId} />

      <div className="flex flex-col items-start justify-start gap-3">
        <HandleSkeleton accountId={accountId} />

        <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
          <Skeleton className="h-4 w-48" />
        </p>
      </div>
    </div>
  );
}
