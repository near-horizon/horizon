import { type NewProjectType } from "~/lib/validation/project/new";
import { Section } from "./section";
import {
  AlignLeftSvg,
  Flag06Svg,
  Globe02Svg,
  MarkerPin01Svg,
  Target01Svg,
  Users01Svg,
} from "~/icons";
import { Socials } from "~/components/socials";
import { iso3166 } from "~/lib/constants/iso-3166";
import { DATE, STRING } from "~/lib/format";
import { cleanURL } from "~/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

export function GeneralSection({
  profile,
  creationTx,
}: Pick<NewProjectType, "profile" | "creationTx">) {
  return (
    <Section title="General information">
      {profile.description && (
        <Row>
          <AlignLeftSvg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {profile.description}
          </p>
        </Row>
      )}

      {creationTx.timestamp && (
        <Row>
          <Flag06Svg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <HoverCard>
            <HoverCardTrigger>
              <p className="text-sm font-normal text-ui-elements-dark">
                {DATE.date(creationTx.timestamp)}
              </p>
            </HoverCardTrigger>

            <HoverCardContent>
              <p>
                This project joined Horizon{" "}
                {DATE.timeago(creationTx.timestamp / 1_000_000)}
                .
                <br />
                <a
                  href={`https://nearblocks.io/txns/${creationTx.hash}`}
                  className="text-blue-500"
                  target="_blank"
                >
                  Check out the on-chain transaction
                </a>
              </p>
            </HoverCardContent>
          </HoverCard>
        </Row>
      )}

      {profile.location && (
        <Row>
          <MarkerPin01Svg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {iso3166.find(({ value }) => value === profile.location)?.text}
          </p>
        </Row>
      )}

      {profile.stage && profile.stage !== "other" && (
        <Row>
          <Target01Svg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {profile.stage === "pre-seed"
              ? "Pre-seed"
              : STRING.capitalize(profile.stage.split("-").join(" "))}
          </p>
        </Row>
      )}

      {profile.size && (
        <Row>
          <Users01Svg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {profile.size === "small"
              ? "1-10"
              : profile.size === "medium"
                ? "11-100"
                : "100+"}
          </p>
        </Row>
      )}

      {profile.website && (
        <Row>
          <Globe02Svg className="h-5 w-5 flex-shrink-0 text-ui-elements-gray" />
          <a
            href={cleanURL(profile.website)}
            className="text-sm font-normal text-ui-elements-dark"
            target="_blank"
          >
            {profile.website}
          </a>
        </Row>
      )}

      <Socials links={profile.socials} />
    </Section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-row items-start justify-start gap-3">
      {children}
    </div>
  );
}
