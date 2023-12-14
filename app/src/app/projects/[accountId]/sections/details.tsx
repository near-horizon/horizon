import { type NewProjectType } from "~/lib/validation/project/new";
import { Section, type SectionProps } from "./section";
import { NoData } from "~/components/empty";

export function ProjectDetails({
  details,
  isOwner,
  isBacker,
}: Pick<NewProjectType, "details"> & SectionProps) {
  let data = <NoData className="h-56 w-full" />;

  if (
    !!details.value &&
    [
      typeof details.value.open_source !== "undefined",
      details.value.near_integration,
      details.value.problem,
      details.value.needs,
      typeof details.value.fundraising !== "undefined",
      typeof details.value.raised !== "undefined",
    ].some(Boolean)
  ) {
    data = (
      <>
        {typeof details.value.open_source !== "undefined" && (
          <Pair
            question="Is your project open source?"
            answer={details.value.open_source ? "Yes" : "No"}
          />
        )}

        {details.value.near_integration && (
          <Pair
            question="Do you plan to integrate with NEAR?"
            answer={
              details.value.near_integration === "in-progress"
                ? "Not yet but planning to"
                : details.value.near_integration === "yes"
                  ? "Yes"
                  : "No"
            }
          />
        )}

        {details.value.problem && (
          <Pair
            question="What problem are you solving? What makes you unique?"
            answer={details.value.problem}
          />
        )}

        {details.value.needs && (
          <Pair
            question="What are your biggest needs?"
            answer={details.value.needs}
          />
        )}

        {typeof details.value.fundraising !== "undefined" && (
          <Pair
            question="Are you currently fundraising?"
            answer={details.value.fundraising ? "Yes" : "No"}
          />
        )}

        {typeof details.value.raised !== "undefined" && (
          <Pair
            question="How much have you raised?"
            answer={details.value.raised ? "Yes" : "No"}
          />
        )}
      </>
    );
  }

  return (
    <Section
      title="Project details"
      hide={!(details.visible || isBacker || isOwner)}
      watermark={isOwner && !details.visible}
      separator
    >
      {data}
    </Section>
  );
}

function Pair({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <b className="text-sm font-bold text-ui-elements-black">{question}</b>
      <p className="text-sm text-ui-elements-dark">{answer}</p>
    </div>
  );
}
