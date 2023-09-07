import { type AccountId } from "~/lib/utils";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import { Description } from "./description";
import Link from "next/link";
import { useContributor } from "~/lib/contributors";
import { Tags } from "./tags";
import { Availability } from "./availability";

export function Contributor({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useContributor(accountId);

  let isOrganization = true;

  if (data?.vendor_type) {
    isOrganization = data.vendor_type === "organization";
  } else if (data?.organization) {
    isOrganization = data.organization === "true";
  }

  return (
    <div className="flex h-[16.5rem] w-full flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow">
      <Link
        className="h-20"
        href={{
          pathname: "/contributors/[accountId]",
          query: { accountId },
        }}
      >
        <h3 className="flex flex-row items-start justify-start gap-4">
          <div className="flex-shrink-0">
            <ProjectIcon
              accountId={accountId}
              loading={loading}
              className="h-16 w-16"
            />
          </div>
          <div>
            <Handle accountId={accountId} loading={loading} />
            <span>{isOrganization ? "Organization" : "Individual"}</span>
          </div>
        </h3>
      </Link>
      <div className="h-[4.5rem]">
        <Description
          text={data?.description ?? ""}
          loading={loading || status === "loading"}
        />
      </div>
      <div className="h-4">
        <Availability available={data?.active === "true"} />
      </div>
      <div className="h-7">
        <Tags
          tags={data?.tags ?? {}}
          loading={loading || status === "loading"}
        />
      </div>
    </div>
  );
}
