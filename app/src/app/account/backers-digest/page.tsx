import { redirect } from "next/navigation";
import { hasBackersDigest } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { Target04Svg } from "~/icons";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { BackersDigest } from "~/app/projects/[accountId]/backers-digest/backers-digest";

export default async function BackersDigestPage() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return redirect("/login");
  }

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

  return <BackersDigest accountId={user.accountId} />;
}
