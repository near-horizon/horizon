import { Target } from "@components/svgs/Target";
import { HorizonLogo } from "@components/svgs/HorizonLogo";
import { Expand } from "@components/svgs/Expand";
import { StaticImageSection } from "./StaticImageSection";

export default function ContributorsSection() {
  return (
    <StaticImageSection
      title="Horizon for Contributors"
      subtitle="Grow your reach and reputation with Horizon"
      direction="right"
      desktop="bafkreigrs36in3bq4mf6mv2cezjqdq5nobevgqitsj3tsexnf22phv2tmu"
      mobile="bafkreihdikmkpfklanm5yafjha4bhrxdi3b4is6hjnj7klxkpwifxix3ym"
      first={{
        icon: <HorizonLogo className="h-9 w-9 !rotate-0" />,
        title: "Access to the Horizon ecosystem",
        description:
          "Discover and connect directly with 200+ promising startups and founders ranging from early-stage to growth-stage.",
      }}
      second={{
        icon: <Expand className="h-9 w-9 !rotate-0" />,
        title: "Validate your idea safely",
        description:
          "Match with vetted and verified projects you want to support. Easily find white papers, team bios, stats, and more all on the project's profile page.",
      }}
      third={{
        icon: <Target className="h-9 w-9 !rotate-0" />,
        title: "Strategic and long-term advantage",
        description:
          "Easily filter projects based on your specific criteria. Attend Horizon Networking and Pitch events to discover multiple, promising projects at the same time.",
      }}
    />
  );
}
