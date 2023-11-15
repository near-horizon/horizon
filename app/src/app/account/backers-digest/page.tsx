import { redirect } from "next/navigation";
import { getBackersDigest, hasBackersDigest } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { Edit03Svg, Target04Svg } from "~/icons";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { BackersDigest } from "~/app/projects/[accountId]/backers-digest/backers-digest";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export default async function BackersDigestPage() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  const backersDigest = await getBackersDigest(user.accountId);
  const hasDigest = await hasBackersDigest(user.accountId);

  if (!hasDigest) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mx-auto flex max-w-prose flex-col items-center justify-center gap-5">
          <Target04Svg className="h-10 w-10 text-error" />
          <h2 className="text-2xl font-bold text-text-dark">
            Straight to the point with backers digest
          </h2>
          <h3 className="text-ui-elements-black">
            Backer digest is the summary of key aspects of your project that
            most critical to backers.
          </h3>
          <ul className="list-inside list-disc">
            <li>Visible only for backers</li>
            <li>Increase your visibility to VCs and funds</li>
            <li>Helps you to articulate your main value proposition</li>
            <li>Shareable with any web user</li>
            <li>Saves you time and effort in fundraising</li>
            <li>Absolutely free!</li>
          </ul>
          <div className="flex w-full flex-row items-center justify-center gap-4">
            <Link href="/account/backers-digest/create">
              <Button
                variant="default"
                className="flex flex-row items-center justify-center gap-2 font-medium text-ui-elements-dark"
              >
                <Target04Svg className="h-5 w-5" />
                Create backers digest
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-6">
      <div className="flex flex-row items-start justify-start gap-4">
        <div className="flex flex-grow flex-col gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <Target04Svg className="h-10 w-10 text-error" />
            <h1 className="text-2xl font-bold">Backers digest</h1>
            <Badge
              variant="outline"
              className={cn(
                "rounded border-orange-400 border-opacity-90 bg-orange-50 text-orange-700 mix-blend-multiply",
                {
                  "border-primary bg-primary-light text-primary":
                    backersDigest?.published,
                }
              )}
            >
              {backersDigest?.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <Link href="/account/backers-digest/create">
            <Button
              variant="outline"
              className="flex flex-row items-center justify-center gap-2"
            >
              <Edit03Svg className="h-5 w-5" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <BackersDigest accountId={user.accountId} />
    </div>
  );
}
