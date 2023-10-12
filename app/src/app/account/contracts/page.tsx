import { Suspense } from "react";
import { Loader } from "./loader";
import { Skeleton } from "./list";

export default function Page() {
  return (
    <div>
      <div className="flex flex-row items-center justify-start">
        <h1 className="text-xl font-bold text-text-black">Your requests</h1>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Loader />
      </Suspense>
    </div>
  );
}
