import { Separator } from "~/components/ui/separator";
import { getBackersDigest, getProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import FlagIcon from "~/components/icons/flag-06.svg";
import MarkerPinIcon from "~/components/icons/marker-pin-01.svg";
import UsersIcon from "~/components/icons/users-01.svg";
import GlobeIcon from "~/components/icons/globe-02.svg";
import { ExternalLink } from "~/components/external-link";
import { cleanURL } from "~/lib/utils";
import { Socials } from "~/components/socials";

export async function BackersDigest({ accountId }: { accountId: AccountId }) {
  const backersDigest = await getBackersDigest(accountId);
  const project = await getProject(accountId);

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-8">
      <Section title="About">
        <div className="flex w-full flex-row items-start justify-start gap-8">
          <div className="flex-grow">
            <p className="text-sm text-text-dark">{project.description}</p>
          </div>
          <div className="flex w-1/4 flex-col items-start justify-start gap-3">
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <FlagIcon className="h-5 w-5 text-ui-elements-gray" />
              Joined{" "}
              {new Date(
                Number(`${project.creationTx?.timestamp}`.substring(0, 13))
              ).toLocaleDateString()}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <MarkerPinIcon className="h-5 w-5 text-ui-elements-gray" />
              {backersDigest.location}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <UsersIcon className="h-5 w-5 text-ui-elements-gray" />
              {backersDigest.company_size}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <GlobeIcon className="h-5 w-5 text-ui-elements-gray" />
              <ExternalLink href={cleanURL(backersDigest.website)}>
                {backersDigest.website}
              </ExternalLink>
            </div>
            <Socials links={backersDigest.linktree ?? {}} />
          </div>
        </div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Traction metrics">
        <div className="flex w-full flex-row flex-wrap gap-6">
          {Object.entries(backersDigest.traction ?? {}).map(([key, value]) => (
            <div
              key={key}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-ui-elements-light bg-background-light px-3 py-4 md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <b className="text-2xl font-bold text-secondary-pressed">
                {value}
              </b>
              <small className="text-sm font-semibold text-black">{key}</small>
            </div>
          ))}
        </div>
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

export function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
