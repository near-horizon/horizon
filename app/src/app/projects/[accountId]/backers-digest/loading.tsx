import { Separator } from "~/components/ui/separator";
import { Section } from "./backers-digest";
import { Skeleton } from "~/components/ui/skeleton";

export default function BackersDigestLoading() {
  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-8">
      <Section title="About">
        <div className="">
          <Skeleton />
        </div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Traction metrics">
        <div></div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Pitch deck">
        <div></div>
      </Section>
      <Section title="Demo day pitch">
        <div></div>
      </Section>
      <Section title="Demo video">
        <div></div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Founders">
        <div></div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Media coverage">
        <div></div>
      </Section>
    </div>
  );
}
