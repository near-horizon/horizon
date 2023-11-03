import { Wallet } from "@components/svgs/Wallet";
import { RocketShip } from "@components/svgs/RocketShip";
import { Users2 } from "@components/svgs/Users2";
import { ImageSection } from "./ImageSection";

export default function GrowSection() {
  return (
    <ImageSection
      title="Grow"
      direction="left"
      className="text-[#32d583]"
      first={{
        desktop: "bafkreia4if3v5pidg5wn3ajuox7novoqzabtgqjcxtutxscip5dmrhrcni",
        mobile: "bafkreid3i5zlxu2eiqca7qghpgpoj2zbmp2kwv7qtkzdj2utyqhunk56y4",
        icon: <Wallet className="h-8 w-8 !rotate-0" />,
        title: "Get financial support with Horizon Credits",
        description:
          "Leverage Horizon Credits to engage with our 20+ Service Providers and gain access to early beta testers",
      }}
      second={{
        desktop: "bafkreiaj66jfkq67dtohhhyugu6fzvwes5iojhnn6552qtsyiyg33lv35e",
        mobile: "bafkreigc2hjgoma3gewa55buw4t3ueoshwap25iu2t6hcyapjwvpqo2qfi",
        icon: <RocketShip className="h-9 w-9 !rotate-0" />,
        title: "Join trusted partner accelerators",
        description:
          "Facilitate NEAR-specific acceleration programs and provide support to chain agnostic acceleration programs.",
      }}
      third={{
        desktop: "bafkreicichhd7bqfhvwphgb3oeo6rv2eritrqhdinaabam2c6xo7epju5e",
        mobile: "bafkreigs2ktn7dokv4l6nug733ovyzqco7lw5hvqluhwzst2sgce3ty4dy",
        icon: <Users2 className="h-9 w-9 !rotate-0" />,
        title: "Access to private pool of backers",
        description:
          "Connect with funding teams from around the world through Horizon pitch events, product demo nights, one-on-ones with VCs, and more.",
      }}
    />
  );
}
