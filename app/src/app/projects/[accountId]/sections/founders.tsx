import { type NewProjectType } from "~/lib/validation/project/new";
import { Section, type SectionProps } from "./section";
import { NoData } from "~/components/empty";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "~/components/icon";
import { Socials } from "~/components/socials";
import { cn } from "~/lib/utils";

export function Founders({
  founders,
  isOwner,
  isBacker,
}: Pick<NewProjectType, "founders"> & SectionProps) {
  let data = <NoData className="h-56 w-full" />;

  if (!!founders.value && founders.value.length !== 0) {
    data = (
      <div className="grid w-full grid-cols-12 gap-6">
        {founders.value.map((founder) => (
          <div key={founder.name} className="col-span-full md:col-span-4">
            <Founder {...founder} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section
      title="Founders"
      hide={!(founders.visible || isBacker || isOwner)}
      watermark={isOwner && !founders.visible}
      separator
    >
      {data}
    </Section>
  );
}

function Founder({
  name,
  image,
  account_id,
  socials,
}: NewProjectType["founders"]["value"][number]) {
  return (
    <Card
      className={cn(
        "w-full border border-accent-disabled bg-background-light",
        "flex h-full flex-col items-center justify-start gap-4",
      )}
    >
      <CardHeader className="flex flex-col items-center justify-start gap-4">
        <Icon
          name={name ?? ""}
          image={image}
          className="h-36 w-36 rounded-full"
        />
        <CardTitle className="text-xl font-bold text-ui-elements-black">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-start gap-4">
        <span className="truncate text-sm text-ui-elements-black">
          {account_id}
        </span>
        <Socials links={socials} />
      </CardContent>
    </Card>
  );
}
