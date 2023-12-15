import { getNewProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { GeneralSection } from "./sections/general";
import { TractionMetrics } from "./sections/metrics";
import { ProjectDetails } from "./sections/details";
import { type User } from "~/lib/validation/user";
import { Founders } from "./sections/founders";
import { Artifacts } from "./sections/artifacts";
import { MediaCoverage } from "./sections/media";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Edit03Svg } from "~/icons";
import { ProjectRequestsList } from "./requests/list";

export async function ProjectProfile({
  accountId,
  user,
}: {
  accountId: AccountId;
  user: User;
}) {
  const project = await getNewProject(accountId);

  const isOwner = user.logedIn && user.accountId === accountId;
  const isBacker =
    user.logedIn && user.hasProfile && user.profileType === "backer";

  return (
    <div className="flex w-full flex-col items-start justify-start gap-8">
      <div
        id="profile"
        className="flex w-full flex-col items-start justify-start gap-12 rounded-lg border border-ui-elements-light bg-ui-elements-white px-12 py-10 shadow"
      >
        <GeneralSection profile={project.profile} />

        <ProjectDetails
          details={project.details}
          isOwner={isOwner}
          isBacker={isBacker}
        />

        <TractionMetrics
          metrics={project.metrics}
          isOwner={isOwner}
          isBacker={isBacker}
        />

        <Founders
          founders={project.founders}
          isOwner={isOwner}
          isBacker={isBacker}
        />

        <Artifacts
          artifacts={project.artifacts}
          isOwner={isOwner}
          isBacker={isBacker}
        />

        <MediaCoverage
          media={project.media}
          isOwner={isOwner}
          isBacker={isBacker}
        />
      </div>

      <div
        id="requests"
        className="flex w-full flex-col items-start justify-start gap-12 rounded-lg border border-ui-elements-light bg-ui-elements-white px-12 py-10 shadow"
      >
        <div className="flex w-full flex-row items-start justify-between">
          <h2 className="text-xl font-bold text-ui-elements-black">Requests</h2>

          {user.logedIn && user.accountId === accountId && (
            <div className="flex flex-row items-center justify-end gap-4">
              <Link href="/account/requests">
                <Button variant="outline" type="button">
                  All requests
                </Button>
              </Link>

              <Link href="/requests/create">
                <Button
                  variant="default"
                  type="button"
                  className="flex flex-row items-center justify-center gap-2 text-ui-elements-black"
                >
                  <Edit03Svg className="h-5 w-5" />
                  Create request
                </Button>
              </Link>
            </div>
          )}
        </div>

        <ProjectRequestsList accountId={accountId} />
      </div>
    </div>
  );
}
