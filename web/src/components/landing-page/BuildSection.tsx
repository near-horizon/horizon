import { BoxCheck } from "@components/svgs/BoxCheck";
import { Lightbulb } from "@components/svgs/Lightbulb";
import { Compass } from "@components/svgs/Compass";
import { ImageSection } from "./ImageSection";

export default function BuildSection() {
  return (
    <ImageSection
      title="Build"
      direction="left"
      className="text-[#ff7966]"
      first={{
        desktop: "bafkreia4if3v5pidg5wn3ajuox7novoqzabtgqjcxtutxscip5dmrhrcni",
        mobile: "bafkreid3i5zlxu2eiqca7qghpgpoj2zbmp2kwv7qtkzdj2utyqhunk56y4",
        icon: <BoxCheck className="h-8 w-8 !rotate-0" />,
        title: "Hire ecosystem experts for your needs",
        description:
          "Easily source reputable contributors for any and every business need you have, including back office finance management, recruitment, development, legal, and marketing.",
      }}
      second={{
        desktop: "bafkreiaj66jfkq67dtohhhyugu6fzvwes5iojhnn6552qtsyiyg33lv35e",
        mobile: "bafkreigc2hjgoma3gewa55buw4t3ueoshwap25iu2t6hcyapjwvpqo2qfi",
        icon: <Lightbulb className="h-9 w-9 !rotate-0" />,
        title: "Validate your idea safely",
        description:
          "Users are standing by to test your application and provide valuable feedback before your launch.",
        soon: true,
      }}
      third={{
        desktop: "bafkreicichhd7bqfhvwphgb3oeo6rv2eritrqhdinaabam2c6xo7epju5e",
        mobile: "bafkreigs2ktn7dokv4l6nug733ovyzqco7lw5hvqluhwzst2sgce3ty4dy",
        icon: <Compass className="h-9 w-9 !rotate-0" />,
        title: "Find a mentor or become one",
        description:
          "Connect with industry veterans for advice on your GTM plan, leadership skills, pitch deck, and more. Or apply to become a mentor, and help Web3 founders put their best foot forward as they prepare for launch.",
        soon: true,
      }}
    />
  );
}
