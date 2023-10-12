"use client";

import { type AccountId } from "~/lib/validation/common";
import { Description } from "~/components/description";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { IPFSImage } from "~/components/ipfs-image";
import { Skeleton } from "~/components/ui/skeleton";
import UserIcon from "~/components/icons/user-02.svg";
import { Handle } from "~/components/handle";
import { useContributor } from "~/hooks/contributors";
import { Availability } from "~/components/availability";
import { Tags } from "~/components/tags";

export function Contributor({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

  if (status === "loading") {
    return <ContributorSkeleton />;
  }

  if (status === "error") {
    return (
      <span className="text-red-500">
        Error loading backer with account ID {accountId}
      </span>
    );
  }

  let isOrganization = true;

  if (data.vendor_type) {
    isOrganization = data.vendor_type === "organization";
  } else if (data.organization) {
    isOrganization = data.organization === "true";
  }

  return (
    <Card className="flex h-full flex-col items-start justify-start">
      <CardHeader className="flex flex-row items-start justify-start gap-3">
        <Link className="h-20" href={`/contributors/${accountId}`}>
          <h3 className="flex flex-row items-start justify-start gap-4">
            <div className="flex-shrink-0">
              {data.image && "ipfs_cid" in data.image ? (
                <IPFSImage
                  cid={data.image.ipfs_cid}
                  className="h-16 w-16 rounded-lg"
                />
              ) : (
                <UserIcon className="h-16 w-16 rounded-lg" />
              )}
            </div>
            <div>
              <Handle accountId={accountId} />
              <span>{isOrganization ? "Organization" : "Individual"}</span>
            </div>
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>
          <Description
            text={data.description ?? data.tagline ?? ""}
            loading={false}
          />
        </CardDescription>
        <Availability available={data?.active === "true"} />
      </CardContent>
      <CardFooter>
        <Tags tags={data.tags ?? {}} loading={false} />
      </CardFooter>
    </Card>
  );
}

export function ContributorSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-start gap-3">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />
        <CardTitle className="flex flex-grow flex-row flex-wrap items-start justify-start gap-2">
          <Skeleton className="h-4 w-[min(16rem,100%)]" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-52" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="flex flex-col gap-2">
          <Skeleton className="h-4 w-48" />
        </CardDescription>
        <Skeleton className="h-4 w-40" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </CardFooter>
    </Card>
  );
}
