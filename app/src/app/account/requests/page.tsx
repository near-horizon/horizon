import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Loader } from "./loader";
import { Skeleton } from "./list";

export default function Page() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold text-text-black">Your requests</h1>
        <Button variant="default" className="flex items-center justify-center">
          <Link
            href="/requests/create"
            className="flex w-full flex-row items-center justify-center gap-2"
          >
            <PlusIcon />
            Create a request
          </Link>
        </Button>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Loader />
      </Suspense>
    </div>
  );
}
