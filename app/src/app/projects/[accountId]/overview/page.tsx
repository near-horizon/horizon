import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Socials } from "~/components/socials";
import { Details } from "~/components/ui/details";
import { getProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { Requests, RequestsSkeleton } from "./requests";
import { Suspense } from "react";
import { DATE } from "~/lib/format";

export default async function ProjectOverview({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const data = await getProject(accountId);

  return (
    <Details
      sections={[
        {
          id: "details",
          title: "Details",
          Content: (
            <>
              <Description text={data?.description ?? ""} full />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <Detail label="Company size">{data?.company_size ?? ""}</Detail>
                {/* <Detail */}
                {/*   label="Point of contact" */}
                {/*   value={<PointOfContact telegram={data?.linktree?.telegram} />} */}
                {/*   loading={status === "loading"} */}
                {/* /> */}
                <Detail label="Social links">
                  <Socials links={data?.linktree ?? {}} />
                </Detail>
                <Detail label="Joined">
                  <a
                    href={`https://nearblocks.io/txns/${data?.creationTx?.hash}`}
                    target="_blank"
                    referrerPolicy="origin"
                    className="text-blue-500 hover:underline"
                  >
                    {DATE.timestamp(data?.creationTx?.timestamp)}
                  </a>
                </Detail>
                <Detail label="Location">{data?.geo ?? ""}</Detail>
                <Detail label="Website">
                  <a href={`https://${data?.website}`} target="_blank">
                    {data?.website ?? ""}
                  </a>
                </Detail>
              </div>
            </>
          ),
        },
        {
          id: "requests",
          title: "Requests",
          Content: (
            <Suspense fallback={<RequestsSkeleton />}>
              <Requests accountId={accountId} />
            </Suspense>
          ),
        },
      ]}
    />
  );
}
