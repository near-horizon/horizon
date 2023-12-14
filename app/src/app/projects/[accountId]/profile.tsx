import { getNewProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { GeneralSection } from "./sections/general";
import { TractionMetrics } from "./sections/metrics";
import { ProjectDetails } from "./sections/details";
import { type User } from "~/lib/validation/user";
import { Founders } from "./sections/founders";
import { Artifacts } from "./sections/artifacts";
import { MediaCoverage } from "./sections/media";

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
        <h2 className="text-xl font-bold text-ui-elements-black">Requests</h2>
      </div>
    </div>
  );
}
