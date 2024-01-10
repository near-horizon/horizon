"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function CongratulationsPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Congratulations!</h1>
      <p className="text-ui-elements-dark">
        Your profile has been created successfully
      </p>

      <div className="flex w-full flex-col-reverse items-center justify-center gap-4 md:flex-row">
        <Link href="/account">
          <Button variant="outline">Go to your profile</Button>
        </Link>
        <Link href="/projects?fundraising=true">
          <Button variant="default">Explore fundraisers</Button>
        </Link>
      </div>

      <Confetti tweenDuration={10000} recycle={false} />
    </div>
  );
}
