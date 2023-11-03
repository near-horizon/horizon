import { LinkButton } from "@components/LinkButton";
import { SpeedOMeter } from "@components/svgs/SpeedOMeter";
import { HorizonEcosystem } from "@components/svgs/HorizonEcosystem";
import { Education } from "@components/svgs/Education";
import { StaticImageSection } from "./StaticImageSection";

export default function ContributorsSection() {
  return (
    <StaticImageSection
      title="Horizon for Contributors"
      subtitle="Grow your reach and reputation with Horizon"
      direction="right"
      desktop="bafkreibfgez7zpynpgo5fvjkxgstun6of5ob5noxxhugraxtda3kssosla"
      mobile="bafkreiexkerx7t3k6oc5262yc64gd5qtatxhlmuakwt3unhfkpyyhe7k3i"
      first={{
        icon: <SpeedOMeter className="h-9 w-9 !rotate-0" />,
        title: "Accelerator programs",
        description:
          "Streamline sourcing potential investments through our database of diverse, pre-screened pool of innovative Web3 founders.",
      }}
      second={{
        icon: <HorizonEcosystem className="h-9 w-9 !rotate-0" />,
        title: "Validate your idea safely",
        description:
          "Match with vetted and verified projects you want to support. Easily find white papers, team bios, stats, and more all on the project's profile page.",
      }}
      third={{
        icon: <Education className="h-9 w-9 !rotate-0" />,
        title: "Strategic and long-term advantage",
        description:
          "Easily filter projects based on your specific criteria. Attend Horizon Networking and Pitch events to discover multiple, promising projects at the same time.",
      }}
      cta={
        <LinkButton
          label="Join as a Partner"
          className="font-medium"
          variant="secondary"
        />
      }
    />
  );
}
