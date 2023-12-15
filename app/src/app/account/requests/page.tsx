import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Loader } from "./loader";
import { Skeleton } from "./list";
import { PlusSvg } from "~/icons";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border border-ui-elements-light bg-ui-elements-white px-12 py-10 shadow">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-xl font-bold text-text-black">Your requests</h1>

        <Link href="/requests/create">
          <Button
            variant="default"
            className="flex items-center justify-center gap-2"
          >
            <PlusSvg className="h-5 w-5" />
            Create a request
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Skeleton />}>
        <Loader />
      </Suspense>
    </div>
  );
}
