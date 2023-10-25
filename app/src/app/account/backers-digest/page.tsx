import { redirect } from "next/navigation";
import { getBackersDigest, hasBackersDigest } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import TargetIcon from "~/components/icons/target-04.svg";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function BackersDigest() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  const backersDigest = await getBackersDigest(user.accountId);
  const hasDigest = await hasBackersDigest(user.accountId);

  if (!hasDigest) {
    return (
      <div className="mx-auto flex max-w-prose flex-col items-center justify-center gap-5">
        <TargetIcon className="h-10 w-10 text-error" />
        <h2 className="text-2xl font-bold text-text-dark">
          Straight to the point with backers digest
        </h2>
        <h3 className="text-ui-elements-black">
          Backer digest is the summary of key aspects of your project that most
          critical to backers.
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
              <TargetIcon className="h-5 w-5" />
              Create backers digest
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <div>{JSON.stringify(backersDigest)}</div>;
}
