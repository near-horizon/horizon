import { DescriptionSkeleton } from "~/components/description";
import { DetailSkeleton } from "~/components/detail";

export default function OverviewLoading() {
  return (
    <div className="flex w-full flex-col divide-y">
      <section className="flex flex-col gap-2 py-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <DetailSkeleton label="Verticals" />
          <DetailSkeleton label="Payment method" />
          <DetailSkeleton label="Service terms" />
          <DetailSkeleton label="Budget" />
          <DetailSkeleton label="Created" />
          <DetailSkeleton label="Deadline" />
        </div>
      </section>
      <DescriptionSkeleton full />
    </div>
  );
}
