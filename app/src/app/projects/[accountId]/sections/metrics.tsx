import { type NewProjectType } from "~/lib/validation/project/new";
import { Section } from "./section";
import { NoData } from "~/components/empty";

export function TractionMetrics({ metrics }: Pick<NewProjectType, "metrics">) {
  if (!metrics.visible) {
    return <></>;
  }

  if (!metrics.value) {
    return (
      <Section title="Traction metrics">
        <NoData className="h-56 w-full" />
      </Section>
    );
  }

  return (
    <Section title="Traction metrics">
      <div className="grid w-full grid-cols-12 gap-6">
        {metrics.value.map(({ name, value }) => (
          <div
            key={name}
            className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-ui-elements-light bg-background-light px-3 py-4 md:col-span-4"
          >
            <b className="text-2xl font-bold text-secondary-pressed">{value}</b>
            <small className="text-sm font-semibold text-black">{name}</small>
          </div>
        ))}
      </div>
    </Section>
  );
}
