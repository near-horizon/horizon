import { type NewProjectType } from "~/lib/validation/project/new";
import { Section } from "./section";
import {
  AlignLeftSvg,
  Globe02Svg,
  MarkerPin01Svg,
  Target01Svg,
  Users01Svg,
} from "~/icons";
import { Socials } from "~/components/socials";
import { iso3166 } from "~/lib/constants/iso-3166";

export function GeneralSection({ profile }: Pick<NewProjectType, "profile">) {
  return (
    <Section title="General information">
      {profile.description && (
        <Row>
          <AlignLeftSvg className="h-5 w-5 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {profile.description}
          </p>
        </Row>
      )}

      {profile.location && (
        <Row>
          <MarkerPin01Svg className="h-5 w-5 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {iso3166.find(({ value }) => value === profile.location)?.text}
          </p>
        </Row>
      )}

      {profile.stage && profile.stage !== "other" && (
        <Row>
          <Target01Svg className="h-5 w-5 text-ui-elements-gray" />
          <p className="text-sm font-normal capitalize text-ui-elements-dark">
            {profile.stage === "pre-seed"
              ? "Pre-seed"
              : profile.stage.split("-").join(" ")}
          </p>
        </Row>
      )}

      {profile.size && (
        <Row>
          <Users01Svg className="h-5 w-5 text-ui-elements-gray" />
          <p className="text-sm font-normal text-ui-elements-dark">
            {profile.size}
          </p>
        </Row>
      )}

      {profile.website && (
        <Row>
          <Globe02Svg className="h-5 w-5 text-ui-elements-gray" />
          <a
            href={profile.website}
            className="text-sm font-normal text-ui-elements-dark"
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
