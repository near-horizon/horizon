import { Separator } from "~/components/ui/separator";
import {
  addBackersDigestToken,
  getBackersDigest,
  getProject,
} from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import {
  Download01Svg,
  File06Svg,
  Flag06Svg,
  Globe02Svg,
  MarkerPin01Svg,
  Send01Svg,
  Share03Svg,
  Users01Svg,
} from "~/icons";
import { ExternalLink } from "~/components/external-link";
import { cleanURL, getFileURL } from "~/lib/utils";
import { Socials } from "~/components/socials";
import { type Linktree } from "~/lib/validation/fetching";
import { NoData } from "~/components/empty";
import { Button } from "~/components/ui/button";
import { env } from "~/env.mjs";
import { QRDialog } from "~/components/qr-dialog";
import { getUserFromSession } from "~/lib/session";
import { Icon } from "~/components/icon";
import { DATE } from "~/lib/format";

export async function BackersDigest({ accountId }: { accountId: AccountId }) {
  const [backersDigest, project, user] = await Promise.all([
    getBackersDigest(accountId),
    getProject(accountId),
    getUserFromSession(),
  ]);

  let url = `/projects/${accountId}`;
  if (user.logedIn && user.accountId === accountId) {
    let token = backersDigest.token;
    if (!token) {
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
            <Send01Svg className="h-5 w-5 text-ui-elements-gray" />
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
              <Send01Svg className="h-5 w-5 text-ui-elements-gray" />
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
              <Flag06Svg className="h-5 w-5 text-ui-elements-gray" />
              Joined {DATE.timestamp(project.creationTx?.timestamp)}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <MarkerPin01Svg className="h-5 w-5 text-ui-elements-gray" />
              {backersDigest.location}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <Users01Svg className="h-5 w-5 text-ui-elements-gray" />
              {backersDigest.company_size}
            </div>
            <div className="flex flex-row items-center justify-start gap-4 text-ui-elements-dark">
              <Globe02Svg className="h-5 w-5 text-ui-elements-gray" />
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
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!backersDigest.traction ||
          Object.keys(backersDigest.traction).length === 0 ? (
            <NoData className="w-full" />
          ) : (
            Object.entries(backersDigest.traction).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-ui-elements-light bg-background-light px-3 py-4"
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
          <FileDescription file={backersDigest.pitch} />
        )}
      </Section>
      <Section title="Demo day pitch">
        {!backersDigest.demo || backersDigest.demo === "" ? (
          <NoData className="h-48" />
        ) : (
          <FileDescription file={backersDigest.demo} />
        )}
      </Section>
      <Section title="Demo video">
        {!backersDigest.demo_video || backersDigest.demo_video === "" ? (
          <NoData className="h-48" />
        ) : (
          <FileDescription file={backersDigest.demo_video} />
        )}
      </Section>
      <Separator className="h-px w-full bg-ui-elements-light" />
      <Section title="Founders">
        {!backersDigest.founders || backersDigest.founders.length === 0 ? (
          <NoData className="w-full" />
        ) : (
          <div className="grid w-full grid-cols-1 items-stretch justify-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(backersDigest.founders ?? []).map((founder) => (
              <div
                key={founder.first_name as string}
                className="flex flex-col items-center justify-start gap-4 rounded-2xl border border-accent-disabled bg-background-light p-6"
              >
                <Icon
                  name={founder.first_name as string}
                  image={{ ipfs_cid: founder.photo as string }}
                  className="h-16 w-16 rounded-lg"
                />
                <b>
                  {founder.first_name as string} {founder.last_name as string}
                </b>
                <p>{founder.role as string}</p>
                <p>{founder.account_id as string}</p>
                <Socials links={(founder?.linktree as Linktree) ?? {}} />
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

export function FileDescription({ file }: { file: string }) {
  const value = getFileURL(file);

  if (typeof value === "string") {
    return (
      <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
        <span className="flex w-full flex-row items-center justify-start gap-2">
          <File06Svg className="h-6 w-6 text-ui-elements-gray" />
          <ExternalLink href={value}>
            <span className="flex flex-row items-center justify-start gap-2">
              {value}
              <Share03Svg className="h-4 w-4 text-ui-elements-gray" />
            </span>
          </ExternalLink>
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
      <span className="flex w-full flex-row items-center justify-start gap-2">
        <File06Svg className="h-6 w-6 text-ui-elements-gray" />
        <a
          href={value.url}
          download
          className="flex max-w-prose flex-row items-center justify-start gap-2 truncate text-text-link"
        >
          {value.filename}
          <Download01Svg className="h-4 w-4 text-ui-elements-gray" />
        </a>
        <small className="text-sm font-medium text-ui-elements-gray">
          {value.size}
        </small>
      </span>
      <small className="text-sm font-medium text-ui-elements-gray">
        Uploaded {value.uploaded}
      </small>
    </div>
  );
}
