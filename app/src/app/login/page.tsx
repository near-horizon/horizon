"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useHasProfile } from "~/hooks/auth";
import { useSignIn, useUser } from "~/stores/global";

export default function LoginPage() {
  const user = useUser();
  const { data: hasProfile } = useHasProfile(user?.accountId);
  const signIn = useSignIn();

  if (user && hasProfile) {
    return redirect("/");
  }

  return (
    <div className="flex h-96 flex-row items-center justify-center gap-4 rounded-lg border border-ui-elements-light bg-background-white shadow">
      {!user && (
        <Button variant="outline" onClick={signIn}>
          Sign in
        </Button>
      )}
      {user && !hasProfile && (
        <Link href="/onboarding">
          <Button variant="default">Create profile</Button>
        </Link>
      )}
    </div>
  );
}
