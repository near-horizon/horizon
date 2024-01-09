"use client";

import { Button } from "~/components/ui/button";
import { redirectOnboarding } from "~/lib/auth";
import { useSignIn, useUser } from "~/stores/global";

export default function LoginPage() {
  const user = useUser();
  const signIn = useSignIn();

  if (user.loggedIn && !user.hasProfile) {
    return redirectOnboarding();
  }

  return (
    <div className="flex h-96 flex-row items-center justify-center gap-4 rounded-lg border border-ui-elements-light bg-background-white shadow">
      <Button variant="outline" onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
}
