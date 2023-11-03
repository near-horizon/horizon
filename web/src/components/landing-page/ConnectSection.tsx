import { Users2 } from "@components/svgs/Users2";
import { ThumbsUp } from "@components/svgs/ThumbsUp";
import { FaceChat } from "@components/svgs/FaceChat";
import { ImageSection } from "./ImageSection";

export default function ConnectSection() {
  return (
    <ImageSection
      title="Connect"
      direction="right"
      className="text-[#9797ff]"
      first={{
        desktop: "bafkreidfgplno2h7aczch6i4gqsx74krd4vgfjshuknkhnto2ez2zlsf2q",
        mobile: "bafkreiavbrd2rxzaxucfipc7uemiols4jhdgezshdgxanslssud3xe22jy",
        icon: <Users2 className="h-8 w-8 !rotate-0" />,
        title: "Connect with fellow founders",
        description:
          "Build long-term relationships with other founders on the app, and grow your professional network through regular founder meet and greets, product demo nights, workshops, and pitch events",
      }}
      second={{
        desktop: "bafkreierfioucir5qf43cw56iujghcdvzidezk7z5gny6sw33xhd5ekviy",
        mobile: "bafkreicgiwyplfjka7ldc2k6sg5it3qj75i4dd4xrdbwqlbhuq4eb3zx6i",
        icon: <ThumbsUp className="h-9 w-9 !rotate-0" />,
        title: "Share your idea and get feedback",
        description:
          "Enhance your community engagement through our perks, tools, resources and Horizon Credits available to founders.",
      }}
      third={{
        desktop: "bafkreibcp5xmlhlveqs3f4ecestwnsaxobd26adxc2jruvc5v4rah4znbu",
        mobile: "bafkreib2ovzs4vqn3oilpvdns36v4xhwvw4pgrerjc55xd42nvxaiinwqu",
        icon: <FaceChat className="h-9 w-9 !rotate-0" />,
        title: "Tap into a supportive community",
        description:
          "Get involved with our mentorship program, product demo nights, hackathons and community AMA’s.",
      }}
    />
  );
}
