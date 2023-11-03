import { Access } from "@components/svgs/Access";
import { Clock } from "@components/svgs/Clock";
import { Risk } from "@components/svgs/Risk";
import { StaticImageSection } from "./StaticImageSection";

export default function BackersSection() {
  return (
    <StaticImageSection
      title="Horizon for Backers"
      subtitle="Discover the next Web3 success story with Horizon"
      direction="left"
      desktop="bafkreie2i3o373b6srfte3adfbgnjo7qbgi4dustpt5y7dr6irll7my4aa"
      mobile="bafkreidp4dfhg2x74xuojei4qrxmfbtkrzkbdoqgsaljpc2qrn4vi7i65a"
      first={{
        icon: <Access className="h-8 w-8 !rotate-0" />,
        title: "Access to the ecosystem projects",
        description:
          "Engage directly with 150+ startups at various stages, from early-stage to growth-stage businesses.",
      }}
      second={{
        icon: <Risk className="h-9 w-9 !rotate-0" />,
        title: "Lower your risks",
        description:
          "Enhance your community engagement through our perks, tools, resources and Horizon Credits available to founders.",
      }}
      third={{
        icon: <Clock className="h-9 w-9 !rotate-0" />,
        title: "Save your time",
        description:
          "Activate learners through our next gen talent database, with a pipeline of internship and job opportunities.",
      }}
    />
  );
}
