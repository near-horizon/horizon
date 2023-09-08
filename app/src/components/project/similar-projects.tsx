import { useSimilarProjects } from "~/lib/projects";
import { Project } from "../project";
import { type AccountId } from "~/lib/validation/common";

export function SimilarProjects({ accountId }: { accountId: AccountId }) {
  const { data, status } = useSimilarProjects(accountId);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Similar projects</h3>
      <div className="flex flex-col gap-2">
        {status === "loading" ? (
          <>
            <Project accountId={accountId} loading />
            <Project accountId={accountId} loading />
            <Project accountId={accountId} loading />
            <Project accountId={accountId} loading />
          </>
        ) : (
          data
            ?.slice(0, 5)
            .map((accountId) => (
              <Project key={accountId} accountId={accountId} />
            ))
        )}
      </div>
    </div>
  );
}
