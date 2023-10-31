import { Separator } from "~/components/ui/separator";
import {
  addBackersDigestToken,
  getBackersDigest,
  getProject,
} from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import FlagIcon from "~/components/icons/flag-06.svg";
import MarkerPinIcon from "~/components/icons/marker-pin-01.svg";
import UsersIcon from "~/components/icons/users-01.svg";
import GlobeIcon from "~/components/icons/globe-02.svg";
import SendIcon from "~/components/icons/send-01.svg";
import { ExternalLink } from "~/components/external-link";
import { cleanURL, cn } from "~/lib/utils";
import { Socials } from "~/components/socials";
import { IPFSImage } from "~/components/ipfs-image";
import { type Linktree } from "~/lib/validation/fetching";
import { NoData } from "~/components/empty";
import { Button } from "~/components/ui/button";
import { env } from "~/env.mjs";
import { QRDialog } from "~/components/qr-dialog";
import { getUserFromSession } from "~/lib/session";

export async function BackersDigest({ accountId }: { accountId: AccountId }) {
  const backersDigest = await getBackersDigest(accountId);
  const project = await getProject(accountId);
  const user = await getUserFromSession();

  let url = `/projects/${accountId}`;
  if (user && user.accountId === accountId) {
    let token = backersDigest.token;
    if (!token) {
      console.log("Adding token");
      token = await addBackersDigestToken(accountId);
    }
    url = `/projects/${accountId}/backers-digest?token=${token}`;
  }

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-8">
      <div className="flex flex-row items-center justify-start gap-3">
        {!backersDigest.email || backersDigest.email === "" ? (
          <Button
            className="flex items-center justify-center gap-2"
            variant="outline"
            disabled
          >
            <SendIcon className="h-5 w-5 text-ui-elements-gray" />
            Contact project
          </Button>
        ) : (
          <a
            href={`mailto:${backersDigest.email}?subject=${env.REACHOUT_SUBJECT}&body=${env.REACHOUT_BODY}`}
          >
            <Button
              className="flex items-center justify-center gap-2"
              variant="default"
            >
              <SendIcon className="h-5 w-5 text-ui-elements-gray" />
              Contact project
            </Button>
          </a>
        )}
        <QRDialog url={url} />
      </div>
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
          {!backersDigest.traction ||
            Object.keys(backersDigest.traction).length === 0 ? (
            <NoData className="w-full" />
          ) : (
            Object.entries(backersDigest.traction).map(([key, value]) => (
              <div
                key={key}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-ui-elements-light bg-background-light px-3 py-4 md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <b className="text-2xl font-bold text-secondary-pressed">
                  {value}
                </b>
                <small className="text-sm font-semibold text-black">
                  {key}
                </small>
              </div>
            ))
          )}
        </div>
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Pitch deck">
        {!backersDigest.pitch || backersDigest.pitch === "" ? (
          <NoData className="h-48" />
        ) : (
          <ExternalLink href={cleanURL(backersDigest.pitch)}>
            {backersDigest.pitch}
          </ExternalLink>
        )}
      </Section>
      <Section title="Demo day pitch">
        {!backersDigest.demo || backersDigest.demo === "" ? (
          <NoData className="h-48" />
        ) : (
          <ExternalLink href={cleanURL(backersDigest.demo)}>
            {backersDigest.demo}
          </ExternalLink>
        )}
      </Section>
      <Section title="Demo video">
        {!backersDigest.demo_video || backersDigest.demo_video === "" ? (
          <NoData className="h-48" />
        ) : (
          <ExternalLink href={cleanURL(backersDigest.demo_video)}>
            {backersDigest.demo_video}
          </ExternalLink>
        )}
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Founders">
        {!backersDigest.founders || backersDigest.founders.length === 0 ? (
          <NoData className="w-full" />
        ) : (
          <div className="flex w-full flex-row flex-wrap items-stretch justify-start gap-5">
            {(backersDigest.founders ?? []).map((founder) => (
              <div
                key={founder.first_name as string}
                className={cn(
                  "flex flex-col items-center justify-start gap-4 rounded-2xl border border-accent-disabled bg-background-light p-6",
                  "md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                )}
              >
                <IPFSImage
                  className="h-16 w-16 rounded-full"
                  cid={founder.photo as string}
                />
                <b>
                  {founder.first_name as string} {founder.last_name as string}
                </b>
                <p>{founder.role as string}</p>
                <p>{founder.account_id as string}</p>
                <Socials links={founder.linktree as Linktree} />
              </div>
            ))}
          </div>
        )}
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Media coverage">
        {!backersDigest.announcement || backersDigest.announcement === "" ? (
          <NoData className="h-48" />
        ) : (
          <ExternalLink href={cleanURL(backersDigest.announcement)}>
            {backersDigest.announcement}
          </ExternalLink>
        )}
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
