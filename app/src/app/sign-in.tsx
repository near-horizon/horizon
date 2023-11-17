"use client";

import { Button } from "~/components/ui/button";
import { useSignIn } from "~/stores/global";

export function SignIn() {
  const signIn = useSignIn();

  return (
    <div>
      <Button onClick={signIn} variant="outline">
        Sign In
      </Button>
    </div>
  );
}
